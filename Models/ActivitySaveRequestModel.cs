using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Models
{
    public class ActivitySaveRequestModel
    {
        public string Name { get; set; }
        public DateTimeOffset StartDateTime { get; set; }
        public DateTimeOffset EndDateTime { get; set; }
        public double TotalTimeSeconds { get; set; }
        public double SkiTimeSeconds { get; set; }
        public double VerticalMeters { get; set; }
        public double MaxAltitudeMeters { get; set; }
        public double DistanceMeters { get; set; }
        public double TopSpeedMps { get; set; }
        public double AverageSpeedMps { get; set; }
        public short RunsCount { get; set; }
        public Guid UserId { get; set; }
        public string Source { get; set; }
        public int Timestamp { get; set; }
    }
}
