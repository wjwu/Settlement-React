using System;
using Microsoft.Practices.Unity;
using SettlementApi.Common;

namespace SettlementApi.CommandBus
{
    public static class CommandService
    {
        public static void Send(ICommand cmd, string busName)
        {
            //todo暂时处理必须传对象名称
            var bus = AppUnity.Container.Resolve<ICommandBus>(busName);
            if (cmd == null)
            {
                throw new ArgumentNullException(nameof(cmd));
            }
            bus.Receive(cmd);
        }

        public static ICommandResult SendEx(ICommand cmd, string queryName)
        {
            //todo暂时处理必须传对象名称
            var bus = AppUnity.Container.Resolve<ICommandBus>(queryName);
            if (cmd == null)
            {
                throw new ArgumentNullException(nameof(cmd));
            }
            ICommandResult ret = bus.ReceiveEx(cmd);
            return ret;
        }
    }
}