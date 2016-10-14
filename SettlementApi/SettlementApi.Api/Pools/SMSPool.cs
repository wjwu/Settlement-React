using System;
using System.Collections.Generic;
using System.Configuration;
using System.Threading;

namespace SettlementApi.Api.Pools
{
    internal class SMSContext
    {
        public string Captcha { get; set; }
        public string Phone { get; set; }
        public DateTime ExpiredTime { get; set; }
    }

    public class SMSPool
    {
        private static int _expiredMinutes;
        private static Dictionary<string, SMSContext> _captchas;
        private static List<string> _removeList;
        private static Timer _timer;
        private static bool IsStart { get; set; }

        public static void Start()
        {
            _expiredMinutes = int.Parse(ConfigurationManager.AppSettings["SMS_ExpiredMinute"]);
            if (IsStart)
            {
                return;
            }
            IsStart = true;
            _captchas = new Dictionary<string, SMSContext>();
            _removeList = new List<string>();
            var obj = new object();
            _timer = new Timer(state =>
            {
                lock (obj)
                {
                    foreach (var captcha in _captchas)
                    {
                        if (DateTime.Now.Subtract(captcha.Value.ExpiredTime).TotalSeconds >= 0)
                        {
                            _removeList.Add(captcha.Key);
                        }
                    }
                    if (_removeList.Count > 0)
                    {
                        _removeList.ForEach(item => _captchas.Remove(item));
                    }
                    _removeList.Clear();
                }
            }, null, TimeSpan.Zero, TimeSpan.FromSeconds(1));
        }

        public static bool Exists(string phone)
        {
            bool exists = false;
            if (_captchas != null && _captchas.Count > 0)
            {
                foreach (var captcha in _captchas)
                {
                    if (captcha.Value.Phone.Equals(phone))
                    {
                        exists = true;
                        break;
                    }
                }
            }
            return exists;
        }

        public static void Add(string key, string strCaptcha, string phone)
        {
            if (_captchas.ContainsKey(key))
            {
                _captchas[key].Captcha = strCaptcha;
            }
            else
            {
                _captchas.Add(key, new SMSContext
                {
                    Captcha = strCaptcha,
                    Phone = phone,
                    ExpiredTime = DateTime.Now.AddMinutes(_expiredMinutes)
                });
            }
        }

        public static string Get(string key)
        {
            if (_captchas.ContainsKey(key))
            {
                return _captchas[key].Captcha;
            }
            return string.Empty;
        }
    }
}