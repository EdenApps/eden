# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import fields, models


class AccountPayment(models.Model):
    _inherit = 'account.payment'

    is_donation = fields.Boolean(string="Is Donation", related="payment_transaction_id.is_donation")
