﻿using SettlementApi.CommandBus;
using SettlementApi.Read.Model;
using SettlementApi.Read.QueryCommand;
using SettlementApi.Read.QueryCommand.GroupModule;

namespace SettlementApi.Read.Respository
{
    public class QueryGroup: BaseRRespository, ICommandBus<QueryGroupCommand, BasePagingCommandResult<RQueryGroup>>
    {
        public BasePagingCommandResult<RQueryGroup> Execute(QueryGroupCommand command)
        {
            return QueryPaging<EQueryGroup, RQueryGroup, QueryGroupCommand>("Group.Query", command);
        }

        public void Receive(ICommand command)
        {
            throw new System.NotImplementedException();
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            if (command.GetType() == typeof(QueryGroupCommand))
            {
                return Execute((QueryGroupCommand)command);
            }
            return null;
        }
    }
}