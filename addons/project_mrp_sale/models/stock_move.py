# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import models


class StockMove(models.Model):
    _inherit = 'stock.move'

    def _prepare_procurement_values(self):
        res = super()._prepare_procurement_values()
        project = self.sale_line_id.order_id.project_id
        if project:
            res['project_id'] = project.id
        return res
