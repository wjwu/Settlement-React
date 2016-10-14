namespace SettlementApi.Api.Utility
{
    public class RegexUtility
    {
        public const string Email =
            "^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$";

        public const string Password =
            @"(?=^.{8,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;&quot;:;'?/&gt;.&lt;,]).*$";

        public const string Md5Password = "^[0-9a-zA-Z]{32}$";

        public const string Nickname = "^[a-zA-Z0-9]+$";

        public const string Guid =
            @"^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$";

        public const string Number = @"^\d+$";

        public const string SortType = @"^(desc|asc)$";

        public const string Phone =
            @"^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$";
    }
}