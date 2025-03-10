# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

import eden.tests
from eden.tools import mute_logger


@eden.tests.common.tagged('post_install', '-at_install')
class TestCustomSnippet(eden.tests.HttpCase):

    @mute_logger('eden.addons.http_routing.models.ir_http', 'eden.http')
    def test_01_run_tour(self):
        self.start_tour(self.env['website'].get_client_action_url('/'), 'test_custom_snippet', login="admin")
