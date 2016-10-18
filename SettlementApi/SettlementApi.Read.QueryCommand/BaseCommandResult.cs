using System.Collections.Generic;
using SettlementApi.CommandBus;

namespace SettlementApi.Read.QueryCommand
{
    public class BaseCommandResult<T> : List<T>, ICommandResult where T : class
    {
    }
}