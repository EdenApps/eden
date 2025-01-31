# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import models


class SaleOrder(models.Model):
    _inherit = 'sale.order'
    _mailing_enabled = True

    def _mailing_get_default_domain(self, mailing):
        """ Exclude by default canceled orders when performing a mass mailing. """
        return [('state', '!=', 'cancel')]
