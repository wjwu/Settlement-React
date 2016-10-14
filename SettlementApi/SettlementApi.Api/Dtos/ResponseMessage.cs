namespace SettlementApi.Api.Dtos
{
    public class ResponseMessage
    {
        public ResponseMessage()
        {
        }

        public ResponseMessage(string message)
        {
            Message = message;
        }

        public string Message { get; set; }
    }
}