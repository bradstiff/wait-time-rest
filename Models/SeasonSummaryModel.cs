using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Models
{
    public class SeasonSummaryModel
    {
        public int Year { get; set; }
        public string Name { get; set; }
        public int SkiDays { get; set; }
        public float SkiDistanceMeters { get; set; }
        public int SkiVerticalMeters { get; set; }
        public float MaxSpeedMps { get; set; }
    }
}
