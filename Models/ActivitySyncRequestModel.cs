using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Models
{
    public class ActivitySyncRequestModel
    {
        public List<ActivitySyncBatch> Batches { get; set; }
    }

    public class ActivitySyncBatch
    {
        public Guid ActivitySyncBatchID { get; set; }
        public Guid ActivityID { get; set; }
        public int BatchNbr { get; set; }
        [JsonProperty("locations")]
        public float[,] LocationsArray { get; set; }
    }
}
