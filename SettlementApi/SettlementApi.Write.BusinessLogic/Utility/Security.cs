using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace SettlementApi.Write.BusinessLogic.Utility
{
    public class Security
    {
        internal const string Key = "^%$*()@#";
        internal const string IV = "{:',./|;";

        public static string Md5Encrypt(string encryptString, Md5Bit bit = Md5Bit.Bit32)
        {
            if (string.IsNullOrEmpty(encryptString))
            {
                return string.Empty;
            }
            byte[] data = Encoding.UTF8.GetBytes(encryptString.ToCharArray());
            MD5 md5 = new MD5CryptoServiceProvider();
            string result = string.Empty;
            if (bit == Md5Bit.Bit16)
            {
                result = BitConverter.ToString(md5.ComputeHash(data), 4, 8);
            }
            else if (bit == Md5Bit.Bit32)
            {
                result = BitConverter.ToString(md5.ComputeHash(data));
            }
            result = result.Replace("-", "");
            return result;
        }

        public static string Encrypt(string data)
        {
            byte[] byKey = Encoding.ASCII.GetBytes(Key);
            byte[] byIV = Encoding.ASCII.GetBytes(IV);

            var cryptoProvider = new DESCryptoServiceProvider();
            var ms = new MemoryStream();
            var cst = new CryptoStream(ms, cryptoProvider.CreateEncryptor(byKey, byIV), CryptoStreamMode.Write);
            var sw = new StreamWriter(cst);
            sw.Write(data);
            sw.Flush();
            cst.FlushFinalBlock();
            sw.Flush();
            string result = Convert.ToBase64String(ms.GetBuffer(), 0, (int) ms.Length);
            ms.Close();
            cst.Close();
            sw.Close();
            return result;
        }

        public static string Decrypt(string data)
        {
            byte[] byKey = Encoding.ASCII.GetBytes(Key);
            byte[] byIV = Encoding.ASCII.GetBytes(IV);

            byte[] byEnc = Convert.FromBase64String(data);
            var cryptoProvider = new DESCryptoServiceProvider();
            var ms = new MemoryStream(byEnc);
            var cst = new CryptoStream(ms, cryptoProvider.CreateDecryptor(byKey, byIV), CryptoStreamMode.Read);
            var sr = new StreamReader(cst);
            string result = sr.ReadToEnd();
            ms.Close();
            cst.Close();
            sr.Close();
            return result;
        }
    }

    public enum Md5Bit
    {
        Bit16 = 16,
        Bit32 = 32
    }
}