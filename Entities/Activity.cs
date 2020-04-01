using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Entities
{
    public class Activity
    {
        public Activity()
        {
            Batches = new HashSet<ActivitySyncBatch>();
            Locations = new HashSet<ActivityLocation>();
            Segments = new HashSet<ActivitySegment>();
        }

        public Guid ActivityId { get; set; }
        public string Name { get; set; }
        public byte TypeId { get; set; }
        public DateTimeOffset StartDateTime { get; set; }
        public DateTimeOffset EndDateTime { get; set; }
        public int TotalTimeSeconds { get; set; }
        public float TotalDistanceMeters { get; set; }
        public int SkiTimeSeconds { get; set; }
        public float SkiDistanceMeters { get; set; }
        public int SkiVerticalMeters { get; set; }
        public int AscentTimeSeconds { get; set; }
        public float AscentDistanceMeters { get; set; }
        public int AscentVerticalMeters { get; set; }
        public float MaxSpeedMps { get; set; }
        public float AverageSpeedMps { get; set; }
        public int MaxAltitudeMeters { get; set; }
        public float MaxGradeDegrees { get; set; }
        public short RunsCount { get; set; }
        public string UserId { get; set; }
        public byte SourceTypeId { get; set; }
        public double Timestamp { get; set; }

        public ICollection<ActivitySyncBatch> Batches { get; set; }
        public ICollection<ActivityLocation> Locations { get; set; }
        public ICollection<ActivitySegment> Segments { get; set; }

        public AppUser User { get; set; }
    }
}
