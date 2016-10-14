using System;
using System.Web;
using SettlementApi.Api.Pools;
using SettlementApi.Context;

namespace SettlementApi.Api
{
    public class ServiceContext : IServiceContext
    {
        public string RequestIP => HttpContext.Current.Request.UserHostAddress;

        public Guid OperatorID => ApiContextPool.GetCurrentContext().Uid;
    }
}