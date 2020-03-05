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
            return new ActivityModel
            {
                ActivityId = activity.ActivityId,
                Name = activity.Name,
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
                Timestamp = activity.Timestamp,
                Segments = activity.Segments?
                    .Select(s => new ActivitySegmentModel
                    {
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
                    .ToList(),
                Locations = activity.Locations?
                    .Select(l => new ActivityLocationModel
                    {
                        Latitude = l.Latitude,
                        Longitude = l.Longitude,
                        Altitude = l.Altitude,
                        Timestamp = l.Timestamp,
                    })
                    .ToList(),
            };
        }
    }
}
