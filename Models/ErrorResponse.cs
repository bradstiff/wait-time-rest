using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace WaitTime.Models
{
    public class ErrorResponse
    {
        public ErrorResponse(HttpStatusCode code, string message) : this((int)code, default(int), message) { }

        public ErrorResponse(HttpStatusCode code, int number, string message) : this((int)code, number, message) { }

        public ErrorResponse(int code, int number, string message)
        {
            Code = code;
            Number = number;
            Message = message;
        }

        [JsonProperty("code")]
        public int Code { get; set; }

        [JsonProperty("errorNumber")]
        public int Number { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        public static ObjectResult AsStatusCodeResult(HttpStatusCode code, string message = null)
        {
            var result = new ObjectResult(new ErrorResponse(code, message));
            result.StatusCode = (int)code;

            return result;
        }

        public static ObjectResult AsStatusCodeResult(HttpStatusCode code, int number, string message = null)
        {
            var result = new ObjectResult(new ErrorResponse(code, number, message));
            result.StatusCode = (int)code;

            return result;
        }
    }
}
