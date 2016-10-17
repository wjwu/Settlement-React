using SettlementApi.CommandBus;

namespace SettlementApi.Write.BusCommand
{
    public class ChangePasswordCommand : ICommand
    {
        public string NewPassword { get; set; }
    }
}