using System;

namespace SettlementApi.Write.BusinessLogic
{
    public class BussinessException : Exception
    {
        public BussinessException(string message)
            : base(message)
        {

        }
    }
}