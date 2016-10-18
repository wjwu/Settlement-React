using SettlementApi.CommandBus;

namespace SettlementApi.Write.BusCommand.UserModule
{
    public class LoginCommand : ICommand
    {
        public string LoginID { get; set; }

        public string Password { get; set; }
    }
}