using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Entities
{
    public static class ActivityExtensions
    {
        public static string SeasonName(this Activity activity)
        {
            var year = activity.StartDateTime.AddDays(-273).Year;
            return $"{year} - {year + 1}";
        }
    }
}
