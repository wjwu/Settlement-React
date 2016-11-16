using System;
using System.Collections.Generic;
using SettlementApi.CommandBus;
using SettlementApi.Common.Mapper;
using SettlementApi.EventBus;
using SettlementApi.Write.BusCommand.SheetModule;
using SettlementApi.Write.BusinessLogic.Event;
using SettlementApi.Write.BusinessLogic.Resource;
using SettlementApi.Write.Model;
using SettlementApi.Write.Model.Enums;

namespace SettlementApi.Write.BusinessLogic
{
    public class SheetBusinessLogic : BusinessLogicBase<Sheet>, IEventPublishObject,
        ICommandBus<CreateSheetCommand>,
        ICommandBus<UpdateSheetCommand>,
        ICommandBus<DeleteSheetCommand>,
        ICommandBus<UpdateAuditStatusCommand>
    {
        public void Execute(CreateSheetCommand command)
        {
            var sheet = MapperHelper.Map<CreateSheetCommand, Sheet>(command);
            var costs = MapperHelper.Map<List<CostEntity>, List<Cost>>(command.Costs);
            var receiveds = MapperHelper.Map<List<ReceivedEntity>, List<Received>>(command.Receiveds);
            sheet.ID = Guid.NewGuid();
            sheet.UserID = ServiceContext.OperatorID;
            sheet.AuditStatus = Enum.GetName(typeof(AuditStatus),
                command.Submit ? AuditStatus.Auditing : AuditStatus.UnSubmit);
            sheet.PayStatus = Enum.GetName(typeof(PayStatus), PayStatus.Unpaid);
            sheet.Days = sheet.TimeTo.Subtract(sheet.TimeFrom).Days;
            sheet.Unit = Math.Round(sheet.Total/sheet.People);
            costs?.ForEach(cost => { sheet.CostPrice += cost.Amount*cost.Unit; });
            receiveds?.ForEach(received => { sheet.Received += received.Money; });
            sheet.Remaining = sheet.Total - sheet.Received;

            var projectManager = new UserBusinessLogic().GetEntity(ServiceContext.OperatorID);
            if (projectManager == null)
                throw new BussinessException(CommonRes.InvalidOperation);
            var group = new GroupBusinessLogic().GetEntity(projectManager.Group);
            sheet.Percent = group.Percent;
            sheet.Commission = (sheet.Total - sheet.CostPrice)*sheet.Percent;

            sheet.LastModifyUser = ServiceContext.OperatorID;
            Create("Sheet.Create", sheet);

            this.Publish(new CreateSheetEvent
            {
                SheetID = sheet.ID,
                Costs = costs,
                Receiveds = receiveds
            });
        }

        public void Receive(ICommand command)
        {
            if (command.GetType() == typeof(CreateSheetCommand))
                Execute((CreateSheetCommand) command);
            else if (command.GetType() == typeof(UpdateSheetCommand))
                Execute((UpdateSheetCommand) command);
            else if (command.GetType() == typeof(DeleteSheetCommand))
                Execute((DeleteSheetCommand) command);
            else if (command.GetType() == typeof(UpdateAuditStatusCommand))
                Execute((UpdateAuditStatusCommand) command);
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            throw new NotImplementedException();
        }

        public void Execute(DeleteSheetCommand command)
        {
            Update("Sheet.Delete", new {command.ID, LastModifyUser = ServiceContext.OperatorID});
        }

        public void Execute(UpdateAuditStatusCommand command)
        {
            //var opertor = new UserBusinessLogic().GetEntity(ServiceContext.OperatorID);
            //if (ServiceContext.OperatorID)
            //{

            //}

            //todo
            var sheet = GetEntity(command.ID);
            if (sheet.AuditStatus != Enum.GetName(typeof(AuditStatus), AuditStatus.Auditing))
                throw new BussinessException(CommonRes.InvalidOperation);
            var auditStatus = command.Pass
                ? Enum.GetName(typeof(AuditStatus), AuditStatus.Pass)
                : Enum.GetName(typeof(AuditStatus), AuditStatus.Fail);
            Update("Sheet.UpdateAuditStatus",
                new {command.ID, AuditStatus = auditStatus, LastModifyUser = ServiceContext.OperatorID});
        }

        public void Execute(UpdateSheetCommand command)
        {
            var oldSheet = GetEntity(command.ID);
            if (oldSheet == null)
                throw new BussinessException(CommonRes.InvalidOperation);
            var newSheet = MapperHelper.Map<UpdateSheetCommand, Sheet>(command);
            var costs = MapperHelper.Map<List<CostEntity>, List<Cost>>(command.Costs);
            var receiveds = MapperHelper.Map<List<ReceivedEntity>, List<Received>>(command.Receiveds);

            newSheet.Days = newSheet.TimeTo.Subtract(newSheet.TimeFrom).Days;
            newSheet.Unit = Math.Round(newSheet.Total/newSheet.People);

            if (((oldSheet.AuditStatus == Enum.GetName(typeof(AuditStatus), AuditStatus.UnSubmit))
                 || (oldSheet.AuditStatus == Enum.GetName(typeof(AuditStatus), AuditStatus.Fail))) && command.Submit)
                newSheet.AuditStatus = Enum.GetName(typeof(AuditStatus), AuditStatus.Auditing);
            else
                newSheet.AuditStatus = oldSheet.AuditStatus;

            costs?.ForEach(cost => { newSheet.CostPrice += cost.Amount*cost.Unit; });
            receiveds?.ForEach(received => { newSheet.Received += received.Money; });
            newSheet.Remaining = newSheet.Total - newSheet.Received;

            var user = new UserBusinessLogic().GetEntity(ServiceContext.OperatorID);
            if (user == null)
                throw new BussinessException(CommonRes.InvalidOperation);

            newSheet.Commission = (newSheet.Total - newSheet.CostPrice)*oldSheet.Percent;

            newSheet.LastModifyUser = ServiceContext.OperatorID;
            Update("Sheet.Update", newSheet);

            this.Publish(new UpdateSheetEvent
            {
                SheetID = command.ID,
                Costs = costs,
                Receiveds = receiveds
            });
        }

        public override Sheet GetEntity(Guid id)
        {
            return GetEntity("Sheet.GetByID", new {ID = id});
        }
    }
}