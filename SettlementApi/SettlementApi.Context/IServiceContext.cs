using System;

namespace SettlementApi.Context
{
    public interface IServiceContext
    {
        string RequestIP { get; }
        Guid OperatorID { get; }
    }
}