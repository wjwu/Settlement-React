using System;

namespace TT.Admin.WebApi.Dtos.Sign
{
    public class SignInResponse
    {
        public UserInfo User { get; set; }
        public Guid Token { get; set; }
    }
}