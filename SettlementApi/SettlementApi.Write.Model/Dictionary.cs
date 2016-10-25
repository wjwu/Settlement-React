using System;

namespace SettlementApi.Write.Model
{
    public class Dictionary:BaseModel
    {
        /// <summary>
        ///     字典ID
        /// </summary>
        public Guid ID { get; set; }

        /// <summary>
        ///     字典名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        ///     分类
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        ///     排序
        /// </summary>
        public int Rank { get; set; }

        /// <summary>
        ///     数量
        /// </summary>
        public int Count { get; set; }

        /// <summary>
        ///     是否启用
        /// </summary>
        public bool Enabled { get; set; }
    }
}