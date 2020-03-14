using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Models
{
    public enum LiftTypeEnum : int
    {
        [Description("Chairlift")]
        ChairLift = 1,
        [Description("Mixed Lift")]
        MixedLift = 2,
        [Description("Cable Car")]
        CableCar = 3,
        [Description("Gondola")]
        Gondola = 4,
        [Description("Drag Lift")]
        DragLift = 5,
        [Description("T-Bar")]
        TBar = 6,
        [Description("J-Bar")]
        JBar = 7,
        [Description("Platter")]
        Platter = 8,
        [Description("Rope Tow")]
        RopeTow = 9,
        [Description("")]
        Unknown = 0
    }
}
