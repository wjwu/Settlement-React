using Microsoft.Practices.Unity;
using SettlementApi.Api.Pools;
using SettlementApi.Common;
using SettlementApi.Context;

namespace SettlementApi.Api
{
    public class Bootstrap
    {
        public static void Start()
        {
            UnityContainer container = AppUnity.Container;
            container.RegisterType<IServiceContext, ServiceContext>();

            //controller注入
            //GlobalConfiguration.Configuration.Services.Replace(typeof(IHttpControllerActivator),
            //    new UnityHttpControllerActivator(container));

            //todo 删除
//            Write.BusinessLogic.Bootstrap.Start();
//            Read.Respository.Bootstrap.Start();

            ApiContextPool.Start();
            CaptchaPool.Start();
            //SMSPool.Start();
        }
    }
}