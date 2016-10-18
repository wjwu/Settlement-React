using SettlementApi.CommandBus;

namespace SettlementApi.Write.BusCommand.GroupModule
{
    public class CreateGroupCommand : ICommand
    {
        public string Name { get; set; }
        public string ParentID { get; set; }
    }
}