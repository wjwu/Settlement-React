using System;
using System.Linq;
using SettlementApi.CommandBus;
using SettlementApi.Read.Model;
using SettlementApi.Read.QueryCommand;
using SettlementApi.Read.QueryCommand.UserModule;

namespace SettlementApi.Read.Respository
{
    public class QueryUser : BaseRRespository, 
        ICommandBus<QueryUserCommand, BasePagingCommandResult<RQueryUser>>,
        ICommandBus<GetByIDCommand,GetUserCommandResult>
    {
        public BasePagingCommandResult<RQueryUser> Execute(QueryUserCommand command)
        {
            if (!string.IsNullOrEmpty(command.Groups))
                command.Path = command.Groups.Split(',');
            var result= QueryPaging<EQueryUser, RQueryUser, QueryUserCommand>("User.Query", command);
            if (result?.List != null)
            {
                if (result.List.Any(p=>p.LoginID=="super"))
                {
                    result.List=result.List.Where(p => p.LoginID != "super").ToList();
                }
            }
            return result;
        }

        public GetUserCommandResult Execute(GetByIDCommand command)
        {
            return GetByID<GetUserCommandResult>("User.Query.GetByID",command);
        }

        public void Receive(ICommand command)
        {
            throw new NotImplementedException();
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            if (command.GetType() == typeof(QueryUserCommand))
                return Execute((QueryUserCommand) command);
            if (command.GetType() == typeof(GetByIDCommand))
                return Execute((GetByIDCommand)command);
            return null;
        }
    }
}