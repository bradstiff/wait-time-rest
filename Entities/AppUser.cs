using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Entities
{
    public class AppUser
    {
        public AppUser()
        {
            Activities = new HashSet<Activity>();
        }

        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public char? Gender { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string Country { get; set; }
        public byte? DefaultActivityTypeId { get; set; }

        public ICollection<Activity> Activities { get; set; }
    }
}
