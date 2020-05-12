using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Models
{
    public class DataSyncRequestModel
    {
        public Guid ActivitySyncBatchId { get; set; }
        public Guid ActivityId { get; set; }
        public int BatchNbr { get; set; }

        [JsonProperty("locations")]
        public double?[,] LocationsArray { get; set; }
        public string Source { get; set; }
    }
}
