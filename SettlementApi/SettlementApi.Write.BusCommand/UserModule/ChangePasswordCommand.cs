using SettlementApi.CommandBus;

namespace SettlementApi.Write.BusCommand.UserModule
{
    public class ChangePasswordCommand : ICommand
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}