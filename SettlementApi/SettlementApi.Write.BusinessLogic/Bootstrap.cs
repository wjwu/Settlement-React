using Microsoft.Practices.Unity;
using SettlementApi.CommandBus;
using SettlementApi.Common;

namespace SettlementApi.Write.BusinessLogic
{
    public class Bootstrap
    {
        public static void Start()
        {
            var container = AppUnity.Container;
            container.RegisterType<ICommandBus, UserBusinessLogic>("UserBusinessLogic");
        }
    }
}