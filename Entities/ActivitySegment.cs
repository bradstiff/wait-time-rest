using System;
using System.Collections.Generic;
using System.Text;

namespace WaitTime.Entities
{
    public class ActivitySegment
    {
        public int ActivitySegmentId { get; set; }
        public Guid ActivityId { get; set; }
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
        public Activity Activity { get; set; }
    }
}
