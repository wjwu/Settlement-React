using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using SettlementApi.DataAccess.DefaultPageSetting;
using SettlementApi.DataAccess.QueryAttribute;

namespace SettlementApi.DataAccess
{
    public static class Common
    {
        internal static readonly Regex RegexGuid =
            new Regex(
                @"^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$");

        private static string KeywordFilter(string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                return value;
            }
            //value = value.Replace("'", "");
            value = value.Replace("--", "");
            return value;
        }

        internal static string GetSql(dynamic param, string commandText)
        {
            var sql = new StringBuilder();
            if (param == null)
            {
                commandText = commandText.Replace("'", "''");
                sql.AppendLine("DECLARE @Sql NVARCHAR(4000)");
                sql.AppendLine("SET @Sql='" + commandText + "'");
                sql.AppendLine("EXEC SP_EXECUTESQL @Sql ");
            }
            else
            {
                PropertyInfo[] properties = param.GetType().GetProperties();
                commandText = commandText.Replace("'", "''");
                sql.AppendLine("DECLARE @Sql NVARCHAR(4000)");
                sql.AppendLine("SET @Sql='" + commandText + "'");
                var regex = new Regex(@"@\w+");
                MatchCollection matchs = regex.Matches(commandText);
                var distinct = new List<Match>();
                foreach (Match match in matchs)
                {
                    bool exists = distinct.Exists(p => p.Value.ToString().Equals(match.Value.ToString()));
                    if (!exists)
                    {
                        distinct.Add(match);
                    }
                }
                foreach (PropertyInfo property in properties)
                {
                    var ignoreAttribute = property.GetCustomAttribute<ExecuteIgnoreAttribute>();
                    if (ignoreAttribute != null)
                    {
                        continue;
                    }
                    Type type = property.PropertyType.IsGenericType
                        ? property.PropertyType.GetGenericTypeDefinition()
                        : property.PropertyType;
                    bool exists = distinct.Any(p => p.Value.Substring(1).ToLower().Equals(property.Name.ToLower()));
                    if (exists)
                    {
                        object value = property.GetValue(param, null);
                        string column = property.Name;
                        if (type == typeof (String))
                        {
                            if (value == null)
                            {
                                sql.AppendLine("DECLARE @" + column + " NVARCHAR(1)");
                                sql.AppendLine("SET @" + column + "=NULL");
                            }
                            else
                            {
                                string strValue = KeywordFilter(value.ToString());
                                if (strValue.Length > 4000)
                                {
                                    sql.AppendLine("DECLARE @" + column + " NVARCHAR(MAX)");
                                }
                                else
                                {
                                    sql.AppendLine("DECLARE @" + column + " NVARCHAR(4000)");
                                }
                                sql.AppendLine("SET @" + column + "='" + strValue + "'");
                            }
                        }
                        else if (type == typeof (Guid))
                        {
                            sql.AppendLine("DECLARE @" + column + " UNIQUEIDENTIFIER");
                            if (value == null)
                            {
                                sql.AppendLine("SET @" + column + "=NULL");
                            }
                            else
                            {
                                sql.AppendLine("SET @" + column + "='" + value + "'");
                            }
                        }
                        else if (type == typeof (DateTime))
                        {
                            sql.AppendLine("DECLARE @" + column + " DATETIME");
                            if (value == null)
                            {
                                sql.AppendLine("SET @" + column + "=NULL");
                            }
                            else
                            {
                                sql.AppendLine("SET @" + column + "='" +
                                               string.Format("{0:yyyy-MM-dd HH:mm:ss.fff}", value) +
                                               "'");
                            }
                        }
                        else if (type == typeof (Int32))
                        {
                            sql.AppendLine("DECLARE @" + column + " INT");
                            if (value == null)
                            {
                                sql.AppendLine("SET @" + column + "=NULL");
                            }
                            else
                            {
                                sql.AppendLine("SET @" + column + "=" + value);
                            }
                        }
                        else if (type == typeof (Boolean))
                        {
                            sql.AppendLine("DECLARE @" + column + " BIT");
                            if (value == null)
                            {
                                sql.AppendLine("SET @" + column + "=NULL");
                            }
                            else
                            {
                                string boolValue = Boolean.Parse(value.ToString()) ? "1" : "0";
                                sql.AppendLine("SET @" + column + "=" + boolValue);
                            }
                        }
                        else if (type == typeof (Decimal))
                        {
                            sql.AppendLine("DECLARE @" + column + " DECIMAL(18,4)");
                            if (value == null)
                            {
                                sql.AppendLine("SET @" + column + "=NULL");
                            }
                            else
                            {
                                sql.AppendLine("SET @" + column + "=" + value);
                            }
                        }
                        else if (type == typeof (long))
                        {
                            sql.AppendLine("DECLARE @" + column + " BIGINT");
                            if (value == null)
                            {
                                sql.AppendLine("SET @" + column + "=NULL");
                            }
                            else
                            {
                                sql.AppendLine("SET @" + column + "=" + value);
                            }
                        }
                        else if (type == typeof (Nullable<>))
                        {
                            Type nullType = Nullable.GetUnderlyingType(property.PropertyType);
                            if (nullType == typeof (Guid))
                            {
                                sql.AppendLine("DECLARE @" + column + " UNIQUEIDENTIFIER");
                                if (value == null)
                                {
                                    sql.AppendLine("SET @" + column + "=NULL");
                                }
                                else
                                {
                                    sql.AppendLine("SET @" + column + "='" + value + "'");
                                }
                            }
                            else if (nullType == typeof (Boolean))
                            {
                                sql.AppendLine("DECLARE @" + column + " BIT");
                                if (value == null)
                                {
                                    sql.AppendLine("SET @" + column + "=NULL");
                                }
                                else
                                {
                                    string boolValue = Boolean.Parse(value.ToString()) ? "1" : "0";
                                    sql.AppendLine("SET @" + column + "=" + boolValue);
                                }
                            }
                            else if (nullType == typeof (Int32))
                            {
                                sql.AppendLine("DECLARE @" + column + " INT");
                                if (value == null)
                                {
                                    sql.AppendLine("SET @" + column + "=NULL");
                                }
                                else
                                {
                                    sql.AppendLine("SET @" + column + "=" + value);
                                }
                            }
                            else if (nullType == typeof (DateTime))
                            {
                                sql.AppendLine("DECLARE @" + column + " DATETIME");
                                if (value == null)
                                {
                                    sql.AppendLine("SET @" + column + "=NULL");
                                }
                                else
                                {
                                    sql.AppendLine("SET @" + column + "='" +
                                                   string.Format("{0:yyyy-MM-dd HH:mm:ss.fff}", value) + "'");
                                }
                            }
                            else if (nullType == typeof (Decimal))
                            {
                                sql.AppendLine("DECLARE @" + column + " DECIMAL(18,4)");
                                if (value == null)
                                {
                                    sql.AppendLine("SET @" + column + "=NULL");
                                }
                                else
                                {
                                    sql.AppendLine("SET @" + column + "=" + value);
                                }
                            }
                            else if (nullType == typeof (long))
                            {
                                sql.AppendLine("DECLARE @" + column + " BIGINT");
                                if (value == null)
                                {
                                    sql.AppendLine("SET @" + column + "=NULL");
                                }
                                else
                                {
                                    sql.AppendLine("SET @" + column + "=" + value);
                                }
                            }
                        }
                    }
                }

                //exectue param
                sql.AppendLine("EXEC SP_EXECUTESQL @Sql ");
                if (matchs.Count > 0)
                {
                    sql.Append(",N'");
                }
                bool appendParam = false;
                foreach (PropertyInfo property in properties)
                {
                    var ignoreAttribute = property.GetCustomAttribute<ExecuteIgnoreAttribute>();
                    if (ignoreAttribute != null)
                    {
                        continue;
                    }
                    Type type = property.PropertyType.IsGenericType
                        ? property.PropertyType.GetGenericTypeDefinition()
                        : property.PropertyType;
                    bool exists = distinct.Any(p => p.Value.Substring(1).ToLower().Equals(property.Name.ToLower()));
                    if (exists)
                    {
                        appendParam = true;
                        object value = property.GetValue(param, null);
                        string column = property.Name;
                        if (type == typeof (string) || type == typeof (String))
                        {
                            if (value == null)
                            {
                                sql.Append(" @" + column + " NVARCHAR(1),");
                            }
                            else
                            {
                                string strValue = KeywordFilter(value.ToString());
                                if (strValue.Length > 4000)
                                {
                                    sql.Append(" @" + column + " NVARCHAR(MAX),");
                                }
                                else
                                {
                                    sql.Append(" @" + column + " NVARCHAR(4000),");
                                }
                            }
                        }
                        else if (type == typeof (Guid))
                        {
                            sql.Append(" @" + column + " UNIQUEIDENTIFIER,");
                        }
                        else if (type == typeof (DateTime))
                        {
                            sql.Append(" @" + column + " DATETIME,");
                        }
                        else if (type == typeof (Int32))
                        {
                            sql.Append(" @" + column + " INT,");
                        }
                        else if (type == typeof (Boolean))
                        {
                            sql.Append(" @" + column + " BIT,");
                        }
                        else if (type == typeof (Decimal))
                        {
                            sql.Append(" @" + column + " DECIMAL(18,4),");
                        }
                        else if (type == typeof (long))
                        {
                            sql.Append(" @" + column + " BIGINT,");
                        }
                        else if (type == typeof (Nullable<>))
                        {
                            Type nullType = Nullable.GetUnderlyingType(property.PropertyType);
                            if (nullType == typeof (Guid))
                            {
                                sql.Append(" @" + column + " UNIQUEIDENTIFIER,");
                            }
                            else if (nullType == typeof (Boolean))
                            {
                                sql.Append(" @" + column + " BIT,");
                            }
                            else if (nullType == typeof (int))
                            {
                                sql.Append(" @" + column + " INT,");
                            }
                            else if (nullType == typeof (DateTime))
                            {
                                sql.Append(" @" + column + " DATETIME,");
                            }
                            else if (nullType == typeof (Decimal))
                            {
                                sql.Append(" @" + column + " DECIMAL(18,4),");
                            }
                            else if (nullType == typeof (long))
                            {
                                sql.Append(" @" + column + " BIGINT,");
                            }
                        }
                    }
                }
                if (matchs.Count > 0)
                {
                    if (appendParam)
                    {
                        sql.Remove(sql.Length - 1, 1);
                    }
                    sql.Append("',");
                }
                foreach (PropertyInfo property in properties)
                {
                    bool exists = distinct.Any(p => p.Value.Substring(1).ToLower().Equals(property.Name.ToLower()));
                    if (exists)
                    {
                        string column = property.Name;
                        sql.Append("@" + column + "=@" + column + ",");
                    }
                }
                if (matchs.Count > 0)
                {
                    sql.Remove(sql.Length - 1, 1);
                }
            }
            return sql.ToString();
        }

        internal static List<T> GetEntityList<T>(SqlDataReader reader) where T : class
        {
            if (reader == null || reader.IsClosed)
            {
                return null;
            }
            var list = new List<T>();
            var columns = new List<string>();
            for (int i = 0; i < reader.FieldCount; i++)
            {
                columns.Add(reader.GetName(i));
            }
            if (columns.Count == 0)
            {
                return null;
            }
            PropertyInfo[] propertyInfos = null;
            while (reader.Read())
            {
                var instance = Activator.CreateInstance<T>();
                if (propertyInfos == null)
                {
                    propertyInfos = instance.GetType().GetProperties();
                }

                foreach (PropertyInfo property in propertyInfos)
                {
                    Type type = property.PropertyType.IsGenericType
                        ? property.PropertyType.GetGenericTypeDefinition()
                        : property.PropertyType;
                    if (type == typeof (String) || type == typeof (Boolean) ||
                        type == typeof (Int32) || type == typeof (Guid) ||
                        type == typeof (DateTime) || type == typeof (Decimal))
                    {
                        string columnName = columns.FirstOrDefault(p => p.ToLower().Equals(property.Name.ToLower()));
                        if (!string.IsNullOrEmpty(columnName))
                        {
                            object value = reader[columnName];
                            if (value == DBNull.Value)
                            {
                                property.SetValue(instance, null, null);
                            }
                            else
                            {
                                property.SetValue(instance, reader[columnName], null);
                            }
                        }
                    }
                    else if (type == typeof (Nullable<>))
                    {
                        string columnName = columns.FirstOrDefault(p => p.ToLower().Equals(property.Name.ToLower()));
                        if (!string.IsNullOrEmpty(columnName))
                        {
                            object value = reader[columnName];
                            if (value == DBNull.Value)
                            {
                                property.SetValue(instance, null, null);
                            }
                            else
                            {
                                property.SetValue(instance, reader[columnName], null);
                            }
                        }
                    }
                }

                list.Add(instance);
            }
            reader.Close();
            return list;
        }

        internal static void SetParametersValue(dynamic param, List<SqlParameter> parameters)
        {
            if (param != null && parameters != null && parameters.Count > 0)
            {
                PropertyInfo[] properties = param.GetType().GetProperties();
                foreach (PropertyInfo property in properties)
                {
                    //Type type = property.PropertyType.IsGenericType
                    //    ? property.PropertyType.GetGenericTypeDefinition()
                    //    : property.PropertyType;
                    string parameterName = "@" + property.Name;
                    SqlParameter parameter = parameters.FirstOrDefault(p => p.ParameterName.Equals(parameterName));
                    if (parameter != null)
                    {
                        object value = property.GetValue(param, null);
                        parameter.Value = value;
                    }
                }
            }
        }

        private static string GetInSql<T>(T instance) where T : BaseQueryEntity
        {
            if (instance == null)
            {
                return string.Empty;
            }
            string condition = string.Empty;
            PropertyInfo[] properties = instance.GetType().GetProperties();
            foreach (PropertyInfo property in properties)
            {
                var inFieldAttribute = property.GetCustomAttribute<InFieldAttribute>();
                Type type = property.PropertyType.IsGenericType
                    ? property.PropertyType.GetGenericTypeDefinition()
                    : property.PropertyType;
                if (inFieldAttribute != null)
                {
                    var ignoreAttribute = property.GetCustomAttribute<ConditionIgnoreAttribute>();
                    if (ignoreAttribute != null)
                    {
                        continue;
                    }

                    object value = property.GetValue(instance, null);
                    if (value == null)
                    {
                        continue;
                    }

                    string propertyName = "["+ property.Name + "]";
                    var aliasFieldAttribute = property.GetCustomAttribute<AliasFieldAttribute>();
                    if (aliasFieldAttribute != null)
                    {
                        propertyName = "["+aliasFieldAttribute.SqlFieldName+"]";
                    }

                    string aliases = string.Empty;
                    var aliasesAttribute = property.GetCustomAttribute<TableQueryAliasAttribute>();
                    if (aliasesAttribute != null)
                    {
                        aliases = aliasesAttribute.TableAliasesName + ".";
                    }

                    if (string.IsNullOrEmpty(condition))
                    {
                        condition += " AND (";
                    }
                    else
                    {
                        condition += " OR (";
                    }

                    string strTmp = string.Empty;
                    if (type == typeof (string[]))
                    {
                        var strValues = (string[]) value;
                        if (strValues.Length > 0)
                        {
                            strTmp += aliases + propertyName + " IN (";
                            foreach (string strValue in strValues)
                            {
                                strTmp += "'" + KeywordFilter(strValue) + "',";
                            }
                            strTmp = strTmp.Remove(strTmp.Length - 1, 1);
                            strTmp += ")";
                            condition += strTmp;
                        }
                    }
                    else if (type == typeof (List<>))
                    {
                        var listValues = (List<string>) value;
                        if (listValues.Count > 0)
                        {
                            strTmp += aliases + propertyName + " IN (";
                            foreach (string listValue in listValues)
                            {
                                strTmp += "'" + KeywordFilter(listValue) + "',";
                            }
                            strTmp = strTmp.Remove(strTmp.Length - 1, 1);
                            strTmp += ")";
                            condition += strTmp;
                        }
                    }
                }
            }
            if (!string.IsNullOrEmpty(condition))
            {
                condition += ")";
            }
            return condition;
        }

        private static string GetLikeSql<T>(T instance) where T : BaseQueryEntity
        {
            if (instance == null)
            {
                return string.Empty;
            }
            string condition = string.Empty;
            PropertyInfo[] properties = instance.GetType().GetProperties();
            foreach (PropertyInfo property in properties)
            {
                var likeFieldAttribute = property.GetCustomAttribute<LikeFieldAttribute>();
                Type type = property.PropertyType.IsGenericType
                    ? property.PropertyType.GetGenericTypeDefinition()
                    : property.PropertyType;
                if (likeFieldAttribute != null && type == typeof (String))
                {
                    var ignoreAttribute = property.GetCustomAttribute<ConditionIgnoreAttribute>();
                    if (ignoreAttribute != null)
                    {
                        continue;
                    }
                    string propertyName = property.Name;
                    var aliasFieldAttribute = property.GetCustomAttribute<AliasFieldAttribute>();
                    if (aliasFieldAttribute != null)
                    {
                        propertyName = aliasFieldAttribute.SqlFieldName;
                    }

                    object value = property.GetValue(instance, null);
                    if (value == null)
                    {
                        continue;
                    }
                    string aliases = string.Empty;
                    var aliasesAttribute = property.GetCustomAttribute<TableQueryAliasAttribute>();
                    if (aliasesAttribute != null)
                    {
                        aliases = aliasesAttribute.TableAliasesName + ".";
                    }
                    value = KeywordFilter(value.ToString());
                    if (string.IsNullOrEmpty(condition))
                    {
                        condition += " AND (" + aliases + propertyName + " LIKE '%" + value + "%'";
                    }
                    else
                    {
                        condition += " OR " + aliases + propertyName + " LIKE '%" + value + "%'";
                    }
                }
            }
            if (!string.IsNullOrEmpty(condition))
            {
                condition += ")";
            }
            return condition;
        }

        #region public

        public static string GetConditionSql<T>(T instance) where T : BaseQueryEntity
        {
            if (instance == null)
            {
                return string.Empty;
            }
            string condition = GetLikeSql(instance);
            condition += GetInSql(instance);
            PropertyInfo[] properties = instance.GetType().GetProperties();
            foreach (PropertyInfo property in properties)
            {
                var ignoreAttribute = property.GetCustomAttribute<ConditionIgnoreAttribute>();
                if (ignoreAttribute != null)
                {
                    continue;
                }

                object value = property.GetValue(instance, null);
                if ((property.PropertyType.IsClass || property.PropertyType.IsGenericType) && value == null)
                {
                    continue;
                }
                if (!property.PropertyType.IsClass)
                {
                    if (property.PropertyType == typeof (Guid) && Guid.Parse(value.ToString()) == Guid.Empty)
                    {
                        continue;
                    }
                }

                string aliases = string.Empty;
                var aliasesAttribute = property.GetCustomAttribute<TableQueryAliasAttribute>();
                if (aliasesAttribute != null)
                {
                    aliases = aliasesAttribute.TableAliasesName + ".";
                }

                var rangeFieldAttribute = property.GetCustomAttribute<RangeFieldAttribute>();
                var notFieldAttribute = property.GetCustomAttribute<NotFieldAttribute>();

                string propertyName = "[" + property.Name + "]";
                var aliasFieldAttribute = property.GetCustomAttribute<AliasFieldAttribute>();
                if (aliasFieldAttribute != null)
                {
                    propertyName = aliasFieldAttribute.SqlFieldName;
                }

                Type type = property.PropertyType.IsGenericType
                    ? property.PropertyType.GetGenericTypeDefinition()
                    : property.PropertyType;
                if (type == typeof (String))
                {
                    var likeFieldAttribute = property.GetCustomAttribute<LikeFieldAttribute>();
                    value = KeywordFilter(value.ToString());
                    if (likeFieldAttribute == null)
                    {
                        if (notFieldAttribute != null)
                        {
                            condition += " AND " + aliases + propertyName + "<>'" + value + "'";
                        }
                        else
                        {
                            condition += " AND " + aliases + propertyName + "='" + value + "'";
                        }
                    }
                }
                else if (type == typeof (Boolean))
                {
                    int bit = bool.Parse(value.ToString()) ? 1 : 0;
                    if (notFieldAttribute != null)
                    {
                        condition += " AND " + aliases + propertyName + "<>" + bit;
                    }
                    else
                    {
                        condition += " AND " + aliases + propertyName + "=" + bit;
                    }
                }
                else if (type == typeof (Int16))
                {
                    if (rangeFieldAttribute != null)
                    {
                        if (rangeFieldAttribute.Range == RangeEnum.GreaterThan)
                        {
                            condition += " AND " + aliases + rangeFieldAttribute.Field + ">=" +
                                         Int16.Parse(value.ToString());
                        }
                        else
                        {
                            condition += " AND " + aliases + rangeFieldAttribute.Field + "<=" +
                                         Int16.Parse(value.ToString());
                        }
                    }
                    else
                    {
                        if (notFieldAttribute != null)
                        {
                            condition += " AND " + aliases + propertyName + "<>" + Int16.Parse(value.ToString());
                        }
                        else
                        {
                            condition += " AND " + aliases + propertyName + "=" + Int16.Parse(value.ToString());
                        }
                    }
                }
                else if (type == typeof (Int32))
                {
                    if (rangeFieldAttribute != null)
                    {
                        if (rangeFieldAttribute.Range == RangeEnum.GreaterThan)
                        {
                            condition += " AND " + aliases + rangeFieldAttribute.Field + ">=" +
                                         Int32.Parse(value.ToString());
                        }
                        else
                        {
                            condition += " AND " + aliases + rangeFieldAttribute.Field + "<=" +
                                         Int32.Parse(value.ToString());
                        }
                    }
                    else
                    {
                        if (notFieldAttribute != null)
                        {
                            condition += " AND " + aliases + propertyName + "<>" + Int32.Parse(value.ToString());
                        }
                        else
                        {
                            condition += " AND " + aliases + propertyName + "=" + Int32.Parse(value.ToString());
                        }
                    }
                }
                else if (type == typeof (Int64))
                {
                    if (rangeFieldAttribute != null)
                    {
                        if (rangeFieldAttribute.Range == RangeEnum.GreaterThan)
                        {
                            condition += " AND " + aliases + rangeFieldAttribute.Field + ">=" +
                                         Int64.Parse(value.ToString());
                        }
                        else
                        {
                            condition += " AND " + aliases + rangeFieldAttribute.Field + "<=" +
                                         Int64.Parse(value.ToString());
                        }
                    }
                    else
                    {
                        if (notFieldAttribute != null)
                        {
                            condition += " AND " + aliases + propertyName + "<>" + Int64.Parse(value.ToString());
                        }
                        else
                        {
                            condition += " AND " + aliases + propertyName + "=" + Int64.Parse(value.ToString());
                        }
                    }
                }
                else if (type == typeof (Guid))
                {
                    if (notFieldAttribute != null)
                    {
                        condition += " AND " + aliases + propertyName + "<>'" + value + "'";
                    }
                    else
                    {
                        condition += " AND " + aliases + propertyName + "='" + value + "'";
                    }
                }
                else if (type == typeof (DateTime))
                {
                    if (rangeFieldAttribute != null)
                    {
                        if (rangeFieldAttribute.Range == RangeEnum.GreaterThan)
                        {
                            condition += " AND " + aliases + rangeFieldAttribute.Field + ">='" + value + "'";
                        }
                        else
                        {
                            DateTime endTime = DateTime.Parse(DateTime.Parse(value.ToString()).ToShortDateString());
                            endTime = endTime.AddDays(1).AddMilliseconds(-1);
                            condition += " AND " + aliases + rangeFieldAttribute.Field + "<='" + endTime + "'";
                        }
                    }
                    else
                    {
                        if (notFieldAttribute != null)
                        {
                            condition += " AND " + aliases + propertyName + "<>'" + value + "'";
                        }
                        else
                        {
                            condition += " AND " + aliases + propertyName + "='" + value + "'";
                        }
                    }
                }
                else if (type == typeof (Decimal))
                {
                    if (rangeFieldAttribute != null)
                    {
                        if (rangeFieldAttribute.Range == RangeEnum.GreaterThan)
                        {
                            condition += " AND " + aliases + rangeFieldAttribute.Field + ">=" +
                                         Decimal.Parse(value.ToString());
                        }
                        else
                        {
                            condition += " AND " + aliases + rangeFieldAttribute.Field + "<=" +
                                         Decimal.Parse(value.ToString());
                        }
                    }
                    else
                    {
                        if (notFieldAttribute != null)
                        {
                            condition += " AND " + aliases + propertyName + "<>" + Decimal.Parse(value.ToString());
                        }
                        else
                        {
                            condition += " AND " + aliases + propertyName + "=" + Decimal.Parse(value.ToString());
                        }
                    }
                }
                else if (type == typeof (Nullable<>))
                {
                    Type nullType = Nullable.GetUnderlyingType(property.PropertyType);
                    if (nullType == typeof (Guid))
                    {
                        if (notFieldAttribute != null)
                        {
                            condition += " AND " + aliases + propertyName + "<>'" + value + "'";
                        }
                        else
                        {
                            condition += " AND " + aliases + propertyName + "='" + value + "'";
                        }
                    }
                    else if (nullType == typeof (Boolean))
                    {
                        int bit = bool.Parse(value.ToString()) ? 1 : 0;
                        condition += " AND " + aliases + propertyName + "=" + bit;
                    }
                    else if (nullType == typeof (Int16))
                    {
                        if (rangeFieldAttribute != null)
                        {
                            if (rangeFieldAttribute.Range == RangeEnum.GreaterThan)
                            {
                                condition += " AND " + aliases + rangeFieldAttribute.Field + ">=" +
                                             Int16.Parse(value.ToString());
                            }
                            else
                            {
                                condition += " AND " + aliases + rangeFieldAttribute.Field + "<=" +
                                             Int16.Parse(value.ToString());
                            }
                        }
                        else
                        {
                            if (notFieldAttribute != null)
                            {
                                condition += " AND " + aliases + propertyName + "<>" + Int16.Parse(value.ToString());
                            }
                            else
                            {
                                condition += " AND " + aliases + propertyName + "=" + Int16.Parse(value.ToString());
                            }
                        }
                    }
                    else if (nullType == typeof (Int32))
                    {
                        if (rangeFieldAttribute != null)
                        {
                            if (rangeFieldAttribute.Range == RangeEnum.GreaterThan)
                            {
                                condition += " AND " + aliases + rangeFieldAttribute.Field + ">=" +
                                             Int32.Parse(value.ToString());
                            }
                            else
                            {
                                condition += " AND " + aliases + rangeFieldAttribute.Field + "<=" +
                                             Int32.Parse(value.ToString());
                            }
                        }
                        else
                        {
                            if (notFieldAttribute != null)
                            {
                                condition += " AND " + aliases + propertyName + "<>" + Int32.Parse(value.ToString());
                            }
                            else
                            {
                                condition += " AND " + aliases + propertyName + "=" + Int32.Parse(value.ToString());
                            }
                        }
                    }
                    else if (nullType == typeof (Int64))
                    {
                        if (rangeFieldAttribute != null)
                        {
                            if (rangeFieldAttribute.Range == RangeEnum.GreaterThan)
                            {
                                condition += " AND " + aliases + rangeFieldAttribute.Field + ">=" +
                                             Int64.Parse(value.ToString());
                            }
                            else
                            {
                                condition += " AND " + aliases + rangeFieldAttribute.Field + "<=" +
                                             Int64.Parse(value.ToString());
                            }
                        }
                        else
                        {
                            if (notFieldAttribute != null)
                            {
                                condition += " AND " + aliases + propertyName + "<>" + Int64.Parse(value.ToString());
                            }
                            else
                            {
                                condition += " AND " + aliases + propertyName + "=" + Int64.Parse(value.ToString());
                            }
                        }
                    }
                    else if (nullType == typeof (DateTime))
                    {
                        if (rangeFieldAttribute != null)
                        {
                            if (rangeFieldAttribute.Range == RangeEnum.GreaterThan)
                            {
                                condition += " AND " + aliases + rangeFieldAttribute.Field + ">='" + value + "'";
                            }
                            else
                            {
                                DateTime endTime = DateTime.Parse(DateTime.Parse(value.ToString()).ToShortDateString());
                                endTime = endTime.AddDays(1).AddMilliseconds(-1);
                                condition += " AND " + aliases + rangeFieldAttribute.Field + "<='" + endTime + "'";
                            }
                        }
                        else
                        {
                            if (notFieldAttribute != null)
                            {
                                condition += " AND " + aliases + propertyName + "<>'" + value + "'";
                            }
                            else
                            {
                                condition += " AND " + aliases + propertyName + "='" + value + "'";
                            }
                        }
                    }
                    else if (nullType == typeof (Decimal))
                    {
                        if (rangeFieldAttribute != null)
                        {
                            if (rangeFieldAttribute.Range == RangeEnum.GreaterThan)
                            {
                                condition += " AND " + aliases + rangeFieldAttribute.Field + ">=" +
                                             Decimal.Parse(value.ToString());
                            }
                            else
                            {
                                condition += " AND " + aliases + rangeFieldAttribute.Field + "<=" +
                                             Decimal.Parse(value.ToString());
                            }
                        }
                        else
                        {
                            if (notFieldAttribute != null)
                            {
                                condition += " AND " + aliases + propertyName + "<>" + Decimal.Parse(value.ToString());
                            }
                            else
                            {
                                condition += " AND " + aliases + propertyName + "=" + Decimal.Parse(value.ToString());
                            }
                        }
                    }
                }
            }
            return condition;
        }

        public static string GetPageSql(string commandText, string sortField,
            SortTypeEnum sortType = SortTypeEnum.ASC)
        {
            if (string.IsNullOrEmpty(commandText))
            {
                return string.Empty;
            }
            sortField = KeywordFilter(sortField);
            var sb = new StringBuilder();
            sb.AppendLine(
                "SELECT TOP(@PageSize) * FROM (SELECT TOP(@PageIndex*@PageSize) ROW_NUMBER() OVER (ORDER BY " +
                sortField + " " + sortType + ") AS RowNumber,* FROM (" + commandText +
                ") AS TMP) AS TMP  WHERE RowNumber>(@PageIndex-1)*@PageSize");
            return sb.ToString();
        }

        public static string GetCountSql(string commandText)
        {
            return "SELECT COUNT(1) FROM (" + commandText + ") AS TMP";
        }

        public static int ToInt(object value)
        {
            if (value == null || value == DBNull.Value)
            {
                return 0;
            }
            int result;
            int.TryParse(value.ToString(), out result);
            return result;
        }

        public static T StringToEnum<T>(Type type, string enumString, bool ignoreCase = true)
        {
            return (T) Enum.Parse(type, enumString, ignoreCase);
        }

        public static List<SqlParameter> GetProcParameters(string procName, SqlConnection sqlConnection)
        {
            if (string.IsNullOrWhiteSpace(procName))
            {
                throw new ArgumentNullException("procName");
            }
            if (sqlConnection == null)
            {
                throw new ArgumentNullException("sqlConnection");
            }
            string sql = "select * from information_schema.parameters where specific_name = '" + procName + "'";

            var adapter = new SqlDataAdapter(sql, sqlConnection);
            var dt = new DataTable();
            adapter.Fill(dt);

            if (dt.Rows.Count == 0)
            {
                return null;
            }
            var sqlParameters = new List<SqlParameter>();
            foreach (DataRow row in dt.Rows)
            {
                var sqlParameter = new SqlParameter();
                object length = row["CHARACTER_MAXIMUM_LENGTH"];
                if (length != null && length != DBNull.Value)
                {
                    sqlParameter.Size = int.Parse(length.ToString());
                }
                if (row["PARAMETER_MODE"].ToString().ToLower().Equals("in"))
                {
                    sqlParameter.Direction = ParameterDirection.Input;
                }
                else
                {
                    sqlParameter.Direction = ParameterDirection.Output;
                }
                sqlParameter.ParameterName = row["PARAMETER_NAME"].ToString();
                sqlParameter.SqlDbType = StringToEnum<SqlDbType>(typeof (SqlDbType),
                    row["DATA_TYPE"].ToString());
                sqlParameters.Add(sqlParameter);
            }
            return sqlParameters;
        }

        #endregion
    }
}