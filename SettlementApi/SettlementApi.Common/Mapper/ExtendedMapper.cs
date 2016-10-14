using System;
using System.Linq;
using System.Reflection;
using EmitMapper;
using EmitMapper.MappingConfiguration;
using EmitMapper.MappingConfiguration.MappingOperations;
using EmitMapper.Utils;

namespace SettlementApi.Common.Mapper
{
    public class ExtendedMapper : IMappingConfigurator
    {
        public string GetConfigurationName()
        {
            return null;
        }

        public IMappingOperation[] GetMappingOperations(Type from, Type to)
        {
            MemberInfo[] members = ReflectionUtils.GetPublicFieldsAndProperties(to);
            return members.Select(p => new DestWriteOperation
            {
                Destination = new MemberDescriptor(p),
                Getter = (ValueGetter<object>) (
                    (fromObj, status) =>
                    {
                        PropertyInfo[] fromProperties = fromObj.GetType().GetProperties();
                        Type memberType = ReflectionUtils.GetMemberType(p);
                        PropertyInfo existProperty;
                        if (memberType.IsClass && memberType != typeof (String))
                        {
                            object memberObj = Activator.CreateInstance(memberType);
                            PropertyInfo[] memberProperties = memberType.GetProperties();
                            foreach (PropertyInfo propertyInfo in memberProperties)
                            {
                                existProperty =
                                    fromProperties.FirstOrDefault(fp => fp.Name.Equals(propertyInfo.Name));
                                if (existProperty != null)
                                {
                                    propertyInfo.SetValue(memberObj, existProperty.GetValue(fromObj));
                                }
                            }
                            return ValueToWrite<object>.ReturnValue(memberObj);
                        }
                        existProperty = fromProperties.FirstOrDefault(fp => fp.Name.Equals(p.Name));
                        if (existProperty != null)
                        {
                            return ValueToWrite<object>.ReturnValue(existProperty.GetValue(fromObj));
                        }
                        return ValueToWrite<object>.Skip();
                    }
                    )
            }).ToArray();
        }

        public IRootMappingOperation GetRootMappingOperation(Type from, Type to)
        {
            return null;
        }

        public StaticConvertersManager GetStaticConvertersManager()
        {
            return null;
        }
    }
}