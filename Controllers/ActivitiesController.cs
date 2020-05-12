using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
    public class ActivitiesController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly WaitTimeContext _context;

        private string UserId => User.Claims.First(c => c.Type == "user_id").Value;

        public ActivitiesController(WaitTimeContext context, IHttpContextAccessor httpContextAccessor, ILogger<ActivitiesController> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        [Route("feed")]
        [Authorize]
        [ProducesResponseType(typeof(List<ActivityModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> GetFeed()
        {
            try
            {
                var activities = await _context.Activities
                    .Where(a => a.UserId == UserId)
                    .OrderByDescending(a => a.Timestamp)
                    .ToListAsync();
                var userIds = activities.Select(a => a.UserId).Distinct();
                var users = await _context.Users.Where(u => userIds.Contains(u.UserId)).ToDictionaryAsync(u => u.UserId);
                var response = activities.Select(a => Responses.Activity(a, users[a.UserId]));

                return Ok(response);
            }
            catch (Exception e)
            {
                Console.WriteLine("Error retrieving feed", e);
                _logger.LogError(e, "Error retrieving feed");
                return ErrorResponse.AsStatusCodeResult(HttpStatusCode.InternalServerError, "Error retrieving feed");
            }
        }

        [HttpGet]
        [Route("{activityId}")]
        [Authorize]
        [ProducesResponseType(typeof(ActivityModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> GetActivity(Guid activityId)
        {
            try
            {
                var activity = await _context
                    .Activities
                    .Include(a => a.Segments)
                    .Include(a => a.Locations)
                    .Where(a => a.ActivityId == activityId)
                    .FirstOrDefaultAsync();

                if (activity == null)
                {
                    return NotFound();
                }

                var user = await _context.Users.FindAsync(activity.UserId);
                return Ok(Responses.Activity(activity, user));
            }
            catch (Exception e)
            {
                Console.WriteLine("Error retrieving activity", e);
                _logger.LogError(e, "Error retrieving activity");
                return ErrorResponse.AsStatusCodeResult(HttpStatusCode.InternalServerError, "Error retrieving activity");
            }
        }

        [HttpPut]
        [ValidateModel]
        [Route("sync")]
        [Authorize]
        [ProducesResponseType(typeof(SuccessResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> SyncUserActivityBatches([FromBody] DataSyncRequestModel model)
        {
            try
            {
                var sourceTypeID = Enum.Parse<ActivitySourceTypeEnum>(model.Source, true);

                //get or create activity
                var activity = await _context.Activities.SingleOrDefaultAsync(a => a.ActivityId == model.ActivityId);
                if (activity == null)
                {
                    activity = new WaitTime.Entities.Activity
                    {
                        ActivityId = model.ActivityId,
                        UserId = this.UserId,
                        SourceTypeId = (byte)sourceTypeID,
                    };
                    _context.Activities.Add(activity);
                }

                var batch = await _context.ActivitySyncBatches.SingleOrDefaultAsync(b => b.ActivitySyncBatchId == model.ActivitySyncBatchId);
                if (batch != null)
                {
                    //batch already saved
                    return Ok(new SuccessResponse());
                }

                var array = model.LocationsArray;
                if (array.GetLength(1) != 10)
                {
                    var error = $"Activity {model.ActivityId}, Batch {model.BatchNbr} for User {UserId}: Locations array has the wrong number of columns. Expected 10 columns, found {array.GetLength(1)}.";
                    Console.WriteLine(error);
                    throw new ArgumentOutOfRangeException(nameof(model), error);
                }

                foreach(var location in Enumerable
                    .Range(0, array.GetLength(0))
                    .Select(row => new ActivityLocation
                    {
                        Latitude = (double)(array[row, 0] ?? 0),
                        Longitude = (double)(array[row, 1] ?? 0),
                        Accuracy = (float)(array[row, 2] ?? 0),
                        Altitude = (float)(array[row, 3] ?? 0),
                        AltitudeAccuracy = (float)(array[row, 4]),
                        Bearing = (float)(array[row, 5] ?? 0),
                        BearingAccuracy = (float)(array[row, 6]),
                        Speed = (float)(array[row, 7] ?? 0),
                        SpeedAccuracy = (float)(array[row, 8] ?? 0),
                        Timestamp = (double)(array[row, 9] ?? 0),
                    }))
                {
                    activity.Locations.Add(location);
                }

                batch = new ActivitySyncBatch
                {
                    ActivitySyncBatchId = model.ActivitySyncBatchId,
                    BatchNbr = model.BatchNbr,
                };
                activity.Batches.Add(batch);

                await _context.SaveChangesAsync();
                return Ok(new SuccessResponse());
            }
            catch (Exception e)
            {
                Console.WriteLine("Error processing batch", e);
                _logger.LogError(e, "Error processing batch");
                return ErrorResponse.AsStatusCodeResult(HttpStatusCode.InternalServerError, "Error processing batch");
            }
        }

        [HttpPut]
        [ValidateModel]
        [Route("{activityId}")]
        [Authorize]
        [ProducesResponseType(typeof(SuccessResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> SaveActivity(Guid activityId, [FromBody] ActivitySaveRequestModel model)
        {
            try
            {
                var activity = await _context.Activities
                    .Include(a => a.Locations)
                    .SingleAsync(a => a.ActivityId == activityId);

                activity.Name = model.Name;
                activity.TypeId = (byte)Enum.Parse<ActivityTypeEnum>(model.ActivityType, true);
                activity.StartDateTime = model.StartDateTime;
                activity.EndDateTime = model.EndDateTime;
                activity.TotalTimeSeconds = Convert.ToInt32(model.TotalTimeSeconds);
                activity.TotalDistanceMeters = Convert.ToSingle(model.TotalDistanceMeters);
                activity.SkiTimeSeconds = Convert.ToInt32(model.SkiTimeSeconds);
                activity.SkiDistanceMeters = Convert.ToSingle(model.SkiDistanceMeters);
                activity.SkiVerticalMeters = Convert.ToInt32(model.SkiVerticalMeters);
                activity.AscentTimeSeconds = Convert.ToInt32(model.AscentTimeSeconds);
                activity.AscentDistanceMeters = Convert.ToSingle(model.AscentDistanceMeters);
                activity.AscentVerticalMeters = Convert.ToInt32(model.AscentVerticalMeters);
                activity.MaxSpeedMps = Convert.ToSingle(model.MaxSpeedMps);
                activity.AverageSpeedMps = Convert.ToSingle(model.AverageSpeedMps);
                activity.MaxAltitudeMeters = Convert.ToInt32(model.MaxAltitudeMeters);
                activity.MaxGradeDegrees = Convert.ToSingle(model.MaxGradeDegrees);
                activity.RunsCount = model.RunsCount;
                activity.UserId = this.UserId;
                activity.SourceTypeId = (byte)Enum.Parse<ActivitySourceTypeEnum>(model.Source, true);
                activity.Timestamp = model.Timestamp;

                activity.Segments = model
                    .Segments?.Select(s => new ActivitySegment
                    {
                        Name = s.Name,
                        StartTimestamp = s.StartTimestamp,
                        EndTimestamp = s.EndTimestamp,
                        TotalTimeSeconds = s.TotalTimeSeconds,
                        MovingTimeSeconds = s.MovingTimeSeconds,
                        VerticalMeters = s.VerticalMeters,
                        StartAltitude = s.StartAltitude,
                        EndAltitude = s.EndAltitude,
                        DistanceMeters  = s.DistanceMeters,
                        MaxSpeedMps = s.MaxSpeedMps,
                        AverageSpeedMps = s.AverageSpeedMps,
                        MaxGradeDegrees = s.MaxGradeDegrees,
                        IsRun = s.IsRun
                    })
                    .ToList();

                var locations = TrackSimplifier.Simplify(activity.Locations.OrderBy(l => l.Timestamp).ToList(), 0.00005);
                var polyline = WebUtility.UrlEncode(Geometry.Encode(locations));
                activity.Polyline = polyline;

                await _context.SaveChangesAsync();
                return Ok(new SuccessResponse());
            }
            catch (Exception e)
            {
                Console.WriteLine("Error saving activity", e);
                _logger.LogError(e, "Error saving activity");
                return ErrorResponse.AsStatusCodeResult(HttpStatusCode.InternalServerError, "Error saving activity");
            }
        }


        [HttpDelete]
        [ValidateModel]
        [Route("{activityId}")]
        [Authorize]
        [ProducesResponseType(typeof(SuccessResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> DeleteActivity(Guid activityId)
        {
            try
            {
                var activity = await _context.Activities
                    .Include(a => a.Segments)
                    .Include(a => a.Locations)
                    .Include(a => a.Batches)
                    .SingleAsync(a => a.ActivityId == activityId);
                _context.Activities.Remove(activity);
                await _context.SaveChangesAsync();
                return Ok(new SuccessResponse());
            }
            catch (Exception e)
            {
                Console.WriteLine("Error deleting activity", e);
                _logger.LogError(e, "Error deleting activity");
                return ErrorResponse.AsStatusCodeResult(HttpStatusCode.InternalServerError, "Error deleting activity");
            }
        }
    }
}