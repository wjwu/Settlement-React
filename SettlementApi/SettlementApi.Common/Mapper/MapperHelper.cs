using System;
using EmitMapper;

namespace SettlementApi.Common.Mapper
{
    public static class MapperHelper
    {
        public static TOut Map<TIn, TOut>(TIn from)
            where TIn : class
            where TOut : class
        {
            ObjectsMapper<TIn, TOut> mapper = ObjectMapperManager.DefaultInstance.GetMapper<TIn, TOut>();
            //todo 暂时解决方案 不是get时 URL不传参数 DTO为空
            TOut tout = mapper.Map(@from) ?? Activator.CreateInstance<TOut>();
            return tout;

        }

        public static TOut Map<TIn, TOut>(TIn from, IMappingConfigurator extentedMapper)
            where TIn : class
            where TOut : class
        {
            ObjectsMapper<TIn, TOut> mapper = new ObjectMapperManager().GetMapper<TIn, TOut>(extentedMapper);
            return mapper.Map(from);
        }
    }
}