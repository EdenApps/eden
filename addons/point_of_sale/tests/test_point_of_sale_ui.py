# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden.tests import HttpCase, tagged
from eden import tools


@tagged('post_install', '-at_install')
class TestUi(HttpCase):

	# Avoid "A Chart of Accounts is not yet installed in your current company."
	# Everything is set up correctly even without installed CoA
    @tools.mute_logger('eden.http')
    def test_01_point_of_sale_tour(self):

        self.start_tour("/eden", 'point_of_sale_tour', login="admin")
