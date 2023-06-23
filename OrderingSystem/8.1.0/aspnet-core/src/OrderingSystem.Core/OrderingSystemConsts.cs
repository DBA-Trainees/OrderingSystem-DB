using OrderingSystem.Debugging;

namespace OrderingSystem
{
    public class OrderingSystemConsts
    {
        public const string LocalizationSourceName = "OrderingSystem";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "5d01cf21fc62453789717d77d5c63d3c";
    }
}
