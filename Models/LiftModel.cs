using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Models
{
    public class LiftModel
    {
        public int LiftId { get; set; }
        public string Name { get; set; }
        public string LiftType { get; set; }
        public int? Occupancy { get; set; }
        public string Resort { get; set; }
        public IList<Coordinate> Coordinates { get; set; }
    }
}
