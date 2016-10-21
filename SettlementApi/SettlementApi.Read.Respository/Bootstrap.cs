﻿using Microsoft.Practices.Unity;
using SettlementApi.CommandBus;
using SettlementApi.Common;

namespace SettlementApi.Read.Respository
{
    public class Bootstrap
    {
        public static void Start()
        {
            UnityContainer container = AppUnity.Container;
            container.RegisterType<ICommandBus, QueryGroup>("QueryGroup");
            container.RegisterType<ICommandBus, QueryUser>("QueryUser");
        }
    }
}