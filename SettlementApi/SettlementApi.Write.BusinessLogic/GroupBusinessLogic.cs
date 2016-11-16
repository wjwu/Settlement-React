using System;
using System.Collections.Generic;
using SettlementApi.CommandBus;
using SettlementApi.Common.Mapper;
using SettlementApi.EventBus;
using SettlementApi.Write.BusCommand.GroupModule;
using SettlementApi.Write.BusinessLogic.Event;
using SettlementApi.Write.BusinessLogic.Resource;
using SettlementApi.Write.Model;

namespace SettlementApi.Write.BusinessLogic
{
    public class GroupBusinessLogic : BusinessLogicBase<Group>, IEventPublishObject,
        ICommandBus<CreateGroupCommand>,
        ICommandBus<DeleteGroupCommand>,
        ICommandBus<UpdateGroupCommand>
    {
        public void Execute(CreateGroupCommand command)
        {
            var group = MapperHelper.Map<CreateGroupCommand, Group>(command);
            Create("Group.Create", group);
        }

        public void Receive(ICommand command)
        {
            if (command.GetType() == typeof(CreateGroupCommand))
                Execute((CreateGroupCommand) command);
            else if (command.GetType() == typeof(DeleteGroupCommand))
                Execute((DeleteGroupCommand) command);
            else if (command.GetType() == typeof(UpdateGroupCommand))
                Execute((UpdateGroupCommand) command);
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            throw new NotImplementedException();
        }

        public void Execute(DeleteGroupCommand command)
        {
            var group = GetEntity(command.ID);
            if (group == null)
                throw new BussinessException(GroupRes.NotExists);
            if (group.ParentID == Guid.Empty)
                throw new BussinessException(GroupRes.RootCanNotDelete);
            var parent = GetEntity(group.ParentID);
            Delete("Group.Delete", command);
            this.Publish(new DeleteGroupEvent
            {
                NewGroup = parent.ID,
                OldGroup = group.ID
            });
        }

        public void Execute(UpdateGroupCommand command)
        {
            Update("Group.Update", command);
        }

        public override Group GetEntity(Guid id)
        {
            return GetEntity("Group.GetByID", new {ID = id});
        }

        public List<Group> GetList(Guid id, Guid parentID)
        {
            return GetList("Group.Query", new {ID = id, ParentID = parentID});
        }
    }
}