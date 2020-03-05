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
    public class ActivitiesController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly WaitTimeContext _context;

        public ActivitiesController(WaitTimeContext context, ILogger<ActivitiesController> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        [Route("feed/{userId}")]
        [ProducesResponseType(typeof(List<ActivityModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> GetFeed(Guid userId)
        {
            try
            {
                var response = await _context
                    .Activities
                    .Where(a => a.UserId == userId)
                    .OrderByDescending(a => a.StartDateTime)
                    .Select(a => Responses.Activity(a))
                    .ToListAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                Console.WriteLine("Error retrieving feed", e);
                _logger.LogError("Error retrieving feed", e);
                return ErrorResponse.AsStatusCodeResult(HttpStatusCode.InternalServerError, "Error retrieving feed");
            }
        }

        [HttpGet]
        [Route("{activityId}")]
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
                return Ok(Responses.Activity(activity));
            }
            catch (Exception e)
            {
                Console.WriteLine("Error retrieving activity", e);
                _logger.LogError("Error retrieving activity", e);
                return ErrorResponse.AsStatusCodeResult(HttpStatusCode.InternalServerError, "Error retrieving activity");
            }
        }

        [HttpPut]
        [ValidateModel]
        [Route("sync/{userId}")]
        [ProducesResponseType(typeof(SuccessResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> SyncUserActivityBatches(Guid userId, [FromBody] DataSyncRequestModel model)
        {
            try
            {
                var sourceTypeID = model.Source?.Equals("Android", StringComparison.InvariantCultureIgnoreCase) == true ? ActivitySourceTypeEnum.Android
                    : model.Source?.Equals("iOS", StringComparison.InvariantCultureIgnoreCase) == true ? ActivitySourceTypeEnum.iOS
                    : throw new ArgumentOutOfRangeException(nameof(model.Source));

                foreach (var activityBatches in model.Batches.GroupBy(b => b.ActivityId))
                {
                    var activityId = activityBatches.Key;

                    //get or create activity
                    var activity = await _context.Activities.SingleOrDefaultAsync(a => a.ActivityId == activityId);
                    if (activity == null)
                    {
                        activity = new Activity
                        {
                            ActivityId = activityId,
                            UserId = userId,
                            SourceTypeId = (byte)sourceTypeID,
                        };
                        _context.Activities.Add(activity);
                    }

                    foreach (var syncBatch in activityBatches)
                    {
                        var batch = await _context.ActivitySyncBatches.SingleOrDefaultAsync(b => b.ActivitySyncBatchId == syncBatch.ActivitySyncBatchId);
                        if (batch != null)
                        {
                            //batch already saved
                            continue;
                        }

                        var array = syncBatch.LocationsArray;
                        if (array.GetLength(1) != 10)
                        {
                            var error = $"Activity {syncBatch.ActivityId}, Batch {syncBatch.BatchNbr} for User {userId}: Locations array has the wrong number of columns. Expected 10 columns, found {array.GetLength(1)}.";
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
                            ActivitySyncBatchId = syncBatch.ActivitySyncBatchId,
                            BatchNbr = syncBatch.BatchNbr,
                        };
                        activity.Batches.Add(batch);
                    }
                }

                await _context.SaveChangesAsync();
                return Ok(new SuccessResponse());
            }
            catch (Exception e)
            {
                Console.WriteLine("Error processing batch", e);
                _logger.LogError("Error processing batch", e);
                return ErrorResponse.AsStatusCodeResult(HttpStatusCode.InternalServerError, "Error processing batch");
            }
        }

        [HttpPut]
        [ValidateModel]
        [Route("{activityId}")]
        [ProducesResponseType(typeof(SuccessResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> SaveActivity(Guid activityId, [FromBody] ActivitySaveRequestModel model)
        {
            try
            {
                var activity = await _context.Activities.SingleAsync(a => a.ActivityId == activityId);

                activity.Name = model.Name;
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
                activity.Timestamp = model.Timestamp;
                activity.UserId = model.UserId;
                activity.SourceTypeId = (byte)(model.Source?.Equals("Android", StringComparison.InvariantCultureIgnoreCase) == true ? ActivitySourceTypeEnum.Android
                    : model.Source?.Equals("iOS", StringComparison.InvariantCultureIgnoreCase) == true ? ActivitySourceTypeEnum.iOS
                    : throw new ArgumentOutOfRangeException(nameof(model.Source)));
                activity.Timestamp = model.Timestamp;

                activity.Segments = model
                    .Segments.Select(s => new ActivitySegment
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

                await _context.SaveChangesAsync();
                return Ok(new SuccessResponse());
            }
            catch (Exception e)
            {
                Console.WriteLine("Error saving activity", e);
                _logger.LogError("Error saving activity", e);
                return ErrorResponse.AsStatusCodeResult(HttpStatusCode.InternalServerError, "Error saving activity");
            }
        }
    }
}