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
                MaxAltitudeMeters = activity.MaxAltitudeMeters,
                TopSpeedMps = activity.TopSpeedMps,
                AverageSpeedMps = activity.AverageSpeedMps,
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
                        StartAltitude = s.StartAltitude,
                        EndAltitude = s.EndAltitude,
                        DistanceMeters = s.DistanceMeters,
                        TopSpeedMps = s.TopSpeedMps,
                        AverageSpeedMps = s.AverageSpeedMps,
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
