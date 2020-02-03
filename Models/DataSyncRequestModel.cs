using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Models
{
    public class DataSyncRequestModel
    {
        public string Source { get; set; }
        public List<ActivitySyncBatchModel> Batches { get; set; }
    }

    public class ActivitySyncBatchModel
    {
        public Guid ActivitySyncBatchId { get; set; }
        public Guid ActivityId { get; set; }
        public DateTimeOffset StartDateTime { get; set; }
        public int BatchNbr { get; set; }
        [JsonProperty("locations")]
        public double?[,] LocationsArray { get; set; }
    }
}
