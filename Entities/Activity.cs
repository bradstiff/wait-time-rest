﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Entities
{
    public class Activity
    {
        public Activity()
        {
            Batches = new HashSet<ActivitySyncBatch>();
        }

        public Guid ActivityId { get; set; }
        public string Name { get; set; }
        public DateTimeOffset StartDateTime { get; set; }
        public DateTimeOffset EndDateTime { get; set; }
        public int TotalTimeSeconds { get; set; }
        public int SkiTimeSeconds { get; set; }
        public int VerticalFeet { get; set; }
        public int MaxAltitudeFeet { get; set; }
        public float DistanceMiles { get; set; }
        public float TopSpeedMph { get; set; }
        public float AverageSpeedMph { get; set; }
        public short RunsCount { get; set; }
        public Guid UserId { get; set; }
        public byte SourceTypeId { get; set; }

        public ICollection<ActivitySyncBatch> Batches { get; set; }
    }
}