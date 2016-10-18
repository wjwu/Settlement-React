﻿using System.Web.Http;
using SettlementApi.CommandBus;
using SettlementApi.Write.BusCommand;
using SettlementApi.Write.BusCommand.UserModule;

namespace SettlementApi.Api.Apis
{
    public class UserController : BaseApiController
    {
        private const string BusName = "UserBusinessLogic";

        [HttpPatch]
        [Route("api/user/password")]
        public void ChangePassword(ChangePasswordCommand request)
        {
            CommandService.Send(request, BusName);
        }
    }
}