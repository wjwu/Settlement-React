using System;
using System.Linq;
using SettlementApi.CommandBus;
using SettlementApi.Common;
using SettlementApi.Common.Mapper;
using SettlementApi.EventBus;
using SettlementApi.Write.BusCommand.UserModule;
using SettlementApi.Write.BusinessLogic.Event;
using SettlementApi.Write.BusinessLogic.Resource;
using SettlementApi.Write.BusinessLogic.Utility;
using SettlementApi.Write.Model;
using SettlementApi.Write.Model.Enums;

namespace SettlementApi.Write.BusinessLogic
{
    public class UserBusinessLogic : BusinessLogicBase<User>, IEventSubscribeObject,
        ICommandBus<ChangePasswordCommand>,
        ICommandBus<LoginCommand, LoginCommandResult>,
        ICommandBus<CreateUserCommand>,
        ICommandBus<UpdateUserCommand>
    {
        public void Execute(ChangePasswordCommand command)
        {
            command.NewPassword = Security.Md5Encrypt(Security.Encrypt(command.NewPassword));
            Update("User.ChangePassword", new
            {
                ID = ServiceContext.OperatorID,
                Password = command.NewPassword,
                LastModifyTime = DateTime.Now,
                LastModifyUser = ServiceContext.OperatorID
            });
        }

        public void Receive(ICommand command)
        {
            if (command.GetType() == typeof(ChangePasswordCommand))
                Execute((ChangePasswordCommand) command);
            else if (command.GetType() == typeof(CreateUserCommand))
                Execute((CreateUserCommand) command);
            else if (command.GetType() == typeof(UpdateUserCommand))
                Execute((UpdateUserCommand) command);
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            if (command.GetType() == typeof(LoginCommand))
                return Execute((LoginCommand) command);
            return null;
        }

        public void Execute(CreateUserCommand command)
        {
            var chkUser = GetEntity("User.CheckLoginID", new {command.LoginID});
            if (chkUser != null)
                throw new BussinessException(UserRes.LoginIDExists);
            var user = MapperHelper.Map<CreateUserCommand, User>(command);
            user.Password = Security.Md5Encrypt(Security.Encrypt(user.Password));
            user.Role = Enum.GetName(typeof(RoleType), EnumUtity.ToEnum(command.Role, RoleType.None));
            Create("User.Create", user);
        }

        public LoginCommandResult Execute(LoginCommand command)
        {
            command.Password = Security.Md5Encrypt(Security.Encrypt(command.Password));
            var loginUser = GetEntity("User.Login", command);
            if (loginUser == null)
                throw new BussinessException(UserRes.LoginFail);
            if (!loginUser.Enabled)
                throw new BussinessException(UserRes.LoginFailDisabled);
            Update("User.LoginUpdate", new {LastLoginIP = ServiceContext.RequestIP, loginUser.ID});
            var result = MapperHelper.Map<User, LoginCommandResult>(loginUser);
            var groupBus = new GroupBusinessLogic();
            var group = groupBus.GetEntity(loginUser.Group);
            if (group != null)
                result.ParentGroup = group.ParentID;
            var groups = groupBus.GetList(group.ID, group.ParentID);
            if (groups != null)
                result.Path = groups.Select(p => p.ID.ToString()).ToList();
            return result;
        }

        public void Execute(UpdateUserCommand command)
        {
            command.Role = Enum.GetName(typeof(RoleType), EnumUtity.ToEnum(command.Role, RoleType.None));
            Update("User.Update", command);
        }

        public void SubscribeEvents()
        {
            this.Subscribe<DeleteGroupEvent>(e =>
            {
                var evt = e as DeleteGroupEvent;
                Update("User.BatchUpdateGroup", evt);
            });
        }

        public override User GetEntity(Guid id)
        {
            return GetEntity("User.GetByID", new {ID = id});
        }
    }
}