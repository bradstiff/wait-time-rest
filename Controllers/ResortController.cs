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
    [Route("/api/resorts")]
    [ApiController]
    public class ResortController : Controller
    {
        private readonly WaitTimeContext _context;
        private readonly ILogger _logger;

        public ResortController(WaitTimeContext context, ILogger<ResortController> logger)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<ResortModel> GetResorts()
        {
            return _context.Resorts
                .OrderBy(resort => resort.SortOrder)
                .Select(resort => new ResortModel
            {
                ID = resort.ResortID,
                Name = resort.Name,
                Slug = resort.Slug,
                LogoFilename = resort.LogoFilename,
                LiftCount = resort.Lifts.Count(),
                HasWaitTimes = resort.HasWaitTimes,
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
                model.LastDate = WaitTimeController.GetWaitTimeDate(resort.ResortID, dates.Last(), _context);
            }
            return model;
        }
    }
}