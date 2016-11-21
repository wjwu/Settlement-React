using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Practices.ObjectBuilder2;
using SettlementApi.CommandBus;
using SettlementApi.Common.Mapper;
using SettlementApi.Read.QueryCommand;
using SettlementApi.Read.QueryCommand.GroupModule;
using SettlementApi.Read.QueryCommand.SheetModule;
using SettlementApi.Read.QueryCommand.StatisticsModule;
using SettlementApi.Read.QueryCommand.UserModule;

namespace SettlementApi.Read.Respository
{
//    public static class DistinctExtensions
//    {
//        public static IEnumerable<T> Distinct<T, V>(this IEnumerable<T> source, Func<T, V> keySelector)
//        {
//            return source.Distinct(new CommonEqualityComparer<T, V>(keySelector));
//        }
//    }
//
//    public class CommonEqualityComparer<T, V> : IEqualityComparer<T>
//    {
//        private readonly Func<T, V> _keySelector;
//
//        public CommonEqualityComparer(Func<T, V> keySelector)
//        {
//            _keySelector = keySelector;
//        }
//
//        public bool Equals(T x, T y)
//        {
//            return EqualityComparer<V>.Default.Equals(_keySelector(x), _keySelector(y));
//        }
//
//        public int GetHashCode(T obj)
//        {
//            return EqualityComparer<V>.Default.GetHashCode(_keySelector(obj));
//        }
//    }

    public class QueryStatistics : BaseRRespository,
        ICommandBus<QueryStatisticsCommand, QueryStatisticsCommandResult>
    {
        public QueryStatisticsCommandResult Execute(QueryStatisticsCommand command)
        {
            var querySheetCmd = MapperHelper.Map<QueryStatisticsCommand, QuerySheetNoPagingCommand>(command);
            var sheets = new QuerySheet().Execute(querySheetCmd);
            var result = new QueryStatisticsCommandResult
            {
                Total = "0",
                Cost = "0",
                Profit = "0",
                Commission = "0",
                AfterProfit = "0",
                Received = "0",
                Remaining = "0"
            };

            if (sheets != null)
            {
                result.Amount = sheets.Count;
                var total = sheets.Sum(p => p.Total);
                result.Total = total.ToString("N");
                var cost = sheets.Sum(p => p.Cost);
                result.Cost = cost.ToString("N");
                result.Profit = $"{total - cost:N}";
                var commission = sheets.Sum(p => p.Commission);
                result.Commission = commission.ToString("N");
                result.AfterProfit = $"{total - cost - commission:N}";
                var received = sheets.Sum(p => p.Received);
                result.Received = received.ToString("N");
                var remaining = sheets.Sum(p => p.Remaining);
                result.Remaining = remaining.ToString("N");
                decimal amount = result.Amount;
                result.Sources =
                    sheets.GroupBy(p => p.Source)
                        .Select(p => new {Name = p.Key, Value = p.Count()/amount})
                        .ToDictionary(p => p.Name, p => decimal.Round(p.Value, 2));

                var sheetStats =
                    sheets.GroupBy(p => p.UserID)
                        .Select(
                            p =>
                                new TmpSheet
                                {
                                    UserID = p.Key,
                                    Amount = p.Count(),
                                    Total = p.Sum(s => s.Total),
                                    Cost = p.Sum(s => s.Cost),
                                    Commission = p.Sum(s => s.Commission),
                                    Achievement = p.Sum(s=>s.Achievement)
                                });

                var users =
                    new QueryUser().Execute(new QueryUserCommand {Groups = command.Groups, PageSize = int.MaxValue});

                var queryGroup = new QueryGroup();
                var groups = new List<GetGroupCommandResult>();
                users.List.ForEach(user =>
                {
                    if (groups.All(p => p.ID != user.Group))
                        groups.Add(queryGroup.Execute(new GetByIDCommand {ID = user.Group}));
                });


                var userStats =
                    users.List.Join(groups, user => user.Group, group => group.ID,
                        (user, group) =>
                            new TmpUser
                            {
                                ID = user.ID,
                                Name = user.Name,
                                Department = group.Name,
                                Percent = group.Percent
                            });

                result.UserProfits = userStats.GroupJoin(sheetStats, user => user.ID, sheet => sheet.UserID,
                        (user, sheet) => new {user, sheet})
                    .SelectMany(t => t.sheet.DefaultIfEmpty(), (t, sheet) => new UserProfits
                    {
                        ID = t.user.ID,
                        Name = t.user.Name,
                        Department = t.user.Department,
                        Percent = t.user.Percent,
                        Achievement = sheet?.Achievement ?? 0,
                        Amount = sheet?.Amount ?? 0,
                        Total = sheet?.Total ?? 0,
                        Cost = sheet?.Cost ?? 0,
                        Commission = sheet?.Commission ?? 0
                    }).ToList();

                var dic = new Dictionary<Guid, List<RQuerySheet>>();
                foreach (var group in groups)
                {
                    if (!dic.ContainsKey(group.ID))
                        dic.Add(group.ID, new List<RQuerySheet>());
                    foreach (var user in users.List)
                        if (user.Group == group.ID)
                        {
                            var sts = sheets.Where(s => s.UserID == user.ID).ToList();
                            dic[group.ID].AddRange(sts);
                        }
                }
                result.DepartmentProfits = new BaseCommandResult<DepartmentProfits>();
                decimal deptTotal=0;
                dic.ForEach(d => deptTotal += d.Value.Sum(p => p.Total));
                result.Departments = new Dictionary<string, decimal>();
                foreach (var d in dic)
                {
                    var group = groups.FirstOrDefault(p => p.ID == d.Key);
                    if (group != null)
                    {
                        var deptProfits = new DepartmentProfits
                        {
                            ID = group.ID,
                            Name = group.Name,
                            Amount = d.Value.Count,
                            Commission = d.Value.Sum(p => p.Commission),
                            Cost = d.Value.Sum(p => p.Cost),
                            Percent = group.Percent,
                            Total = d.Value.Sum(p => p.Total),
                            Achievement = d.Value.Sum(p => p.Achievement)
                        };
                        result.Departments.Add(group.Name,decimal.Round(deptProfits.Total/ deptTotal,2));
                        result.DepartmentProfits.Add(deptProfits);
                    }
                }
            }
            return result;
        }

        public void Receive(ICommand command)
        {
            throw new NotImplementedException();
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            if (command.GetType() == typeof(QueryStatisticsCommand))
                return Execute((QueryStatisticsCommand) command);
            return null;
        }

        public class TmpSheet
        {
            public Guid UserID { get; set; }
            public int Amount { get; set; }
            public decimal Total { get; set; }
            public decimal Cost { get; set; }
            public decimal Commission { get; set; }
            public decimal Achievement { get; set; }
        }

        public class TmpUser
        {
            public Guid ID { get; set; }
            public string Name { get; set; }
            public string Department { get; set; }
            public decimal Percent { get; set; }
            
        }
    }
}