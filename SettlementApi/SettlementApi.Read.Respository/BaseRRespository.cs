using System.Collections.Generic;
using SettlementApi.CommandBus;
using SettlementApi.Common.Mapper;
using SettlementApi.DataAccess;
using SettlementApi.Read.QueryCommand;

namespace SettlementApi.Read.Respository
{
    public class BaseRRespository
    {
        public BasePagingCommandResult<TResult> QueryPaging<TQuery, TResult, TCommand>(string commandName,
            TCommand command)
            where TQuery : BaseQueryEntity
            where TResult : class
            where TCommand : class, ICommand
        {
            var entity = MapperHelper.Map<TCommand, TQuery>(command);

            var cmd = CommandManager.GetCommand(commandName);

            var result = new BasePagingCommandResult<TResult>();

            var count = cmd.Count(entity);

            if (count > 0)
            {
                cmd = CommandManager.GetCommand(commandName);
                cmd.AppendCondition(entity);
                cmd.CreatePageQuery(entity);

                result.PageIndex = entity.PageIndex;
                result.PageSize = entity.PageSize;
                result.SortField = entity.SortField;
                result.SortType = entity.SortType;
                result.TotalCount = count;
                result.List = cmd.ExecuteToList<TResult>(entity);
            }

            return result;
        }

        public BaseCommandResult<TResult> Query<TResult, TCommand>(string commandName, TCommand command)
            where TResult : class
            where TCommand : class, ICommand
        {
            var cmd = CommandManager.GetCommand(commandName);
            var result = cmd.ExecuteToList<TResult>(command);
            return MapperHelper.Map<List<TResult>, BaseCommandResult<TResult>>(result);
        }

        public BaseCommandResult<TResult> QueryDynamic<TQuery, TResult, TCommand>(string commandName, TCommand command)
            where TQuery : BaseQueryEntity
            where TResult : class
            where TCommand : class, ICommand
        {
            var cmd = CommandManager.GetCommand(commandName);
            var entity = MapperHelper.Map<TCommand, TQuery>(command);
            cmd.AppendCondition(entity);
            var result = cmd.ExecuteToList<TResult>(command);
            return MapperHelper.Map<List<TResult>, BaseCommandResult<TResult>>(result);
        }

        public T GetByID<T>(string commandName, object param)
            where T : class
        {
            var cmd = CommandManager.GetCommand(commandName);
            return cmd.ExecuteToEntity<T>(param);
        }
    }
}