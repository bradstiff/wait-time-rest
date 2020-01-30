using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Entities
{
    public class Activity
    {
        public Activity()
        {
            Batches = new HashSet<ActivitySyncBatch>();
        }

        public Guid ActivityID { get; set; }
        public Guid UserID { get; set; }
        public byte SourceTypeID { get; set; }

        public ICollection<ActivitySyncBatch> Batches { get; set; }
    }
}
