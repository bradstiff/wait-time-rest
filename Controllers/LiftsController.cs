using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WaitTime.Components;
using WaitTime.Entities;
using WaitTime.Models;

namespace wait_time.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LiftsController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly WaitTimeContext _context;

        public LiftsController(WaitTimeContext context, ILogger<LiftsController> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<Lift>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> GetNearby([FromQuery] double latitude, [FromQuery] double longitude)
        {
            try
            {
                var rect = Geometry.GetRect(latitude, longitude, 10000);
                var response = await _context
                    .Lifts
                    .Where(l => l.Point1Latitude >= rect.StartLatitude && l.Point1Latitude <= rect.EndLatitude && l.Point1Longitude >= rect.StartLongitude && l.Point1Longitude <= rect.EndLongitude)
                    .ToListAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                Console.WriteLine("Error retrieving lifts", e);
                _logger.LogError(e, "Error retrieving lifts");
                return ErrorResponse.AsStatusCodeResult(HttpStatusCode.InternalServerError, "Error retrieving lifts");
            }
        }
    }
}