import eden.tests
from eden.tools import mute_logger


@eden.tests.common.tagged('post_install', '-at_install')
class TestWebsiteError(eden.tests.HttpCase):

    @mute_logger('eden.addons.http_routing.models.ir_http', 'eden.http')
    def test_01_run_test(self):
        self.start_tour("/test_error_view", 'test_error_website')
