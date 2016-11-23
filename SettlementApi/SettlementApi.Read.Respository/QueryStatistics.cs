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
using SettlementApi.Write.Model.Enums;

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
        ICommandBus<QueryStatisticsCommand, QueryStatisticsCommandResult>,
        ICommandBus<QueryUserStatisticsCommand, QueryUserStatisticsCommandResult>
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
                //来源统计
                result.Source =
                    sheets.GroupBy(p => p.Source)
                        .Select(p => new {Name = p.Key, Value = p.Count()/amount})
                        .ToDictionary(p => p.Name, p => decimal.Round(p.Value, 2));

                //根据签单人分组结算表
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
                                    Achievement = p.Sum(s => s.Achievement)
                                });
                //根据部门ID查询部门下所有用户
                var users =
                    new QueryUser().Execute(new QueryUserCommand {Groups = command.Groups, PageSize = int.MaxValue});

                //根据用户查询部门信息
                var queryGroup = new QueryGroup();
                var groups = new List<GetGroupCommandResult>();
                users.List.ForEach(user =>
                {
                    if (groups.All(p => p.ID != user.Group))
                        groups.Add(queryGroup.Execute(new GetByIDCommand {ID = user.Group}));
                });

                //合并部门和提成信息
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

                //用户签单统计
                result.UserProfit = userStats.GroupJoin(sheetStats, user => user.ID, sheet => sheet.UserID,
                        (user, sheet) => new {user, sheet})
                    .SelectMany(t => t.sheet.DefaultIfEmpty(), (t, sheet) => new UserProfit
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

                //根据部门分组结算表
                var groupSheets = new Dictionary<Guid, List<RQuerySheet>>();
                groups.ForEach(group =>
                {
                    if (!groupSheets.ContainsKey(group.ID))
                        groupSheets.Add(group.ID, new List<RQuerySheet>());
                    users.List.ForEach(user =>
                    {
                        if (user.Group == group.ID)
                        {
                            var sts = sheets.Where(s => s.UserID == user.ID).ToList();
                            groupSheets[group.ID].AddRange(sts);
                        }
                    });
                });

                result.DepartmentProfit = new BaseCommandResult<DepartmentProfit>();

                //计算总成交
                decimal deptTotal = 0;
                groupSheets.ForEach(sheet => deptTotal += sheet.Value.Sum(p => p.Total));

                if (deptTotal > 0)
                {
                    result.Department = new Dictionary<string, decimal>();
                    //统计部门占比
                    groupSheets.ForEach(sheet =>
                    {
                        var group = groups.FirstOrDefault(p => p.ID == sheet.Key);
                        if (group != null)
                        {
                            var deptProfits = new DepartmentProfit
                            {
                                ID = group.ID,
                                Name = group.Name,
                                Amount = sheet.Value.Count,
                                Commission = sheet.Value.Sum(p => p.Commission),
                                Cost = sheet.Value.Sum(p => p.Cost),
                                Percent = group.Percent,
                                Total = sheet.Value.Sum(p => p.Total),
                                Achievement = sheet.Value.Sum(p => p.Achievement)
                            };
                            result.Department.Add(group.Name, decimal.Round(deptProfits.Total/deptTotal, 2));
                            result.DepartmentProfit.Add(deptProfits);
                        }
                    });
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
            if (command.GetType() == typeof(QueryUserStatisticsCommand))
                return Execute((QueryUserStatisticsCommand) command);
            return null;
        }

        public QueryUserStatisticsCommandResult Execute(QueryUserStatisticsCommand command)
        {
            var result = new QueryUserStatisticsCommandResult();
            var userID = ServiceContext.OperatorID;
            var auditStatus = Enum.GetName(typeof(AuditStatus), AuditStatus.Pass);
            var querySheet = new QuerySheet();
            var now = DateTime.Now;
            var yFrom = new DateTime(now.Year, 1, 1);
            var yTo = yFrom.AddYears(1).AddSeconds(-1);
            var ySheets =
                querySheet.Execute(new QuerySheetNoPagingCommand
                {
                    AuditStatus = auditStatus,
                    UserID = userID,
                    TimeFrom = yFrom,
                    TimeTo = yTo
                });

            var mFrom = new DateTime(now.Year, now.Month, 1);
            var mTo = mFrom.AddMonths(1).AddSeconds(-1);
            var mSheets =
                querySheet.Execute(new QuerySheetNoPagingCommand
                {
                    AuditStatus = auditStatus,
                    UserID = userID,
                    TimeFrom = mFrom,
                    TimeTo = mTo
                });

            var lastMFrom = new DateTime(now.Year, now.AddMonths(-1).Month, 1);
            var lastMTo = lastMFrom.AddMonths(1).AddSeconds(-1);
            var lastMSheets =
                querySheet.Execute(new QuerySheetNoPagingCommand
                {
                    AuditStatus = auditStatus,
                    UserID = userID,
                    TimeFrom = lastMFrom,
                    TimeTo = lastMTo
                });
            //成交额
            var total = ySheets.Sum(p => p.Total);
            var monthTotal = mSheets.Sum(p => p.Total);
            result.Total = total.ToString("N");
            result.MonthTotal = monthTotal.ToString("N");
            var lastMTotal = lastMSheets.Sum(p => p.Total);
            if (lastMTotal == 0)
                result.TotalPercent = monthTotal;
            else if (monthTotal == 0)
                result.TotalPercent = monthTotal - lastMTotal;
            else
                result.TotalPercent = decimal.Round((monthTotal - lastMTotal)/lastMTotal*100);

            //提成
            var commission = ySheets.Sum(p => p.Commission);
            var monthCommission = mSheets.Sum(p => p.Commission);
            result.Commission = commission.ToString("N");
            result.MonthCommission = monthCommission.ToString("N");
            var lastMCommission = lastMSheets.Sum(p => p.Commission);
            if (lastMCommission == 0)
                result.CommissionPercent = monthCommission;
            else if (monthCommission == 0)
                result.CommissionPercent = monthCommission - lastMCommission;
            else
                result.CommissionPercent = decimal.Round((monthCommission - lastMCommission)/lastMCommission*100);

            //业绩
            var achievement = ySheets.Sum(p => p.Achievement);
            var monthAchievement = mSheets.Sum(p => p.Achievement);
            result.Achievement = achievement.ToString("N");
            result.MonthAchievement = monthAchievement.ToString("N");
            var lastMAchievement = lastMSheets.Sum(p => p.Achievement);
            if (lastMAchievement == 0)
                result.AchievementPercent = monthAchievement;
            else if (monthAchievement == 0)
                result.AchievementPercent = monthAchievement - lastMAchievement;
            else
                result.AchievementPercent = decimal.Round((monthAchievement - lastMAchievement)/lastMAchievement*100, 2);
            //统计时间段
            result.Date = new List<string>();

            //签单数量统计
            result.ChartAmount = new List<int>();

            //成交额统计
            result.ChartTotal = new List<decimal>();

            var totalDays = DateTime.DaysInMonth(now.Year, now.Month);
            for (var i = 1; i <= totalDays; i++)
                result.Date.Add(i.ToString());

            //签单量和成交额统计
            result.Date.ForEach(day =>
            {
                var currentDate = new DateTime(now.Year, now.Month, int.Parse(day));
                var sheets = mSheets.Where(p => DateTime.Parse(p.TimeFrom) == currentDate).ToList();
                result.ChartTotal.Add(sheets.Sum(p => p.Total));
                result.ChartAmount.Add(sheets.Count);
            });

            //排行榜
            var queryUser = new QueryUser();
            var currentUser = queryUser.Execute(new GetByIDCommand {ID = userID});
            var queryGroup = new QueryGroup();
            var group = queryGroup.Execute(new GetByIDCommand {ID = currentUser.Group});
            var groups = queryGroup.Execute(new QueryGroupCommand {ID = group.ID, ParentID = group.ParentID});

            var cSheets =
                querySheet.Execute(new QuerySheetNoPagingCommand
                {
                    AuditStatus = auditStatus,
                    Groups = string.Join(",", groups.Select(p => p.ID.ToString()).ToArray()),
                    TimeFrom = mFrom,
                    TimeTo = mTo
                });

            var statsSheets = cSheets.GroupBy(p => p.UserID).Select(p => new TmpSheet
            {
                UserID = p.Key,
                Amount = p.Count(),
                Total = p.Sum(s => s.Total),
                Cost = p.Sum(s => s.Cost),
                Commission = p.Sum(s => s.Commission),
                Achievement = p.Sum(s => s.Achievement)
            });
            result.RankAmount = new List<RankAmount>();
            result.RankTotal = new List<RankTotal>();
            statsSheets.OrderByDescending(p => p.Amount).ForEach(sheet =>
            {
                var user = queryUser.Execute(new GetByIDCommand {ID = sheet.UserID});
                result.RankAmount.Add(new RankAmount
                {
                    Name = user.Name,
                    Amount = sheet.Amount
                });
            });
            statsSheets.OrderByDescending(p => p.Total).ForEach(sheet =>
            {
                var user = queryUser.Execute(new GetByIDCommand {ID = sheet.UserID});
                result.RankTotal.Add(new RankTotal
                {
                    Name = user.Name,
                    Total = sheet.Total.ToString("N")
                });
            });
            return result;
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