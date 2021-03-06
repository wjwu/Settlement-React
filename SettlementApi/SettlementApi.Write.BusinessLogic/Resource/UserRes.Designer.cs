﻿//------------------------------------------------------------------------------
// <auto-generated>
//     此代码由工具生成。
//     运行时版本:4.0.30319.42000
//
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
//------------------------------------------------------------------------------

namespace SettlementApi.Write.BusinessLogic.Resource {
    using System;
    
    
    /// <summary>
    ///   一个强类型的资源类，用于查找本地化的字符串等。
    /// </summary>
    // 此类是由 StronglyTypedResourceBuilder
    // 类通过类似于 ResGen 或 Visual Studio 的工具自动生成的。
    // 若要添加或移除成员，请编辑 .ResX 文件，然后重新运行 ResGen
    // (以 /str 作为命令选项)，或重新生成 VS 项目。
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "4.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    internal class UserRes {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal UserRes() {
        }
        
        /// <summary>
        ///   返回此类使用的缓存的 ResourceManager 实例。
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("SettlementApi.Write.BusinessLogic.Resource.UserRes", typeof(UserRes).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   使用此强类型资源类，为所有资源查找
        ///   重写当前线程的 CurrentUICulture 属性。
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   查找类似 用户名或密码不正确！ 的本地化字符串。
        /// </summary>
        internal static string LoginFail {
            get {
                return ResourceManager.GetString("LoginFail", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似  登录失败，当前用户已被禁用！ 的本地化字符串。
        /// </summary>
        internal static string LoginFailDisabled {
            get {
                return ResourceManager.GetString("LoginFailDisabled", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 账号名已被存在！ 的本地化字符串。
        /// </summary>
        internal static string LoginIDExists {
            get {
                return ResourceManager.GetString("LoginIDExists", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 原始密码不正确！ 的本地化字符串。
        /// </summary>
        internal static string OldPasswordError {
            get {
                return ResourceManager.GetString("OldPasswordError", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 手机码号已被注册！ 的本地化字符串。
        /// </summary>
        internal static string PhoneExists {
            get {
                return ResourceManager.GetString("PhoneExists", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 手机号码或密码不正确！ 的本地化字符串。
        /// </summary>
        internal static string PublicLoginFail {
            get {
                return ResourceManager.GetString("PublicLoginFail", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 用户不存在！ 的本地化字符串。
        /// </summary>
        internal static string UserNotExists {
            get {
                return ResourceManager.GetString("UserNotExists", resourceCulture);
            }
        }
    }
}
