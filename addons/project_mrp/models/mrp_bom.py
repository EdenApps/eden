# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import fields, models


class MrpBom(models.Model):
    _inherit = 'mrp.bom'

    project_id = fields.Many2one('project.project')
