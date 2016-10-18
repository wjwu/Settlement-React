using System;

namespace SettlementApi.Write.Model
{
    public class User : BaseModel
    {
        /// <summary>
        ///     用户ID
        /// </summary>
        public Guid ID { get; set; }

        /// <summary>
        ///     登录账号
        /// </summary>
        public string LoginID { get; set; }

        /// <summary>
        ///     密码
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        ///     手机
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        ///     姓名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 部门
        /// </summary>
        public Guid Group { get; set; }

        /// <summary>
        ///     是否启用
        /// </summary>
        public bool Enabled { get; set; }

        /// <summary>
        ///     最后登录时间
        /// </summary>
        public DateTime? LastLoginTime { get; set; }

        /// <summary>
        ///     最后登录IP
        /// </summary>
        public string LastLoginIP { get; set; }
    }
}