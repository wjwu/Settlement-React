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
    internal class SheetRes {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal SheetRes() {
        }
        
        /// <summary>
        ///   返回此类使用的缓存的 ResourceManager 实例。
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("SettlementApi.Write.BusinessLogic.Resource.SheetRes", typeof(SheetRes).Assembly);
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
        ///   查找类似 [{0}] 审核打回了结算表。 的本地化字符串。
        /// </summary>
        internal static string AuditSheetFail {
            get {
                return ResourceManager.GetString("AuditSheetFail", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 [{0}] 审核通过了结算表。 的本地化字符串。
        /// </summary>
        internal static string AuditSheetPass {
            get {
                return ResourceManager.GetString("AuditSheetPass", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 [{0}] 创建结算表。 的本地化字符串。
        /// </summary>
        internal static string CreateSheet {
            get {
                return ResourceManager.GetString("CreateSheet", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 结算表已保存，请勿重复添加。 的本地化字符串。
        /// </summary>
        internal static string SheetRepeat {
            get {
                return ResourceManager.GetString("SheetRepeat", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 [{0}] 提交了结算表。 的本地化字符串。
        /// </summary>
        internal static string SubmitSheet {
            get {
                return ResourceManager.GetString("SubmitSheet", resourceCulture);
            }
        }
        
        /// <summary>
        ///   查找类似 [{0}] 修改了结算表。 的本地化字符串。
        /// </summary>
        internal static string UpdateSheet {
            get {
                return ResourceManager.GetString("UpdateSheet", resourceCulture);
            }
        }
    }
}
