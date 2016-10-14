using Microsoft.Practices.Unity;

namespace SettlementApi.Common
{
    public class AppUnity
    {
        private static UnityContainer _container;
        private static bool _init;

        public static UnityContainer Container
        {
            get
            {
                if (!_init)
                {
                    _container = new UnityContainer();
                    _init = true;
                }
                return _container;
            }
        }
    }
}