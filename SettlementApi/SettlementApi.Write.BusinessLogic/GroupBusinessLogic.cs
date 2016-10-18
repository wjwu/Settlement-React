using System;
using SettlementApi.CommandBus;
using SettlementApi.Common.Mapper;
using SettlementApi.Write.BusCommand.GroupModule;
using SettlementApi.Write.Model;

namespace SettlementApi.Write.BusinessLogic
{
    public class GroupBusinessLogic : BusinessLogicBase<Group>,
        ICommandBus<CreateGroupCommand>
    {
        public void Execute(CreateGroupCommand command)
        {
            var group = MapperHelper.Map<CreateGroupCommand, Group>(command);
            Create("Group.Create", group);
        }

        public void Receive(ICommand command)
        {
            throw new NotImplementedException();
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            throw new NotImplementedException();
        }

        public override Group GetEntity(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}