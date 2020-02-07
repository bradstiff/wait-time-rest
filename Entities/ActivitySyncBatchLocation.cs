using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Entities
{
    public class ActivitySyncBatchLocation
    {
        public int ActivitySyncBatchLocationId { get; set; }
        public Guid ActivitySyncBatchId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public float Accuracy { get; set; }
        public float Altitude { get; set; }
        public float? AltitudeAccuracy { get; set; }
        public float Bearing { get; set; }
        public float? BearingAccuracy { get; set; }
        public float Speed { get; set; }
        public float? SpeedAccuracy { get; set; }
        public double Timestamp { get; set; }
        public ActivitySyncBatch Batch { get; set; }
    }
}
