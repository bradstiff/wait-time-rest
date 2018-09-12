using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Models
{
    public class ResortModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string LogoFilename { get; set; }
        public string TrailMapFilename { get; set; }
        public string Timezone { get; set; }
        public bool HasWaitTimes { get; set; }
        public int SortOrder { get; set; }
        public IEnumerable<DateTime> Dates { get; set; }
        public WaitTimeDateModel LastDate { get; set; }
        public int LiftCount { get; set; }
    }

}
