using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaitTime.Components;
using WaitTime.Models;

namespace wait_time.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        [HttpPut]
        [ValidateModel]
        [Route("sync/{userID}")]
        [ProducesResponseType(typeof(SuccessResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> PutActivitySyncBatch(Guid userID, ActivitySyncRequestModel model)
        {
            try
            {
                model.Batches.ForEach(batch =>
                {
                    var array = batch.LocationsArray;
                    if (array.GetLength(1) != 10)
                    {
                        var error = $"Activity {batch.ActivityID}, Batch {batch.BatchNbr} for User {userID}: Locations array has the wrong number of columns. Expected 10 columns, found {array.GetLength(1)}.";
                        Console.WriteLine(error);
                        throw new ArgumentOutOfRangeException(nameof(model), error);
                    }
                    var locations = Enumerable
                        .Range(0, array.GetLength(0))
                        .Select(row => new Location
                        {
                            Latitude = array[row, 0],
                            Longitude = array[row, 1],
                            Accuracy = array[row, 2],
                            Altitude = array[row, 3],
                            AltitudeAccuracy = array[row, 4],
                            Bearing = array[row, 5],
                            BearingAccuracy = array[row, 6],
                            Speed = array[row, 7],
                            SpeedAccuracy = array[row, 8],
                            Timestamp = array[row, 9],
                        }).ToList();
                });
                return Ok(new SuccessResponse());
            }
            catch
            {
                return ErrorResponse.AsStatusCodeResult(HttpStatusCode.InternalServerError, "Error processing batch.");
            }
        }
    }
}