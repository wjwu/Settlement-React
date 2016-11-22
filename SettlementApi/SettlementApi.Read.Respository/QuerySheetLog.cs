using SettlementApi.CommandBus;
using SettlementApi.Read.QueryCommand;
using SettlementApi.Read.QueryCommand.SheetLogModule;

namespace SettlementApi.Read.Respository
{
    public class QuerySheetLog: BaseRRespository,
        ICommandBus<QuerySheetLogCommand, BaseCommandResult<RQuerySheetLog>>
    {
        public BaseCommandResult<RQuerySheetLog> Execute(QuerySheetLogCommand command)
        {
            return Query<RQuerySheetLog, QuerySheetLogCommand>("SheetLog.Query", command);
        }

        public void Receive(ICommand command)
        {
            throw new System.NotImplementedException();
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            if (command.GetType() == typeof(QuerySheetLogCommand))
                return Execute((QuerySheetLogCommand)command);
            return null;
        }
    }
}