using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WaitTime.Models;

namespace WaitTime.Components
{
    public class Geometry
    {
        public static (double StartLatitude, double EndLatitude, double StartLongitude, double EndLongitude) GetRect(double latitude, double longitude, int widthMeters)
        {
            var latitudeDelta = widthMeters / (double)111111;
            var longitudeDelta = Math.Abs(Math.Cos(latitude * (Math.PI / 180)));

            return (
                latitude - latitudeDelta,
                latitude + latitudeDelta,
                longitude - longitudeDelta,
                longitude + longitudeDelta
             );
        }

        double GetMetersPerDegreeLongitude(double latitude)
        {
            return 6371010 * Math.Cos(latitude * Math.PI / 180) * Math.PI / 180;
        }
    }
}
