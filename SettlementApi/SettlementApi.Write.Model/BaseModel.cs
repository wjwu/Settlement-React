using System;

namespace SettlementApi.Write.Model
{
    public class BaseModel
    {
        /// <summary>
        ///     数据创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        ///     数据最后修改时间
        /// </summary>
        public DateTime? LastModifyTime { get; set; }

        /// <summary>
        ///     数据最后修改公司用户
        /// </summary>
        public Guid? LastModifyUser { get; set; }

        /// <summary>
        ///     是否已删除
        /// </summary>
        public bool Deleted { get; set; }
    }
}