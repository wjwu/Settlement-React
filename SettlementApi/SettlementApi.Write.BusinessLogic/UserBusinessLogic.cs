using System;
using SettlementApi.CommandBus;
using SettlementApi.Common.Mapper;
using SettlementApi.EventBus;
using SettlementApi.Write.BusCommand.UserModule;
using SettlementApi.Write.BusinessLogic.Event;
using SettlementApi.Write.BusinessLogic.Resource;
using SettlementApi.Write.BusinessLogic.Utility;
using SettlementApi.Write.Model;

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
                Execute((UpdateUserCommand)command);
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            if (command.GetType() == typeof(LoginCommand))
                return Execute((LoginCommand) command);
            return null;
        }

        public void Execute(CreateUserCommand command)
        {
            var user = MapperHelper.Map<CreateUserCommand, User>(command);
            user.Password = Security.Md5Encrypt(Security.Encrypt(user.Password));
            Create("User.Create", user);
        }

        public void Execute(UpdateUserCommand command)
        {
            Update("User.Update",command);
        }

        public LoginCommandResult Execute(LoginCommand command)
        {
            command.Password = Security.Md5Encrypt(Security.Encrypt(command.Password));
            var loginUser = GetEntity("User.Login", command);
            if (loginUser == null)
                throw new BussinessException(UserRes.LoginFail);
            if (!loginUser.Enabled)
                throw new BussinessException(UserRes.LoginFailDisabled);
            var result = MapperHelper.Map<User, LoginCommandResult>(loginUser);
            return result;
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