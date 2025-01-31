# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import models, fields
from eden.tools.translate import _


class BarcodeRule(models.Model):
    _inherit = 'barcode.rule'

    type = fields.Selection(selection_add=[
        ('weight', 'Weighted Product'),
        ('price', 'Priced Product'),
        ('discount', 'Discounted Product'),
        ('client', 'Client'),
        ('cashier', 'Cashier')
    ], ondelete={
        'weight': 'set default',
        'price': 'set default',
        'discount': 'set default',
        'client': 'set default',
        'cashier': 'set default',
    })
