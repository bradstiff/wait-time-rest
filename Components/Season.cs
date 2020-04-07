using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTime.Entities;

namespace WaitTime.Components
{
    public struct Season
    {
        public static Season FromDate(DateTimeOffset date)
        {
            //season goes from 10/1 to 9/30
            //ignore leap year
            var year = date.AddDays(-273).Year;
            return new Season(year);
        }

        public Season(int startYear)
        {
            Id = startYear;
        }

        public int Id { get; set; }
        public string Name => $"{Id} - {Id + 1}";

        public bool Contains(Activity activity)
        {
            return this.Equals(Season.FromDate(activity.StartDateTime));
        }
    }
}
