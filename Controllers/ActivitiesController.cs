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

        [HttpPut]
        [ValidateModel]
        [Route("sync/{userId}")]
        [ProducesResponseType(typeof(SuccessResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> SyncUserActivityBatches(Guid userId, [FromBody] ActivitySyncRequestModel model)
        {
            try
            {
                var sourceTypeID = model.Source?.Equals("Android", StringComparison.InvariantCultureIgnoreCase) == true ? ActivitySourceTypeEnum.Android
                    : model.Source?.Equals("iOS", StringComparison.InvariantCultureIgnoreCase) == true ? ActivitySourceTypeEnum.iOS
                    : throw new ArgumentOutOfRangeException(nameof(model.Source));

                foreach (var activityBatches in model.Batches.GroupBy(b => b.ActivityId))
                {
                    //get or create activity
                    var activity = await _context.Activities.SingleOrDefaultAsync(a => a.ActivityId == activityBatches.Key);
                    if (activity == null)
                    {
                        activity = new Activity
                        {
                            ActivityId = activityBatches.Key,
                            UserId = userId,
                            SourceTypeId = (byte)sourceTypeID
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
                        var locations = Enumerable
                            .Range(0, array.GetLength(0))
                            .Select(row => new ActivitySyncBatchLocation
                            {
                                Latitude = (float)(array[row, 0] ?? 0),
                                Longitude = (float)(array[row, 1] ?? 0),
                                Accuracy = (float)(array[row, 2] ?? 0),
                                Altitude = (float)(array[row, 3] ?? 0),
                                AltitudeAccuracy = (float)(array[row, 4]),
                                Bearing = (float)(array[row, 5] ?? 0),
                                BearingAccuracy = (float)(array[row, 6]),
                                Speed = (float)(array[row, 7] ?? 0),
                                SpeedAccuracy = (float)(array[row, 8] ?? 0),
                                Timestamp = (double)(array[row, 9] ?? 0),
                            }).ToList();

                        batch = new ActivitySyncBatch
                        {
                            ActivitySyncBatchId = syncBatch.ActivitySyncBatchId,
                            BatchNbr = syncBatch.BatchNbr,
                            Locations = locations
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
                return ErrorResponse.AsStatusCodeResult(HttpStatusCode.InternalServerError, "Error processing batch}");
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
                activity.TotalTimeSeconds = model.TotalTimeSeconds;
                activity.SkiTimeSeconds = model.SkiTimeSeconds;
                activity.VerticalFeet = model.VerticalFeet;
                activity.MaxAltitudeFeet = model.MaxAltitudeFeet;
                activity.DistanceMiles = model.DistanceMiles;
                activity.TopSpeedMph = model.TopSpeedMph;
                activity.AverageSpeedMph = model.AverageSpeedMph;
                activity.RunsCount = model.RunsCount;
                activity.UserId = model.UserId;
                activity.SourceTypeId = (byte)(model.Source?.Equals("Android", StringComparison.InvariantCultureIgnoreCase) == true ? ActivitySourceTypeEnum.Android
                    : model.Source?.Equals("iOS", StringComparison.InvariantCultureIgnoreCase) == true ? ActivitySourceTypeEnum.iOS
                    : throw new ArgumentOutOfRangeException(nameof(model.Source)));

                await _context.SaveChangesAsync();
                return Ok(new SuccessResponse());
            }
            catch (Exception e)
            {
                Console.WriteLine("Error processing batch", e);
                _logger.LogError("Error processing batch", e);
                return ErrorResponse.AsStatusCodeResult(HttpStatusCode.InternalServerError, "Error processing batch}");
            }
        }
    }
}