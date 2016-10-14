using Microsoft.Practices.Unity;
using SettlementApi.Common;

namespace SettlementApi.Context
{
    public abstract class Context
    {
        protected Context()
        {
            ServiceContext = AppUnity.Container.Resolve<IServiceContext>();
        }

        protected IServiceContext ServiceContext { get; set; }
    }
}