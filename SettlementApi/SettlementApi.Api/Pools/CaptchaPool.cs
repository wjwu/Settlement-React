using System;
using System.Collections.Generic;
using System.Threading;

namespace SettlementApi.Api.Pools
{
    internal class CaptchaContext
    {
        public string Captcha { get; set; }
        public DateTime ExpiredTime { get; set; }
    }

    public class CaptchaPool
    {
        private const int ExpiredMinutes = 5;
        private static Dictionary<string, CaptchaContext> _captchas;
        private static List<string> _removeList;
        private static Timer _timer;
        private static bool IsStart { get; set; }

        public static void Start()
        {
            if (IsStart)
            {
                return;
            }
            IsStart = true;
            _captchas = new Dictionary<string, CaptchaContext>();
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

        public static void Add(string key, string strCaptcha)
        {
            if (_captchas.ContainsKey(key))
            {
                _captchas[key].Captcha = strCaptcha;
            }
            else
            {
                _captchas.Add(key, new CaptchaContext
                {
                    Captcha = strCaptcha,
                    ExpiredTime = DateTime.Now.AddMinutes(ExpiredMinutes)
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