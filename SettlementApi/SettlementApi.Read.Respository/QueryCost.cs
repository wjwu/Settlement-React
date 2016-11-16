using System;
using SettlementApi.CommandBus;
using SettlementApi.Read.QueryCommand;
using SettlementApi.Read.QueryCommand.CostModule;

namespace SettlementApi.Read.Respository
{
    public class QueryCost : BaseRRespository,
        ICommandBus<QueryCostCommand, BaseCommandResult<RQueryCost>>
    {
        public BaseCommandResult<RQueryCost> Execute(QueryCostCommand command)
        {
            return Query<RQueryCost, QueryCostCommand>("Cost.Query", command);
        }

        public void Receive(ICommand command)
        {
            throw new NotImplementedException();
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            if (command.GetType() == typeof(QueryCostCommand))
                return Execute((QueryCostCommand) command);
            return null;
        }
    }
}