# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

import eden.tests

@eden.tests.tagged("post_install", "-at_install")
class TestEdenEditor(eden.tests.HttpCase):

    def test_eden_editor_suite(self):
        self.browser_js('/web_editor/tests', "", "", login='admin', timeout=1800)
