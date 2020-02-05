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
        }

        public Guid ActivityId { get; set; }
        public string Name { get; set; }
        public DateTimeOffset StartDateTime { get; set; }
        public DateTimeOffset EndDateTime { get; set; }
        public int TotalTimeSeconds { get; set; }
        public int SkiTimeSeconds { get; set; }
        public int VerticalMeters { get; set; }
        public int MaxAltitudeMeters { get; set; }
        public float DistanceMeters { get; set; }
        public float TopSpeedMps { get; set; }
        public float AverageSpeedMps { get; set; }
        public short RunsCount { get; set; }
        public Guid UserId { get; set; }
        public byte SourceTypeId { get; set; }
        public int Timestamp { get; set; }
        public ICollection<ActivitySyncBatch> Batches { get; set; }
    }
}
