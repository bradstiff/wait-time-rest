using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Models
{
    public class ActivityModel
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
        public int Timestamp { get; set; }

        public IList<ActivityLocationModel> Locations { get; set; }
        public IList<ActivitySegmentModel> Segments { get; set; }
    }

    public class ActivityLocationModel
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public float Altitude { get; set; }
        public double Timestamp { get; set; }
    }

    public class ActivitySegmentModel
    {
        public string Name { get; set; }
        public double StartTimestamp { get; set; }
        public double EndTimestamp { get; set; }
        public int TotalTimeSeconds { get; set; }
        public int MovingTimeSeconds { get; set; }
        public float StartAltitude { get; set; }
        public float EndAltitude { get; set; }
        public float DistanceMeters { get; set; }
        public float TopSpeedMps { get; set; }
        public float AverageSpeedMps { get; set; }
        public bool IsRun { get; set; }
    }
}
