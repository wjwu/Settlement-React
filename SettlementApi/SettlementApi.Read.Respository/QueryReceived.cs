using System;
using SettlementApi.CommandBus;
using SettlementApi.Read.QueryCommand;
using SettlementApi.Read.QueryCommand.ReceivedModule;

namespace SettlementApi.Read.Respository
{
    public class QueryReceived : BaseRRespository,
        ICommandBus<QueryReceivedCommand, BaseCommandResult<RQueryReceived>>
    {
        public BaseCommandResult<RQueryReceived> Execute(QueryReceivedCommand command)
        {
            return Query<RQueryReceived, QueryReceivedCommand>("Received.Query", command);
        }

        public void Receive(ICommand command)
        {
            throw new NotImplementedException();
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            if (command.GetType() == typeof(QueryReceivedCommand))
                return Execute((QueryReceivedCommand) command);
            return null;
        }
    }
}