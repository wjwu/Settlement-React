using SettlementApi.EventBus;
using SettlementApi.Write.BusinessLogic.Event;
using SettlementApi.Write.Model;
using System;

namespace SettlementApi.Write.BusinessLogic
{
    public class CostBusinessLogic : BusinessLogicBase<Cost>, IEventSubscribeObject
    {
        public override Cost GetEntity(Guid id)
        {
            throw new NotImplementedException();
        }

        public void SubscribeEvents()
        {
            this.Subscribe<CreateSheetEvent>(e =>
            {
                var evt = e as CreateSheetEvent;
                if (evt.Costs!=null)
                {
                    evt.Costs.ForEach(cost =>
                    {
                        cost.SheetID = evt.SheetID;
                        cost.Total = cost.UnitPrice * cost.Amount;
                        cost.LastModifyUser = ServiceContext.OperatorID;
                        Create("Cost.Create", cost);
                    });
                }
            });

            this.Subscribe<UpdateSheetEvent>(e=> {
                var evt = e as UpdateSheetEvent;
                if (evt.Costs != null)
                {
                    Update("Cost.Delete",new {
                        SheetID=evt.SheetID
                    });
                    evt.Costs.ForEach(cost =>
                    {
                        cost.SheetID = evt.SheetID;
                        cost.Total = cost.UnitPrice * cost.Amount;
                        cost.LastModifyUser = ServiceContext.OperatorID;
                        Create("Cost.Create", cost);
                    });
                }
            });
        }
    }
}
