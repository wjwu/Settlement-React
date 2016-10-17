namespace SettlementApi.CommandBus
{
    public interface ICommandBus
    {
        void Receive(ICommand command);

        ICommandResult ReceiveEx(ICommand command);
    }

    public interface ICommandBus<in TCommand> : ICommandBus where TCommand : ICommand
    {
        void Execute(TCommand command);
    }

    public interface ICommandBus<in TCommand, out TCommandResult> : ICommandBus
        where TCommand : ICommand
        where TCommandResult : ICommandResult
    {
        TCommandResult Execute(TCommand command);
    } 

    
}