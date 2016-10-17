using System;
using System.Collections.Generic;
using System.Reflection;
using Microsoft.Practices.Unity;
using SettlementApi.Common;

namespace SettlementApi.EventBus
{
    public static class ExtensionEventObject
    {
        private static readonly List<string> EventObjectAssembly = new List<string>();

        public static void UnSubscribe<TEvent>(this IEventSubscribeObject eventObject) where TEvent : IEvent
        {
            Type subscriberType = eventObject.GetType();
            EventService.UnSubscribe<TEvent>(subscriberType);
        }

        public static void Subscribe<TEvent>(this IEventSubscribeObject eventObject, Action<IEvent> action)
            where TEvent : IEvent
        {
            Type subscriberType = eventObject.GetType();
            EventService.Subscribe<TEvent>(subscriberType, action);
        }

        public static void Publish<TEvent>(this IEventPublishObject eventObject, TEvent e) where TEvent : IEvent
        {
            //GetSubscribeObject(eventObject.GetType().Assembly);
            GetSubscribeObject();
            EventService.Publish(e);
        }

        private static void GetSubscribeObject()
        {
            IEnumerable<IEventSubscribeObject> subscribes = AppUnity.Container.ResolveAll<IEventSubscribeObject>();
            if (subscribes != null)
            {
                foreach (IEventSubscribeObject subscribe in subscribes)
                {
                    subscribe.SubscribeEvents();
                }
            }
        }

        private static void GetSubscribeObject(Assembly assembly)
        {
            if (EventObjectAssembly.Contains(assembly.FullName))
            {
                return;
            }
            EventObjectAssembly.Add(assembly.FullName);
            var eventSubscribeFilter =
                new TypeFilter(
                    (type, filterCriteria) => type.Name.Equals(typeof (IEventSubscribeObject).Name));
            Type[] types = assembly.GetTypes();
            foreach (Type type in types)
            {
                Type[] interfaces = type.FindInterfaces(eventSubscribeFilter, null);
                if (interfaces.Length > 0)
                {
                    var subscribeObject = Activator.CreateInstance(type) as IEventSubscribeObject;
                    subscribeObject?.SubscribeEvents();
                }
            }
        }
    }
}