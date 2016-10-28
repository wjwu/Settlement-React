using System;
using SettlementApi.CommandBus;
using SettlementApi.Common.Mapper;
using SettlementApi.Write.BusCommand.SheetModule;
using SettlementApi.Write.Model;
using SettlementApi.Write.Model.Enums;

namespace SettlementApi.Write.BusinessLogic
{
    public class SheetBusinessLogic: BusinessLogicBase<Sheet>,
        ICommandBus<CreateSheetCommand>
    {
        public override Sheet GetEntity(Guid id)
        {
            throw new NotImplementedException();
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

        public void Receive(ICommand command)
        {
            if (command.GetType()==typeof(CreateSheetCommand))
            {
                Execute((CreateSheetCommand)command);
            }
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            throw new NotImplementedException();
        }
    }
}