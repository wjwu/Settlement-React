using System;
using SettlementApi.EventBus;
using SettlementApi.Write.Model;

namespace SettlementApi.Write.BusinessLogic
{
    public class SheetLogBusinessLogic : BusinessLogicBase<SheetLog>, IEventSubscribeObject
    {
        public void SubscribeEvents()
        {
            throw new NotImplementedException();
        }

        public override SheetLog GetEntity(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}