using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading;
using System.Web;
using SettlementApi.Api.Utility;

namespace SettlementApi.Api.Pools
{
    internal class ApiContext
    {
        public Guid Token { get; set; }
        public Guid Uid { get; set; }
        public DateTime? ExpiredTime { get; set; }
    }

    public class ApiContextPool
    {
        private const int ExpiredMinutes = 60*6;
        private static List<Guid> _removeList;
        private static Dictionary<Guid, ApiContext> _tokens;
        private static Timer _timer;
        public static bool IsStart { get; set; }

        public static void Start()
        {
            if (IsStart)
            {
                return;
            }
            IsStart = true;
            var obj = new object();
            _tokens = new Dictionary<Guid, ApiContext>();
            _removeList = new List<Guid>();
            //AddSpecialUser();
            _timer = new Timer(state =>
            {
                lock (obj)
                {
                    foreach (var token in _tokens)
                    {
                        //ExpiredTime等于null为永不过期账户
                        if (token.Value.ExpiredTime.HasValue &&
                            DateTime.Now.Subtract(token.Value.ExpiredTime.Value).TotalSeconds >= 0)
                        {
                            _removeList.Add(token.Key);
                        }
                    }
                    if (_removeList.Count > 0)
                    {
                        _removeList.ForEach(item => _tokens.Remove(item));
                    }
                    _removeList.Clear();
                }
            }, null, TimeSpan.Zero, TimeSpan.FromSeconds(1));
        }

        internal static ApiContext StartNewContext(Guid uid)
        {
            if (uid == Guid.Empty || uid == null)
            {
                throw new ArgumentNullException(nameof(uid));
            }
            ApiContext context = _tokens.Values.FirstOrDefault(cxt => cxt.Uid == uid);
            if (context != null)
            {
                //特殊账户不过期
                if (!context.ExpiredTime.HasValue)
                {
                    return context;
                }
                Guid exsit = Guid.Empty;
                foreach (Guid guid in _tokens.Keys)
                {
                    if (_tokens[guid].Uid == context.Uid)
                    {
                        exsit = guid;
                        break;
                        //_tokens[guid].ExpiredTime = DateTime.Now.AddMinutes(ExpiredMinutes);
                    }
                }
                _tokens.Remove(exsit);
            }
            Guid token = Guid.NewGuid();
            context = new ApiContext
            {
                Token = token,
                Uid = uid,
                ExpiredTime = DateTime.Now.AddMinutes(ExpiredMinutes)
            };
            _tokens.Add(token, context);
            return context;
        }

        internal static void RemoveContext()
        {
            string tokenStr = HttpContext.Current.Request.Headers[Headers.Token];
            if (string.IsNullOrEmpty(tokenStr))
            {
                throw new InvalidOperationException("Can not get session token.");
            }
            Guid token;
            if (!Guid.TryParse(tokenStr, out token))
            {
                throw new Exception("Can not get session token.");
            }
            if (_tokens.ContainsKey(token))
            {
                ApiContext context = _tokens[token];
                if (context.ExpiredTime.HasValue)
                {
                    _tokens.Remove(token);
                }
            }
        }

        internal static bool IsContextInvalid()
        {
            string tokenStr = HttpContext.Current.Request.Headers[Headers.Token];
            if (string.IsNullOrEmpty(tokenStr))
            {
                return true;
            }
            Guid token;
            if (Guid.TryParse(tokenStr, out token))
            {
                return !_tokens.ContainsKey(token);
            }
            return true;
        }

        internal static ApiContext GetCurrentContext()
        {
            string tokenStr = HttpContext.Current.Request.Headers[Headers.Token];
            if (!string.IsNullOrEmpty(tokenStr))
            {
                Guid token;
                if (Guid.TryParse(tokenStr, out token))
                {
                    if (_tokens.ContainsKey(token))
                    {
                        return _tokens[token];
                    }
                    return null;
                }
            }
            else
            {
                string strUid = HttpContext.Current.Request.Headers[Headers.UId];
                Guid uid;
                if (Guid.TryParse(strUid, out uid))
                {
                    return _tokens.Values.FirstOrDefault(p => p.Uid == uid);
                }
                return null;
            }
            throw new Exception("Can not get session token.");
        }

        private static void AddSpecialUser()
        {
            string strIds = ConfigurationManager.AppSettings["SpecialUserIds"];
            if (!string.IsNullOrWhiteSpace(strIds))
            {
                string[] ids = strIds.Split(',');
                foreach (string id in ids)
                {
                    Guid uid;
                    if (Guid.TryParse(id, out uid))
                    {
                        Guid token = Guid.NewGuid();
                        var context = new ApiContext
                        {
                            Token = token,
                            Uid = uid,
                            ExpiredTime = null
                        };
                        _tokens.Add(token, context);
                    }
                }
            }
        }
    }
}