using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace SettlementApi.DataAccess
{
    public class CommandManager
    {
        public static readonly Dictionary<string, Command> Commands = new Dictionary<string, Command>();
        public static readonly Dictionary<string, string> Connections = new Dictionary<string, string>();

        public static Command GetCommand(string commandName)
        {
            if (string.IsNullOrEmpty(commandName))
            {
                throw new ArgumentNullException(nameof(commandName));
            }
            var cmd = new Command
            {
                CommandText = Commands[commandName].CommandText,
                Name = Commands[commandName].Name,
                Type = Commands[commandName].Type
            };
            var con = new SqlConnection(Connections[Commands[commandName].ConnectionName]);
            var sqlCmd = new SqlCommand
            {
                Connection = con,
                CommandType = cmd.Type
            };
            cmd.Cmd = sqlCmd;
            return cmd;
        }

        public static Command GetCommand(string commandName,string connectionName)
        {
            if (string.IsNullOrEmpty(commandName))
            {
                throw new ArgumentNullException(nameof(commandName));
            }
            if (string.IsNullOrEmpty(connectionName))
            {
                throw new ArgumentNullException(nameof(connectionName));
            }
            var cmd = new Command
            {
                CommandText = Commands[commandName].CommandText,
                Name = Commands[commandName].Name,
                Type = Commands[commandName].Type
            };
            var con = new SqlConnection(Connections[connectionName]);
            var sqlCmd = new SqlCommand
            {
                Connection = con,
                CommandType = cmd.Type
            };
            cmd.Cmd = sqlCmd;
            return cmd;
        }
    }
}