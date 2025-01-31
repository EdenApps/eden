# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import fields, models


class AccountAnalyticApplicability(models.Model):
    _inherit = 'account.analytic.applicability'
    _description = "Analytic Plan's Applicabilities"

    business_domain = fields.Selection(
        selection_add=[
            ('stock_picking', 'Stock Picking'),
        ],
        ondelete={'stock_picking': 'cascade'},
    )
