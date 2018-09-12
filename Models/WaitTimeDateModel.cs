using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Models
{
    public class WaitTimeDateModel
    {
        public DateTime Date { get; set; }
        public IEnumerable<WaitTimePeriodModel> TimePeriods { get; set; }
    }
}
