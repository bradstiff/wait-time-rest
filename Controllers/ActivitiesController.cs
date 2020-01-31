﻿using System;
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
        [Route("sync/{userID}")]
        [ProducesResponseType(typeof(SuccessResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> PutActivitySyncBatch(Guid userID, [FromBody] ActivitySyncRequestModel model)
        {
            try
            {
                Console.WriteLine($"Source: {model.Source}");
                var sourceTypeID = model.Source.Equals("Android", StringComparison.InvariantCultureIgnoreCase) ? ActivitySourceTypeEnum.Android
                    : model.Source.Equals("iOS", StringComparison.InvariantCultureIgnoreCase) ? ActivitySourceTypeEnum.iOS
                    : throw new ArgumentOutOfRangeException(nameof(model.Source));

                foreach(var activityBatches in model.Batches.GroupBy(b => b.ActivityID))
                {
                    //get or create activity
                    var activity = await _context.Activities.SingleOrDefaultAsync(a => a.ActivityID == activityBatches.Key);
                    if (activity == null)
                    {
                        activity = new Activity
                        {
                            ActivityID = activityBatches.Key,
                            UserID = userID,
                            SourceTypeID = (byte)sourceTypeID
                        };
                        _context.Activities.Add(activity);
                    }

                    foreach (var syncBatch in activityBatches)
                    {
                        var batch = await _context.ActivitySyncBatches.SingleOrDefaultAsync(b => b.ActivitySyncBatchID == syncBatch.ActivitySyncBatchID);
                        if (batch != null)
                        {
                            //batch already saved
                            continue;
                        }

                        var array = syncBatch.LocationsArray;
                        if (array.GetLength(1) != 10)
                        {
                            var error = $"Activity {syncBatch.ActivityID}, Batch {syncBatch.BatchNbr} for User {userID}: Locations array has the wrong number of columns. Expected 10 columns, found {array.GetLength(1)}.";
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
                                Timestamp = (float)(array[row, 9] ?? 0),
                            }).ToList();

                        batch = new ActivitySyncBatch
                        {
                            ActivitySyncBatchID = syncBatch.ActivitySyncBatchID,
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
    }
}