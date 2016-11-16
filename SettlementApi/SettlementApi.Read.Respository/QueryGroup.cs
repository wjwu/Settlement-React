using System;
using SettlementApi.CommandBus;
using SettlementApi.Read.QueryCommand;
using SettlementApi.Read.QueryCommand.GroupModule;

namespace SettlementApi.Read.Respository
{
    public class QueryGroup : BaseRRespository,
        ICommandBus<QueryGroupCommand, BaseCommandResult<RQueryGroup>>,
        ICommandBus<GetByIDCommand, GetGroupCommandResult>
    {
        public GetGroupCommandResult Execute(GetByIDCommand command)
        {
            return GetByID<GetGroupCommandResult>("Group.GetByID", command);
        }

        public BaseCommandResult<RQueryGroup> Execute(QueryGroupCommand command)
        {
            return Query<RQueryGroup, QueryGroupCommand>("Group.Query", command);
        }

        public void Receive(ICommand command)
        {
            throw new NotImplementedException();
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            if (command.GetType() == typeof(QueryGroupCommand))
                return Execute((QueryGroupCommand) command);
            if (command.GetType() == typeof(GetByIDCommand))
                return Execute((GetByIDCommand) command);
            return null;
        }
    }
}