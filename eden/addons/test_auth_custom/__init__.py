from eden import models
from eden.exceptions import AccessDenied
from eden.http import Controller, route


class IrHttp(models.AbstractModel):
    _inherit = 'ir.http'

    @classmethod
    def _auth_method_thing(cls):
        raise AccessDenied()

class TestController(Controller):
    # for HTTP endpoints, must allow OPTIONS or werkzeug won't match the route
    # when dispatching the CORS preflight
    @route('/test_auth_custom/http', type="http", auth="thing", cors="*", methods=['GET', 'OPTIONS'])
    def _http(self):
        raise NotImplementedError

    @route('/test_auth_custom/json', type="json", auth="thing", cors="*")
    def _json(self):
        raise NotImplementedError
