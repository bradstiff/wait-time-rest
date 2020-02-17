using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Models
{
    public class ActivitiesResponse
    {
        public List<ActivityResponse> Activities { get; set; }
    }

    public class ActivityResponse
    {
        public Guid ActivityId { get; set; }
        public string Name { get; set; }
        public DateTimeOffset StartDateTime { get; set; }
        public DateTimeOffset EndDateTime { get; set; }
        public int TotalTimeSeconds { get; set; }
        public float TotalDistanceMeters { get; set; }
        public int SkiTimeSeconds { get; set; }
        public float SkiDistanceMeters { get; set; }
        public int SkiVerticalMeters { get; set; }
        public int MaxAltitudeMeters { get; set; }
        public float TopSpeedMps { get; set; }
        public float AverageSpeedMps { get; set; }
        public short RunsCount { get; set; }
        public Guid UserId { get; set; }
        public string Source { get; set; }
        public int Timestamp { get; set; }
    }
}
