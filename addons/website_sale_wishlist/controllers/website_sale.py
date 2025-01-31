# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden.http import request

from eden.addons.website_sale.controllers import main


class WebsiteSaleWishlist(main.WebsiteSale):

    def _get_additional_shop_values(self, values):
        """ Hook to update values used for rendering website_sale.products template """
        vals = super()._get_additional_shop_values(values)
        vals['products_in_wishlist'] = request.env['product.wishlist'].current().product_id.product_tmpl_id
        return vals
