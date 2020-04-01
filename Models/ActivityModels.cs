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
        public double TotalTimeSeconds { get; set; }
        public double TotalDistanceMeters { get; set; }
        public double SkiTimeSeconds { get; set; }
        public double SkiDistanceMeters { get; set; }
        public double SkiVerticalMeters { get; set; }
        public double AscentTimeSeconds { get; set; }
        public double AscentDistanceMeters { get; set; }
        public double AscentVerticalMeters { get; set; }
        public double MaxSpeedMps { get; set; }
        public double AverageSpeedMps { get; set; }
        public double MaxAltitudeMeters { get; set; }
        public double MaxGradeDegrees { get; set; }
        public short RunsCount { get; set; }
        public double Timestamp { get; set; }
        public string Source { get; set; }
        public IList<ActivitySegmentModel> Segments { get; set; }
    }

    public class ActivityModel
    {
        public Guid ActivityId { get; set; }
        public string ActivityType { get; set; }
        public string Name { get; set; }
        public string ThumbnailUrl { get; set; }
        public string ImageUrl { get; set; }
        public string Athlete { get; set; }
        public string AthletePhotoUrl { get; set; }
        public DateTimeOffset StartDateTime { get; set; }
        public DateTimeOffset EndDateTime { get; set; }
        public int TotalTimeSeconds { get; set; }
        public float TotalDistanceMeters { get; set; }
        public int SkiTimeSeconds { get; set; }
        public float SkiDistanceMeters { get; set; }
        public int SkiVerticalMeters { get; set; }
        public int AscentTimeSeconds { get; set; }
        public float AscentDistanceMeters { get; set; }
        public int AscentVerticalMeters { get; set; }
        public float MaxSpeedMps { get; set; }
        public float AverageSpeedMps { get; set; }
        public int MaxAltitudeMeters { get; set; }
        public float MaxGradeDegrees { get; set; }
        public short RunsCount { get; set; }
        public double Timestamp { get; set; }
        public string Source { get; set; }
        public double[,] LocationsArray { get; set; }
        public IList<ActivityLocationModel> Locations { get; set; }
        public IList<ActivitySegmentModel> Segments { get; set; }
    }

    public class ActivityLocationModel
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Timestamp { get; set; }
    }

    public class ActivitySegmentModel
    {
        public int ActivitySegmentId { get; set; }
        public string Name { get; set; }
        public double StartTimestamp { get; set; }
        public double EndTimestamp { get; set; }
        public int TotalTimeSeconds { get; set; }
        public int MovingTimeSeconds { get; set; }
        public int VerticalMeters { get; set; }
        public float StartAltitude { get; set; }
        public float EndAltitude { get; set; }
        public float DistanceMeters { get; set; }
        public float MaxSpeedMps { get; set; }
        public float AverageSpeedMps { get; set; }
        public float MaxGradeDegrees { get; set; }
        public bool IsRun { get; set; }
    }
}
