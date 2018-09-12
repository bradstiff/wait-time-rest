using System;
using System.Collections.Generic;

namespace WaitTime.Entities
{
    public partial class Resort
    {
        public Resort()
        {
            Lifts = new HashSet<Lift>();
        }

        public int ResortID { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string LogoFilename { get; set; }
        public string TrailMapFilename { get; set; }
        public string Timezone { get; set; }
        public int SortOrder { get; set; }
        public bool HasWaitTimes { get; set; }

        public ICollection<Lift> Lifts { get; set; }
    }
}
