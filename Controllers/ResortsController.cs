using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using WaitTime.Entities;
using WaitTime.Models;

namespace WaitTime.Controllers
{
    [Produces("application/json")]
    [Route("/api/[controller]")]
    [ApiController]
    public class ResortsController : Controller
    {
        private readonly WaitTimeContext _context;
        private readonly ILogger _logger;

        public ResortsController(WaitTimeContext context, ILogger<ResortsController> logger)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<ResortModel> GetResorts()
        {
            return _context.Resorts.Select(resort => new ResortModel
            {
                ID = resort.ResortID,
                Name = resort.Name,
                Slug = resort.Slug,
                LogoFilename = resort.LogoFilename,
                LiftCount = resort.Lifts.Count()
            });
        }

        [HttpGet("{slug}")]
        public ActionResult<ResortModel> GetResortBySlug(string slug)
        {
            var resort = _context.Resorts.SingleOrDefault(r => r.Slug == slug);
            if (resort == null)
            {
                return NotFound();
            }
            var dates = _context.Uplifts
                .Where(u => u.Lift.ResortID == resort.ResortID)
                .Select(u => u.LocalDate)
                .Distinct()
                .OrderBy(date => date);
            var model = new ResortModel
            {
                ID = resort.ResortID,
                Name = resort.Name,
                Slug = resort.Slug,
                LogoFilename = resort.LogoFilename,
                TrailMapFilename = resort.TrailMapFilename,
                Timezone = resort.Timezone,
                HasWaitTimes = resort.HasWaitTimes,
                SortOrder = resort.SortOrder,
                Dates = dates,
                LiftCount = resort.Lifts.Count()
            };
            if (dates.Count() > 0)
            {
                model.LastDate = _getWaitTimeDate(resort.ResortID, dates.Last());
            }
            return model;
        }

        [HttpGet("{resortSlug}/{date}")]
        public ActionResult<WaitTimeDateModel> GetWaitTimeDate(string resortSlug, DateTime date)
        {
            var resort = _context.Resorts.SingleOrDefault(r => r.Slug == resortSlug);
            if (resort == null)
            {
                return NotFound();
            }
            var waitTimeDate = _getWaitTimeDate(resort.ResortID, date);
            if (waitTimeDate == null)
            {
                return NotFound();
            }
            return waitTimeDate;
        }

        private WaitTimeDateModel _getWaitTimeDate(int resortID, DateTime date)
        {
            var uplifts = _context.Uplifts
                .Where(uplift => uplift.Lift.ResortID == resortID
                    && uplift.LocalDate == date)
                .OrderBy(uplift => uplift.LocalDateTime)
                .ToList();

            var upliftsByTimePeriod = uplifts
                .GroupBy(uplift => new
                {
                    TimePeriod = (int)(uplift.LocalDateTime.TimeOfDay.TotalMinutes / 15),
                    uplift.LiftID,
                })
                .Select(g => new
                {
                    g.Key.TimePeriod,
                    g.Key.LiftID,
                    WaitSeconds = g.Average(uplift => uplift.WaitSeconds)
                })
                .GroupBy(uplift => uplift.TimePeriod)
                .OrderBy(uplift => uplift.Key)
                .ToList();

            if (upliftsByTimePeriod.Count == 0)
            {
                return null;
            }

            List<WaitTimeModel> cumulativeUplifts = null;
            return new WaitTimeDateModel
            {
                Date = date,
                TimePeriods = Enumerable
                .Range(upliftsByTimePeriod.First().Key, upliftsByTimePeriod.Last().Key - upliftsByTimePeriod.First().Key + 1)
                .Select(timePeriod =>
                {
                    var upliftsResult = cumulativeUplifts != null ?
                        new List<WaitTimeModel>(cumulativeUplifts) :
                        new List<WaitTimeModel>();

                    upliftsByTimePeriod.FirstOrDefault(t => t.Key == timePeriod)?.ToList().ForEach(uplift =>
                    {
                        var existingUplift = upliftsResult.FirstOrDefault(w => w.LiftID == uplift.LiftID);
                        if (existingUplift != null)
                        {
                            existingUplift.Seconds = (int)uplift.WaitSeconds;
                        }
                        else
                        {
                            upliftsResult.Add(new WaitTimeModel
                            {
                                LiftID = uplift.LiftID,
                                Seconds = (int)uplift.WaitSeconds
                            });
                        }
                    });
                    cumulativeUplifts = upliftsResult;
                    return new WaitTimePeriodModel
                    {
                        Timestamp = timePeriod * 15 * 60,
                        WaitTimes = upliftsResult
                    };
                })
            };
        }
    }
}