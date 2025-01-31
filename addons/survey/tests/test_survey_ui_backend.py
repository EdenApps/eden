# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden.tests import HttpCase, tagged

@tagged('post_install', '-at_install')
class TestUi(HttpCase):

    def test_tour_test_survey_form_triggers(self):
        self.start_tour('/eden', 'survey_tour_test_survey_form_triggers', login='admin')
