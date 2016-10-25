using System;
using SettlementApi.CommandBus;
using SettlementApi.Common;
using SettlementApi.Common.Mapper;
using SettlementApi.Write.BusCommand.DictionaryModule;
using SettlementApi.Write.Model;
using SettlementApi.Write.Model.Enums;

namespace SettlementApi.Write.BusinessLogic
{
    public class DictionaryBusinessLogic : BusinessLogicBase<Dictionary>, ICommandBus<CreateDictionaryCommand>
    {
        public void Execute(CreateDictionaryCommand command)
        {
            var type = EnumUtity.ToEnum(command.Type, DictionaryType.None);
            command.Type = Enum.GetName(typeof(DictionaryType), type);
            var dic = MapperHelper.Map<CreateDictionaryCommand, Dictionary>(command);
            Create("Dictionary.Create", dic);
        }

        public void Receive(ICommand command)
        {
            if (command.GetType() == typeof(CreateDictionaryCommand))
                Execute((CreateDictionaryCommand) command);
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            throw new NotImplementedException();
        }

        public override Dictionary GetEntity(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}