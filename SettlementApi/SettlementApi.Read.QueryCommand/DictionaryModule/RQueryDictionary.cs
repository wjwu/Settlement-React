﻿using System;

namespace SettlementApi.Read.QueryCommand.DictionaryModule
{
    public class RQueryDictionary
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public int Rank { get; set; }
        public int Count { get; set; }
        public bool Enabled { get; set; }
        public DateTime CreateTime { get; set; }
    }
}