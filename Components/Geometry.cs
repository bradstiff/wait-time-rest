using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WaitTime.Entities;
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

        public static string Encode(IEnumerable<ActivityLocation> points)
        {
            var str = new StringBuilder();

            var encodeDiff = (Action<int>)(diff => {
                int shifted = diff << 1;
                if (diff < 0)
                    shifted = ~shifted;
                int rem = shifted;
                while (rem >= 0x20)
                {
                    str.Append((char)((0x20 | (rem & 0x1f)) + 63));
                    rem >>= 5;
                }
                str.Append((char)(rem + 63));
            });

            int lastLat = 0;
            int lastLng = 0;
            foreach (var point in points)
            {
                int lat = (int)Math.Round(point.Latitude * 1E5);
                int lng = (int)Math.Round(point.Longitude * 1E5);
                encodeDiff(lat - lastLat);
                encodeDiff(lng - lastLng);
                lastLat = lat;
                lastLng = lng;
            }
            return str.ToString();
        }
    }
}
