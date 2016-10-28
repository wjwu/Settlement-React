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

        public ResponseMessage(string message,bool isError)
        {
            Message = message;
            IsError = isError;
        }

        public bool IsError { get; set; }
        public string Message { get; set; }
    }
}