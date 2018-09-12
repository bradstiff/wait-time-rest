using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Models
{
    public class WaitTimePeriodModel
    {
        public int Timestamp { get; set; }
        public IEnumerable<WaitTimeModel> WaitTimes { get; set; }
    }
}
