using System;
using System.Collections.Generic;
using System.Data;
using System.Xml.Linq;

namespace SettlementApi.DataAccess
{
    internal class ConfigAnalyzer
    {
        private const string ElementCommands = "commands";
        private const string ElementCommand = "command";
        private const string AttrName = "name";
        private const string AttrType = "type";
        private const string AttrConnection = "connection";
        private const string AttrProcedure = "procedure";

        private const string ElementConnections = "connections";
        private const string ElementConnection = "connection";

        public void AnalyzeCommand(XDocument doc)
        {
            XElement eleCmds = doc?.Element(ElementCommands);
            if (eleCmds != null)
            {
                IEnumerable<XElement> eleCmd = eleCmds.Elements(ElementCommand);
                foreach (XElement cmd in eleCmd)
                {
                    string name = cmd.Attribute(AttrName).Value;
                    string connection = cmd.Attribute(AttrConnection).Value;
                    string strType = cmd.Attribute(AttrType).Value;
                    var type = Common.StringToEnum<CommandType>(typeof (CommandType), strType);
                    string text = string.Empty;
                    if (type == CommandType.Text)
                    {
                        text = cmd.Value.Replace("\r", "").Replace("\t", "").Replace("\n", "").Trim();
                    }
                    else if (type == CommandType.StoredProcedure)
                    {
                        text = cmd.Attribute(AttrProcedure).Value;
                    }
                    else
                    {
                        throw new Exception("Command type must be Text or StoredProcedure");
                    }
                    CommandManager.Commands.Add(name, new Command
                    {
                        Name = name,
                        ConnectionName = connection,
                        Type = type,
                        CommandText = text
                    });
                }
            }
        }

        public void AnalyzeConnection(XDocument doc)
        {
            XElement eleCons = doc?.Element(ElementConnections);
            if (eleCons != null)
            {
                IEnumerable<XElement> eleCon = eleCons.Elements(ElementConnection);
                foreach (XElement con in eleCon)
                {
                    string name = con.Attribute(AttrName).Value;
                    string connectionStr = con.Value.Replace("\r", "").Replace("\t", "").Replace("\n", "").Trim();
                    CommandManager.Connections.Add(name, connectionStr);
                }
            }
        }
    }
}