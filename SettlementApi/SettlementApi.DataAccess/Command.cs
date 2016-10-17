using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using SettlementApi.DataAccess.DefaultPageSetting;

namespace SettlementApi.DataAccess
{
    public class Command
    {
        private SqlTransaction _sqlTransaction;

        internal Command()
        {
        }

        public string Name { get; set; }
        public CommandType Type { get; set; }
        public string ConnectionName { get; internal set; }
        public string CommandText { get; internal set; }

        internal SqlCommand Cmd { private get; set; }

        public void BeginTransaction()
        {
            _sqlTransaction = Cmd.Connection.BeginTransaction();
        }

        public void Commit()
        {
            if (_sqlTransaction == null)
            {
                throw new InvalidOperationException("Transaction is not begin.");
            }
            _sqlTransaction.Commit();
        }

        public void Rollback()
        {
            if (_sqlTransaction == null)
            {
                throw new InvalidOperationException("Transaction is not begin.");
            }
            _sqlTransaction.Rollback();
        }

        public void Save(string savePointName)
        {
            if (_sqlTransaction == null)
            {
                throw new InvalidOperationException("Transaction is not begin.");
            }
            _sqlTransaction.Save(savePointName);
        }

        public int ExecuteNonQuery(dynamic param = null)
        {
            if (Cmd == null)
            {
                throw new Exception("Property Cmd is not init.");
            }
            using (Cmd.Connection)
            {
                using (Cmd)
                {
                    if (Cmd.CommandType == CommandType.Text)
                    {
                        Cmd.CommandText = Common.GetSql(param, CommandText);
                    }
                    else
                    {
                        Cmd.CommandText = CommandText;
                        List<SqlParameter> parameters = Common.GetProcParameters(CommandText, Cmd.Connection);
                        if (parameters != null && parameters.Count > 0)
                        {
                            Common.SetParametersValue(param, parameters);
                            Cmd.Parameters.Add(parameters);
                        }
                    }
                    Cmd.Connection.Open();
                    int result = Cmd.ExecuteNonQuery();
                    Cmd.Connection.Close();
                    return result;
                }
            }
        }

        public object ExecuteScalar(dynamic param = null)
        {
            if (Cmd == null)
            {
                throw new Exception("Property Cmd is not init.");
            }
            using (Cmd.Connection)
            {
                using (Cmd)
                {
                    if (Cmd.CommandType == CommandType.Text)
                    {
                        Cmd.CommandText = Common.GetSql(param, CommandText);
                    }
                    else
                    {
                        Cmd.CommandText = CommandText;
                        List<SqlParameter> parameters = Common.GetProcParameters(CommandText, Cmd.Connection);
                        if (parameters != null && parameters.Count > 0)
                        {
                            Common.SetParametersValue(param, parameters);
                            Cmd.Parameters.Add(parameters);
                        }
                    }
                    Cmd.Connection.Open();
                    object result = Cmd.ExecuteScalar();
                    Cmd.Connection.Close();
                    return result;
                }
            }
        }

        public T ExecuteToEntity<T>(dynamic param = null) where T : class
        {
            List<T> result = ExecuteToList<T>(param);
            if (result != null && result.Count > 0)
            {
                return result.First();
            }
            return null;
        }

        public List<T> ExecuteToList<T>(dynamic param = null) where T : class
        {
            if (Cmd == null)
            {
                throw new Exception("Property Cmd do not init.");
            }
            using (Cmd.Connection)
            {
                using (Cmd)
                {
                    if (Cmd.CommandType == CommandType.Text)
                    {
                        Cmd.CommandText = param == null ? CommandText : Common.GetSql(param , CommandText);
                    }
                    else
                    {
                        Cmd.CommandText = CommandText;
                        List<SqlParameter> parameters = Common.GetProcParameters(CommandText, Cmd.Connection);
                        if (parameters != null && parameters.Count > 0)
                        {
                            Common.SetParametersValue(param, parameters);
                            parameters.ForEach(p => Cmd.Parameters.Add(p));
                        }
                    }
                    Cmd.Connection.Open();
                    SqlDataReader reader = Cmd.ExecuteReader();
                    List<T> list = Common.GetEntityList<T>(reader);
                    Cmd.Connection.Close();
                    return list;
                }
            }
        }

        public int Count(dynamic param = null)
        {
            if (Cmd == null)
            {
                throw new Exception("Property Cmd do not init.");
            }
            AppendCondition(param);
            CommandText = Common.GetCountSql(CommandText);
            return Common.ToInt(ExecuteScalar(param));
        }


        public void AppendCondition(BaseQueryEntity queryEntity)
        {
            CommandText += Common.GetConditionSql(queryEntity);
        }

        public void CreatePageQuery(BaseQueryEntity queryEntity)
        {
            DefaultPageSetting(queryEntity);

            CommandText = Common.GetPageSql(CommandText, queryEntity.SortField,
                (SortTypeEnum) Enum.Parse(typeof (SortTypeEnum), queryEntity.SortType, true));
        }

        private void DefaultPageSetting(BaseQueryEntity queryEntity)
        {
            Type type = queryEntity.GetType();
            PropertyInfo[] propertities = type.GetProperties();
            foreach (PropertyInfo property in propertities)
            {
                object value = property.GetValue(queryEntity);
                if (property.Name.Equals("PageIndex"))
                {
                    var pageIndex = type.GetCustomAttribute<DefaultPageIndexAttribute>();
                    if (value == null && pageIndex != null)
                    {
                        property.SetValue(queryEntity, pageIndex.PageIndex);
                    }
                }
                else if (property.Name.Equals("PageSize"))
                {
                    var pageSize = type.GetCustomAttribute<DefaultPageSizeAttribute>();
                    if (value == null && pageSize != null)
                    {
                        property.SetValue(queryEntity, pageSize.PageSize);
                    }
                }
                else if (property.Name.Equals("SortField"))
                {
                    var sortField = type.GetCustomAttribute<DefaultSortFieldAttribute>();
                    if ((value == null || value.ToString() == string.Empty) && sortField != null)
                    {
                        property.SetValue(queryEntity, sortField.SortField);
                    }
                }
                else if (property.Name.Equals("SortType"))
                {
                    var sortType = type.GetCustomAttribute<DefaultSortTypeAttribute>();
                    if ((value == null || value.ToString() == string.Empty) && sortType != null)
                    {
                        property.SetValue(queryEntity, sortType.SortType.ToString());
                    }
                }
            }
        }
    }
}