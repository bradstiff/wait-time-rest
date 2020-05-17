using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Models
{
    public class ActivitySaveRequestModel
    {
        public string Name { get; set; }
        public string ActivityType { get; set; }
        public DateTimeOffset StartDateTime { get; set; }
        public DateTimeOffset EndDateTime { get; set; }
        public double? TotalTimeSeconds { get; set; }
        public double? TotalDistanceMeters { get; set; }
        public double? SkiTimeSeconds { get; set; }
        public double? SkiDistanceMeters { get; set; }
        public double? SkiVerticalMeters { get; set; }
        public double? AscentTimeSeconds { get; set; }
        public double? AscentDistanceMeters { get; set; }
        public double? AscentVerticalMeters { get; set; }
        public double? MaxSpeedMps { get; set; }
        public double? AverageSpeedMps { get; set; }
        public double? MaxAltitudeMeters { get; set; }
        public double? MaxGradeDegrees { get; set; }
        public short? RunsCount { get; set; }
        public double Timestamp { get; set; }
        public string Source { get; set; }
        public IList<ActivitySegmentSaveRequestModel> Segments { get; set; }
    }

    public class ActivitySegmentSaveRequestModel
    {
        public int ActivitySegmentId { get; set; }
        public string Name { get; set; }
        public double? StartTimestamp { get; set; }
        public double? EndTimestamp { get; set; }
        public double? TotalTimeSeconds { get; set; }
        public double? MovingTimeSeconds { get; set; }
        public double? VerticalMeters { get; set; }
        public double? StartAltitude { get; set; }
        public double? EndAltitude { get; set; }
        public double? DistanceMeters { get; set; }
        public double? MaxSpeedMps { get; set; }
        public double? AverageSpeedMps { get; set; }
        public double? MaxGradeDegrees { get; set; }
        public bool? IsRun { get; set; }
    }

    public class ActivitySaveDataRequestModel
    {
        public Guid ActivitySyncBatchId { get; set; }
        public Guid ActivityId { get; set; }
        public int BatchNbr { get; set; }

        [JsonProperty("locations")]
        public double?[,] LocationsArray { get; set; }
        public string Source { get; set; }
    }
}
