using System;
using SettlementApi.CommandBus;
using SettlementApi.Common.Mapper;
using SettlementApi.Write.BusCommand.SheetModule;
using SettlementApi.Write.Model;
using SettlementApi.Write.Model.Enums;
using SettlementApi.Write.BusinessLogic.Resource;

namespace SettlementApi.Write.BusinessLogic
{
    public class SheetBusinessLogic: BusinessLogicBase<Sheet>,
        ICommandBus<CreateSheetCommand>,
        ICommandBus<UpdateSheetCommand>
    {
        public override Sheet GetEntity(Guid id)
        {
            return GetEntity("Sheet.GetByID", new { ID = id });
        }

        public void Execute(CreateSheetCommand command)
        {
            var sheet = MapperHelper.Map<CreateSheetCommand, Sheet>(command);
            sheet.ID=Guid.NewGuid();
            sheet.ProjectManager= ServiceContext.OperatorID;
            sheet.AuditStatus = Enum.GetName(typeof(AuditStatus), AuditStatus.UnSubmit);
            sheet.PayStatus= Enum.GetName(typeof(PayStatus), PayStatus.Unpaid);
            sheet.Days = sheet.TimeTo.Subtract(sheet.TimeFrom).Days;
            sheet.UnitPrice = Math.Round(sheet.TotalPrice/sheet.People);
            sheet.ReceivedMoney = 0;
            sheet.RemainingMoney = sheet.TotalPrice;
            sheet.LastModifyUser = ServiceContext.OperatorID;
            Create("Sheet.Create",sheet);
        }

        public void Execute(UpdateSheetCommand command)
        {
            var oldSheet = GetEntity(command.ID);
            if (oldSheet == null)
            {
                throw new BussinessException(CommonRes.InvalidOperation);
            }
            var newSheet = MapperHelper.Map<UpdateSheetCommand, Sheet>(command);
            newSheet.Days = newSheet.TimeTo.Subtract(newSheet.TimeFrom).Days;
            newSheet.UnitPrice = Math.Round(newSheet.TotalPrice / newSheet.People);
            newSheet.RemainingMoney = newSheet.TotalPrice - oldSheet.ReceivedMoney;
            newSheet.LastModifyUser = ServiceContext.OperatorID;
            Update("Sheet.Update", newSheet);
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
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            throw new NotImplementedException();
        }
    }
}