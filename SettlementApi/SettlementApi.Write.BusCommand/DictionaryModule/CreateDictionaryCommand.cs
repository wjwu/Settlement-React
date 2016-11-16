using SettlementApi.CommandBus;

namespace SettlementApi.Write.BusCommand.DictionaryModule
{
    public class CreateDictionaryCommand : ICommand
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public int Rank { get; set; }
        public bool Enabled { get; set; }
    }
}