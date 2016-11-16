using System;
using SettlementApi.EventBus;
using SettlementApi.Write.BusinessLogic.Event;
using SettlementApi.Write.Model;

namespace SettlementApi.Write.BusinessLogic
{
    public class ReceivedBusinessLogic : BusinessLogicBase<Received>, IEventSubscribeObject
    {
        public void SubscribeEvents()
        {
            this.Subscribe<CreateSheetEvent>(e =>
            {
                var evt = e as CreateSheetEvent;
                evt?.Receiveds?.ForEach(received =>
                {
                    received.SheetID = evt.SheetID;
                    received.LastModifyUser = ServiceContext.OperatorID;
                    Create("Received.Create", received);
                });
            });

            this.Subscribe<UpdateSheetEvent>(e =>
            {
                var evt = e as UpdateSheetEvent;
                if (evt != null && evt.Costs != null)
                {
                    Update("Received.Delete", new
                    {
                        evt.SheetID
                    });
                    evt.Receiveds.ForEach(received =>
                    {
                        received.SheetID = evt.SheetID;
                        received.LastModifyUser = ServiceContext.OperatorID;
                        Create("Received.Create", received);
                    });
                }
            });
        }

        public override Received GetEntity(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}