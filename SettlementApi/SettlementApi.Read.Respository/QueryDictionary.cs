using System;
using SettlementApi.CommandBus;
using SettlementApi.Read.Model;
using SettlementApi.Read.QueryCommand;
using SettlementApi.Read.QueryCommand.DictionaryModule;

namespace SettlementApi.Read.Respository
{
    public class QueryDictionary : BaseRRespository,
        ICommandBus<QueryDictionaryCommand, BasePagingCommandResult<RQueryDictionary>>
    {
        public BasePagingCommandResult<RQueryDictionary> Execute(QueryDictionaryCommand command)
        {
            return QueryPaging<EQueryDictionary, RQueryDictionary, QueryDictionaryCommand>("Dictionary.Query", command);
        }

        public void Receive(ICommand command)
        {
            throw new NotImplementedException();
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            if (command.GetType() == typeof(QueryDictionaryCommand))
                return Execute((QueryDictionaryCommand) command);
            return null;
        }
    }
}