using System;
using System.Collections.Generic;
using SettlementApi.Respository;

namespace SettlementApi.Write.BusinessLogic
{
    public abstract class BusinessLogicBase: Context.Context
    {
        private readonly BaseWRespository _dbSession;

        protected BusinessLogicBase()
        {
            _dbSession = new BaseWRespository();
        }

        protected virtual void Update(string commandName, object entity)
        {
            _dbSession.ExecuteNonQuery(commandName, entity);
        }
    }

    public abstract class BusinessLogicBase<TEntity> : Context.Context where TEntity : class, new()
    {
        private readonly BaseWRespository<TEntity> _dbSession;

        protected BusinessLogicBase()
        {
            _dbSession = new BaseWRespository<TEntity>();
        }

        protected virtual void Create(string commandName, TEntity entity)
        {
            _dbSession.ExecuteNonQuery(commandName, entity);
        }

        protected virtual void Delete(string commandName, object entity)
        {
            _dbSession.ExecuteNonQuery(commandName, entity);
        }

        protected virtual void Update(string commandName, object entity)
        {
            _dbSession.ExecuteNonQuery(commandName, entity);
        }

        protected virtual TEntity GetEntity(string commandName, object entity)
        {
            return _dbSession.GetEntity(commandName, entity);
        }

        protected virtual List<TEntity> GetList(string commandName, object entity = null)
        {
            return _dbSession.GetList(commandName, entity);
        }

        public abstract TEntity GetEntity(Guid id);
    }
}