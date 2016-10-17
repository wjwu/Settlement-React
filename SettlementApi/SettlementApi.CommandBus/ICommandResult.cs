namespace SettlementApi.CommandBus
{
    public interface ICommandResult
    {
    }

    public interface ICommandResult<T> : ICommandResult where T : class
    {
    }
}