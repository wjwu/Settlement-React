using SettlementApi.EventBus;
using SettlementApi.Write.BusinessLogic.Event;
using SettlementApi.Write.Model;
using System;

namespace SettlementApi.Write.BusinessLogic
{
    public class ReceivedBusinessLogic : BusinessLogicBase<Received>, IEventSubscribeObject
    {
        public override Received GetEntity(Guid id)
        {
            throw new NotImplementedException();
        }

        public void SubscribeEvents()
        {
            this.Subscribe<CreateSheetEvent>(e =>
            {
                var evt = e as CreateSheetEvent;
                if (evt.Receiveds != null)
                {
                    evt.Receiveds.ForEach(received =>
                    {
                        received.SheetID = evt.SheetID;
                        received.LastModifyUser = ServiceContext.OperatorID;
                        Create("Received.Create", received);
                    });
                }
            });

            this.Subscribe<UpdateSheetEvent>(e => {
                var evt = e as UpdateSheetEvent;
                if (evt.Costs != null)
                {
                    Update("Received.Delete", new
                    {
                        SheetID = evt.SheetID
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
    }
}
