using System;
using SettlementApi.EventBus;
using SettlementApi.Write.BusinessLogic.Event;
using SettlementApi.Write.BusinessLogic.Resource;
using SettlementApi.Write.Model;
using SettlementApi.Write.Model.Enums;

namespace SettlementApi.Write.BusinessLogic
{
    public class SheetLogBusinessLogic : BusinessLogicBase<SheetLog>, IEventSubscribeObject
    {
        public void SubscribeEvents()
        {
            this.Subscribe<CreateSheetEvent>(e =>
            {
                var evt = e as CreateSheetEvent;
                var user = new UserBusinessLogic().GetEntity(ServiceContext.OperatorID);
                Create("SheetLog.Create", new SheetLog
                {
                    OperatorID = ServiceContext.OperatorID,
                    SheetID = evt.SheetID,
                    Text = string.Format(SheetRes.CreateSheet, user.Name)
                });
            });
            this.Subscribe<UpdateSheetEvent>(e =>
            {
                var evt = e as UpdateSheetEvent;
                var user = new UserBusinessLogic().GetEntity(ServiceContext.OperatorID);
                string text;
                if (evt.AuditStatus==AuditStatus.Pass)
                {
                    text = string.Format(SheetRes.AuditSheetPass, user.Name);
                }
                else if (evt.AuditStatus == AuditStatus.Fail)
                {
                    text = string.Format(SheetRes.AuditSheetFail, user.Name);
                }
                else
                {
                    text = string.Format(SheetRes.UpdateSheet, user.Name);
                }
                Create("SheetLog.Create", new SheetLog
                {
                    OperatorID = ServiceContext.OperatorID,
                    SheetID = evt.SheetID,
                    Text = text
                });
            });
            this.Subscribe<DeleteSheetEvent>(e =>
            {
                var evt = e as DeleteSheetEvent;
                Delete("SheetLog.Delete", new {evt.SheetID});
            });
        }

        public override SheetLog GetEntity(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}