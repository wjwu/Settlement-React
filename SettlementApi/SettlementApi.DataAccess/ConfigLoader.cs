using System;
using System.IO;
using System.Xml.Linq;

namespace SettlementApi.DataAccess
{
    public class ConfigLoader
    {
        private const string ConfigurationDirectory = "\\Configuration";
        private const string ConnectionFile = "Connection.xml";
        private static ConfigAnalyzer _analyzer;

        public static void Load()
        {
            string configPath = AppDomain.CurrentDomain.BaseDirectory + ConfigurationDirectory;

            if (Directory.Exists(configPath))
            {
                _analyzer = new ConfigAnalyzer();
                LoadXmlFiles(configPath);
            }
            else
            {
                throw new IOException("Configuration directory is not exists!");
            }
        }

        private static void LoadXmlFiles(string path)
        {
            if (Directory.Exists(path))
            {
                string[] configs = Directory.GetFiles(path, "*.xml");
                foreach (string config in configs)
                {
                    if (File.Exists(config))
                    {
                        if (config.EndsWith(ConnectionFile))
                        {
                            _analyzer.AnalyzeConnection(XDocument.Load(config));
                        }
                        else
                        {
                            _analyzer.AnalyzeCommand(XDocument.Load(config));
                        }
                    }
                }
            }
            string[] subDirs = Directory.GetDirectories(path);
            foreach (string subDir in subDirs)
            {
                LoadXmlFiles(subDir);
            }
        }
    }
}