using System;

namespace SettlementApi.Api.Dtos.Sign
{
    public class SignInResponse
    {
        public UserInfo User { get; set; }
        public Guid Token { get; set; }
    }
}