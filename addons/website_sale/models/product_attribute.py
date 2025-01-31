# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import fields, models


class ProductAttribute(models.Model):
    _inherit = 'product.attribute'

    visibility = fields.Selection(
        selection=[('visible', "Visible"), ('hidden', "Hidden")],
        default='visible',
    )
