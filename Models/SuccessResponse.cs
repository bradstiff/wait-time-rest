using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaitTime.Models
{
    public class SuccessResponse
    {
        public SuccessResponse()
        {
            Message = "OK";
        }

        [JsonProperty("message")]
        public string Message { get; set; }
    }
}
