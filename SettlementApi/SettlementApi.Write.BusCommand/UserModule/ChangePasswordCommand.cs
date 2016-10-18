using SettlementApi.CommandBus;

namespace SettlementApi.Write.BusCommand.UserModule
{
    public class ChangePasswordCommand : ICommand
    {
        public string NewPassword { get; set; }
    }
}