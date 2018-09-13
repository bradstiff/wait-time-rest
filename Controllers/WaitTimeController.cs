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
    [Route("/api/waitTimes")]
    [ApiController]
    public class WaitTimeController : Controller
    {
        private readonly WaitTimeContext _context;
        private readonly ILogger _logger;

        public WaitTimeController(WaitTimeContext context, ILogger<WaitTimeController> logger)
        {
            _context = context;
        }

        [HttpGet("{resortSlug}/{date}")]
        public ActionResult<WaitTimeDateModel> GetWaitTimeDate(string resortSlug, DateTime date)
        {
            var resort = _context.Resorts.SingleOrDefault(r => r.Slug == resortSlug);
            if (resort == null)
            {
                return NotFound();
            }
            var waitTimeDate = GetWaitTimeDate(resort.ResortID, date, _context);
            if (waitTimeDate == null)
            {
                return NotFound();
            }
            return waitTimeDate;
        }

        internal static WaitTimeDateModel GetWaitTimeDate(int resortID, DateTime date, WaitTimeContext context)
        {
            var uplifts = context.Uplifts
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