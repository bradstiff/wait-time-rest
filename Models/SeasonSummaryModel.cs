using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Models
{
    public class SeasonSummaryModel
    {
        public int? Year { get; set; }
        public string Name { get; set; }
        public string FavoriteResort { get; set; }
        public int FavoriteResortDaysCount { get; set; }
        public string FavoriteLift { get; set; }
        public int FavoriteLiftUpliftsCount { get; set; }
        public int DaysCount { get; set; }
        public int ResortsCount { get; set; }
        public int RunsCount { get; set; }
        public int SkiTimeSeconds { get; set; }
        public float SkiDistanceMeters { get; set; }
        public int SkiVerticalMeters { get; set; }
        public float MaxSpeedMps { get; set; }
        public float MaxAltitudeMeters { get; set; }
        public float LongestRunMeters { get; set; }
        public int TallestRunMeters { get; set; }
    }
}
