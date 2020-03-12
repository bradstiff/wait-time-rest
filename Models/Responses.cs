using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTime.Entities;

namespace WaitTime.Models
{
    public static class Responses
    {
        public static ActivityModel Activity(Activity activity)
        {
            //var locations = activity.Locations?.ToArray();
            //var locationCount = locations?.Length ?? 0;
            //double[,] locationsArray = new double[locationCount, 3];
            //for (int i = 0; i < locationCount; i++)
            //{
            //    var location = locations[i];
            //    for (int j = 0; j < 3; j++)
            //    {
            //        double value;
            //        switch (j)
            //        {
            //            case 0:
            //                value = location.Latitude;
            //                break;
            //            case 1:
            //                value = location.Longitude;
            //                break;
            //            default:
            //                value = location.Timestamp;
            //                break;
            //        }
            //        locationsArray[i, j] = value;
            //    }
            //}

            return new ActivityModel
            {
                ActivityId = activity.ActivityId,
                Name = activity.Name,
                ActivityType = ((ActivityTypeEnum)activity.TypeId).ToString(),
                StartDateTime = activity.StartDateTime,
                EndDateTime = activity.EndDateTime,
                TotalTimeSeconds = activity.TotalTimeSeconds,
                TotalDistanceMeters = activity.TotalDistanceMeters,
                SkiTimeSeconds = activity.SkiTimeSeconds,
                SkiDistanceMeters = activity.SkiDistanceMeters,
                SkiVerticalMeters = activity.SkiVerticalMeters,
                AscentTimeSeconds = activity.AscentTimeSeconds,
                AscentDistanceMeters = activity.AscentDistanceMeters,
                AscentVerticalMeters = activity.AscentVerticalMeters,
                MaxSpeedMps = activity.MaxSpeedMps,
                AverageSpeedMps = activity.AverageSpeedMps,
                MaxAltitudeMeters = activity.MaxAltitudeMeters,
                MaxGradeDegrees = activity.MaxGradeDegrees,
                RunsCount = activity.RunsCount,
                UserId = activity.UserId,
                Source = ((ActivitySourceTypeEnum)activity.SourceTypeId).ToString(),
                Timestamp = activity.Timestamp,
                Segments = activity.Segments?
                    .Select(s => new ActivitySegmentModel
                    {
                        ActivitySegmentId = s.ActivitySegmentId,
                        Name = s.Name,
                        StartTimestamp = s.StartTimestamp,
                        EndTimestamp = s.EndTimestamp,
                        TotalTimeSeconds = s.TotalTimeSeconds,
                        MovingTimeSeconds = s.MovingTimeSeconds,
                        VerticalMeters = s.VerticalMeters,
                        StartAltitude = s.StartAltitude,
                        EndAltitude = s.EndAltitude,
                        DistanceMeters = s.DistanceMeters,
                        MaxSpeedMps = s.MaxSpeedMps,
                        AverageSpeedMps = s.AverageSpeedMps,
                        MaxGradeDegrees = s.MaxGradeDegrees,
                        IsRun = s.IsRun
                    })
                    .OrderBy(s => s.StartTimestamp)
                    .ToList(),
                Locations = activity.Locations?
                    .Select(l => new ActivityLocationModel
                    {
                        Latitude = l.Latitude,
                        Longitude = l.Longitude,
                        Timestamp = l.Timestamp,
                    })
                    .OrderBy(l => l.Timestamp)
                    .ToList(),
                //LocationsArray = locationsArray,
            };
        }
    }
}
