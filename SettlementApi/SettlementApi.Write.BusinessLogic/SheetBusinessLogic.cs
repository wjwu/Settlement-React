using System;
using SettlementApi.CommandBus;
using SettlementApi.Common.Mapper;
using SettlementApi.Write.BusCommand.SheetModule;
using SettlementApi.Write.Model;
using SettlementApi.Write.Model.Enums;
using SettlementApi.Write.BusinessLogic.Resource;
using SettlementApi.EventBus;
using SettlementApi.Write.BusinessLogic.Event;
using System.Collections.Generic;

namespace SettlementApi.Write.BusinessLogic
{
    public class SheetBusinessLogic: BusinessLogicBase<Sheet>, IEventPublishObject,
        ICommandBus<CreateSheetCommand>,
        ICommandBus<UpdateSheetCommand>,
         ICommandBus<DeleteSheetCommand>
    {
        public override Sheet GetEntity(Guid id)
        {
            return GetEntity("Sheet.GetByID", new { ID = id });
        }

        public void Execute(CreateSheetCommand command)
        {
            var sheet = MapperHelper.Map<CreateSheetCommand, Sheet>(command);
            var costs = MapperHelper.Map<List<CostEntity>, List<Cost>>(command.Costs);
            var receiveds = MapperHelper.Map<List<ReceivedEntity>, List<Received>>(command.Receiveds);
            sheet.ID=Guid.NewGuid();
            sheet.ProjectManager= ServiceContext.OperatorID;
            if (command.Submit)
            {
                sheet.AuditStatus = Enum.GetName(typeof(AuditStatus), AuditStatus.Auditing);
            }
            else
            {
                sheet.AuditStatus = Enum.GetName(typeof(AuditStatus), AuditStatus.UnSubmit);
            }
            sheet.PayStatus= Enum.GetName(typeof(PayStatus), PayStatus.Unpaid);
            sheet.Days = sheet.TimeTo.Subtract(sheet.TimeFrom).Days;
            sheet.UnitPrice = Math.Round(sheet.TotalPrice/sheet.People);
            if (costs!=null)
            {
                costs.ForEach(cost=> {
                    sheet.CostPrice += cost.Amount * cost.UnitPrice;
                });
            }
            if (receiveds!=null)
            {
                receiveds.ForEach(received=>
                {
                    sheet.ReceivedMoney +=received.Money;
                });
            }
            sheet.RemainingMoney = sheet.TotalPrice - sheet.ReceivedMoney;
            sheet.LastModifyUser = ServiceContext.OperatorID;
            Create("Sheet.Create",sheet);
           
            this.Publish(new CreateSheetEvent() {
                   SheetID=sheet.ID,
                   Costs= costs,
                   Receiveds= receiveds
            });
        }

        public void Execute(UpdateSheetCommand command)
        {
            var oldSheet = GetEntity(command.ID);
            if (oldSheet == null)
            {
                throw new BussinessException(CommonRes.InvalidOperation);
            }
            var newSheet = MapperHelper.Map<UpdateSheetCommand, Sheet>(command);
            var costs = MapperHelper.Map<List<CostEntity>, List<Cost>>(command.Costs);
            var receiveds = MapperHelper.Map<List<ReceivedEntity>, List<Received>>(command.Receiveds);

            newSheet.Days = newSheet.TimeTo.Subtract(newSheet.TimeFrom).Days;
            newSheet.UnitPrice = Math.Round(newSheet.TotalPrice / newSheet.People);

            if ((oldSheet.AuditStatus == Enum.GetName(typeof(AuditStatus), AuditStatus.UnSubmit)
                || oldSheet.AuditStatus == Enum.GetName(typeof(AuditStatus), AuditStatus.Fail)) && command.Submit)
            {
                newSheet.AuditStatus = Enum.GetName(typeof(AuditStatus), AuditStatus.Auditing);
            }
            else
            {
                newSheet.AuditStatus = oldSheet.AuditStatus;
            }

            if (costs != null)
            {
                costs.ForEach(cost => {
                    newSheet.CostPrice += cost.Amount * cost.UnitPrice;
                });
            }
            if (receiveds != null)
            {
                receiveds.ForEach(received =>
                {
                    newSheet.ReceivedMoney += received.Money;
                });
            }
            newSheet.RemainingMoney = newSheet.TotalPrice - newSheet.ReceivedMoney;
            newSheet.LastModifyUser = ServiceContext.OperatorID;
            Update("Sheet.Update", newSheet);

            this.Publish(new UpdateSheetEvent()
            {
                SheetID = command.ID,
                Costs = costs,
                Receiveds = receiveds
            });
        }


        public void Execute(DeleteSheetCommand command)
        {
            Update("Sheet.Delete", new { ID = command.ID, LastModifyUser = ServiceContext.OperatorID });
        }

        public void Receive(ICommand command)
        {
            if (command.GetType()==typeof(CreateSheetCommand))
            {
                Execute((CreateSheetCommand)command);
            }
            else if (command.GetType() == typeof(UpdateSheetCommand))
            {
                Execute((UpdateSheetCommand)command);
            }
            else if (command.GetType() == typeof(DeleteSheetCommand))
            {
                Execute((DeleteSheetCommand)command);
            }
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            throw new NotImplementedException();
        }
    }
}