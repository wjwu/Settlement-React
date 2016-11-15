using SettlementApi.CommandBus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SettlementApi.Write.BusCommand.SheetModule
{
    public class UpdateAuditStatusCommand: ICommand
    {
        public Guid ID { get; set; }

        public bool Pass { get; set; }
    }
}
