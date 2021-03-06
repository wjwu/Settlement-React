﻿using System;

namespace SettlementApi.Write.Model
{
    public class Sheet : BaseModel
    {
        public Guid ID { get; set; }

        /// <summary>
        /// 签单人
        /// </summary>
        public Guid UserID { get; set; }

        /// <summary>
        /// 审核状态
        /// </summary>
        public string AuditStatus { get; set; }

        /// <summary>
        /// 付款状态
        /// </summary>
        public string PayStatus { get; set; }

        /// <summary>
        /// 客户名称
        /// </summary>
        public string CustomName { get; set; }

        /// <summary>
        /// 客户联系人
        /// </summary>
        public string Contacts { get; set; }

        /// <summary>
        /// 联系电话
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// QQ
        /// </summary>
        public string QQ { get; set; }

        /// <summary>
        /// 微信
        /// </summary>
        public string WeiXin { get; set; }


        /// <summary>
        /// 客户地址
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// 开始培训时间
        /// </summary>
        public DateTime TimeFrom { get; set; }

        /// <summary>
        /// 结束培训时间
        /// </summary>
        public DateTime TimeTo { get; set; }

        /// <summary>
        /// 培训基地
        /// </summary>
        public Guid Base { get; set; }

        /// <summary>
        /// 人数
        /// </summary>
        public int People { get; set; }

        /// <summary>
        /// 天数
        /// </summary>
        public int Days { get; set; }

        /// <summary>
        /// 客户来源
        /// </summary>
        public Guid Source { get; set; }

        /// <summary>
        /// 总价
        /// </summary>
        public decimal Total { get; set; }

        /// <summary>
        /// 单价
        /// </summary>
        public decimal Unit { get; set; }

        /// <summary>
        /// 总成本
        /// </summary>
        public decimal Cost { get; set; }

        /// <summary>
        /// 已收金额
        /// </summary>
        public decimal Received { get; set; }

        /// <summary>
        /// 待收金额
        /// </summary>
        public decimal Remaining { get; set; }

        /// <summary>
        /// 个人提成
        /// </summary>
        public decimal Commission { get; set; }

        /// <summary>
        /// 提成比例
        /// </summary>
        public decimal Percent { get; set; }

        /// <summary>
        /// 税率
        /// </summary>
        public decimal TaxRate { get; set; }

        /// <summary>
        /// 税费
        /// </summary>
        public decimal Tax { get; set; }

        /// <summary>
        /// 业绩
        /// </summary>
        public decimal Achievement { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }
    }
}