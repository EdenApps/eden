# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    invoice_policy = fields.Boolean(string="Invoice Policy", help="Timesheets taken when invoicing time spent")
