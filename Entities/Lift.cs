using System;
using System.Collections.Generic;

namespace WaitTime.Entities
{
    public partial class Lift
    {
        public Lift()
        {
            Uplift = new HashSet<Uplift>();
        }

        public int LiftID { get; set; }
        public string Name { get; set; }
        public byte TypeId { get; set; }
        public int? Occupancy { get; set; }
        public double Point1Latitude { get; set; }
        public double Point1Longitude { get; set; }
        public double Point2Latitude { get; set; }
        public double Point2Longitude { get; set; }
        public double? Point3Latitude { get; set; }
        public double? Point3Longitude { get; set; }
        public double? Point4Latitude { get; set; }
        public double? Point4Longitude { get; set; }
        public double? Point5Latitude { get; set; }
        public double? Point5Longitude { get; set; }
        public bool IsActive { get; set; }
        public int? OsmId { get; set; }
        public string OsmLink { get; set; }
        public double? Point1Altitude { get; set; }
        public double? Point2Altitude { get; set; }
        public double? Point3Altitude { get; set; }
        public double? Point4Altitude { get; set; }
        public double? Point5Altitude { get; set; }
        public double? AverageUpliftSpeed { get; set; }
        public double? EligibleWaitDistance { get; set; }
        public double? EligibleWaitWindow { get; set; }
        public bool IsHidden { get; set; }
        public int? ResortID { get; set; }

        public Resort Resort { get; set; }
        public ICollection<Uplift> Uplift { get; set; }
    }
}
