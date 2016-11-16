using System;
using SettlementApi.EventBus;
using SettlementApi.Write.BusinessLogic.Event;
using SettlementApi.Write.Model;

namespace SettlementApi.Write.BusinessLogic
{
    public class CostBusinessLogic : BusinessLogicBase<Cost>, IEventSubscribeObject
    {
        public void SubscribeEvents()
        {
            this.Subscribe<CreateSheetEvent>(e =>
            {
                var evt = e as CreateSheetEvent;
                evt?.Costs?.ForEach(cost =>
                {
                    cost.SheetID = evt.SheetID;
                    cost.Total = cost.Unit*cost.Amount;
                    cost.LastModifyUser = ServiceContext.OperatorID;
                    Create("Cost.Create", cost);
                });
            });

            this.Subscribe<UpdateSheetEvent>(e =>
            {
                var evt = e as UpdateSheetEvent;
                if (evt?.Costs != null)
                {
                    Update("Cost.Delete", new
                    {
                        evt.SheetID
                    });
                    evt.Costs.ForEach(cost =>
                    {
                        cost.SheetID = evt.SheetID;
                        cost.Total = cost.Unit*cost.Amount;
                        cost.LastModifyUser = ServiceContext.OperatorID;
                        Create("Cost.Create", cost);
                    });
                }
            });
        }

        public override Cost GetEntity(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}