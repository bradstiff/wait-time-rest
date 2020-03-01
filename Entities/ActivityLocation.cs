using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Entities
{
    public class ActivityLocation
    {
        public int ActivityLocationId { get; set; }
        public Guid ActivityId { get; set; }
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
        public Activity Activity { get; set; }
    }
}
