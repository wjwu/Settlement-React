using Microsoft.Practices.Unity;
using SettlementApi.CommandBus;
using SettlementApi.Common;
using SettlementApi.EventBus;

namespace SettlementApi.Write.BusinessLogic
{
    public class Bootstrap
    {
        public static void Start()
        {
            var container = AppUnity.Container;
            container.RegisterType<ICommandBus, UserBusinessLogic>("UserBusinessLogic");
            container.RegisterType<ICommandBus, GroupBusinessLogic>("GroupBusinessLogic");
            container.RegisterType<IEventSubscribeObject, UserBusinessLogic>("UserBusinessLogic");
            container.RegisterType<ICommandBus, DictionaryBusinessLogic>("DictionaryBusinessLogic");
            container.RegisterType<ICommandBus, SheetBusinessLogic>("SheetBusinessLogic");
            container.RegisterType<IEventSubscribeObject, CostBusinessLogic>("CostBusinessLogic");
            container.RegisterType<IEventSubscribeObject, ReceivedBusinessLogic>("ReceivedBusinessLogic");
        }
    }
}