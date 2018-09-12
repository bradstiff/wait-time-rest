using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Entities
{
    public partial class WaitTimeContext
    {
        public WaitTimeContext(DbContextOptions<WaitTimeContext> options)
            : base(options)
        { }
    }
}
