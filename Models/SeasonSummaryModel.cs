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
        public int FavoriteResortDays { get; set; }
        public string FavoriteLift { get; set; }
        public int FavoriteLiftUplifts { get; set; }
        public int Days { get; set; }
        public int Resorts { get; set; }
        public int SkiTimeSeconds { get; set; }
        public float SkiDistanceMeters { get; set; }
        public int SkiVerticalMeters { get; set; }
        public float MaxSpeedMps { get; set; }
        public float MaxAltitudeMeters { get; set; }
        public float LongestRunMeters { get; set; }
        public int TallestRunMeters { get; set; }
    }
}
