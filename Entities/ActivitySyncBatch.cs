using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Entities
{
    public class ActivitySyncBatch
    {
        public Guid ActivitySyncBatchId { get; set; }
        public Guid ActivityId { get; set; }
        public int BatchNbr { get; set; }

        public Activity Activity { get; set; }
    }
}
