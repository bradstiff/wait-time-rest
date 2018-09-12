using System;
using System.Collections.Generic;

namespace WaitTime.Entities
{
    public partial class Uplift
    {
        public int UpliftID { get; set; }
        public double Timestamp { get; set; }
        public DateTime LocalDateTime { get; set; }
        public DateTime LocalDate { get; set; }
        public int LocalMinutes { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int WaitSeconds { get; set; }
        public int LiftID { get; set; }
        public int? TrackID { get; set; }

        public Lift Lift { get; set; }
    }
}
