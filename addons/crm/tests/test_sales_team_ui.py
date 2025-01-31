# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import tests
from eden.tests import HttpCase
from eden.tests.common import users
from eden.addons.sales_team.tests.common import SalesTeamCommon


@tests.tagged('post_install', '-at_install')
class TestUi(HttpCase, SalesTeamCommon):

    @users('salesmanager')
    def test_crm_team_members_mono_company(self):
        """ Make sure you can create crm.team records with members in a mono-company scenario """
        self.sale_manager.sudo().groups_id -= self.env.ref("base.group_multi_company")
        self.env['ir.config_parameter'].sudo().set_param('sales_team.membership_multi', True)

        self.start_tour("/", "create_crm_team_tour", login="salesmanager")

        created_team = self.env["crm.team"].search([("name", "=", "My CRM Team")])
        self.assertTrue(bool(created_team))
        self.assertEqual(
            created_team.member_ids,
            self.sale_user | self.sale_manager
        )
