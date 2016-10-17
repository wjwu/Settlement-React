using System;
using System.Collections.Generic;
using System.Linq;

namespace SettlementApi.EventBus
{
    internal class EventService
    {
        private static readonly Dictionary<Type, Dictionary<Type, Action<IEvent>>> EventDic =
            new Dictionary<Type, Dictionary<Type, Action<IEvent>>>();

        internal static void UnSubscribe<TEvent>(Type subscriberType)
            where TEvent : IEvent
        {
            Type eventType = typeof (TEvent);
            foreach (var item in EventDic)
            {
                if (item.Key == eventType)
                {
                    Dictionary<Type, Action<IEvent>> subscribers = item.Value;
                    bool exist = subscribers.Keys.Any(p => p == subscriberType);
                    if (exist)
                    {
                        subscribers.Remove(subscriberType);
                    }
                }
            }
        }

        internal static void Subscribe<TEvent>(Type subscriberType, Action<IEvent> action)
            where TEvent : IEvent
        {
            Type eventType = typeof (TEvent);
            if (EventDic.Keys.Contains(eventType))
            {
                if (!EventDic[eventType].ContainsKey(subscriberType))
                {
                    EventDic[eventType].Add(subscriberType, action);
                }
            }
            else
            {
                var actionList = new Dictionary<Type, Action<IEvent>> { { subscriberType, action } };
                EventDic.Add(eventType, actionList);
            }
        }

        internal static void Publish<TEvent>(TEvent e) where TEvent : IEvent
        {
            Type eventType = typeof (TEvent);
            foreach (var item in EventDic)
            {
                if (item.Key == eventType)
                {
                    Dictionary<Type, Action<IEvent>> subscribers = item.Value;
                    foreach (Action<IEvent> action in subscribers.Values)
                    {
                        action(e);
                    }
                }
            }
        }
    }
}