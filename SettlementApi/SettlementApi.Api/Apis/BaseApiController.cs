using System.Web.Http;
using System.Web.Http.Cors;
using SettlementApi.Api.ApiExtended;

namespace SettlementApi.Api.Apis
{
    [ValidatorActionFilter]
    [ApiExceptionFilter]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BaseApiController : ApiController
    {
    }
}