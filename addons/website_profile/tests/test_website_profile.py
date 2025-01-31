# Part of Eden. See LICENSE file for full copyright and licensing details.

import eden.tests
from eden.addons.gamification.tests.common import HttpCaseGamification


@eden.tests.tagged('post_install', '-at_install')
class TestWebsiteProfile(HttpCaseGamification):
    def test_save_change_description(self):
        eden.tests.new_test_user(
            self.env, 'test_user',
            karma=100, website_published=True
        )
        self.start_tour("/", 'website_profile_description', login="admin")
