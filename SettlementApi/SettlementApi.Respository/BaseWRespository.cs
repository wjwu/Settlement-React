using System.Collections.Generic;
using SettlementApi.DataAccess;

namespace SettlementApi.Respository
{
    public class BaseWRespository
    {
        public void ExecuteNonQuery(string commandName,object param)
        {
            Command cmd = CommandManager.GetCommand(commandName);
            cmd.ExecuteNonQuery(param);
        }
    }

    public class BaseWRespository<TEntity> where TEntity : class, new()
    {
        public void ExecuteNonQuery(string commandName, object param)
        {
            Command cmd = CommandManager.GetCommand(commandName);
            cmd.ExecuteNonQuery(param);
        }

        public List<TEntity> GetList(string commandName,object param=null)
        {
            Command cmd = CommandManager.GetCommand(commandName);
            return cmd.ExecuteToList<TEntity>(param);
        }

        public TEntity GetEntity(string commandName,object param)
        {
            Command cmd = CommandManager.GetCommand(commandName);
            return cmd.ExecuteToEntity<TEntity>(param);
        }
    }
}