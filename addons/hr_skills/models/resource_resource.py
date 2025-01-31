# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.
from eden import fields, models


class Resource(models.Model):
    _inherit = ['resource.resource']

    employee_skill_ids = fields.One2many(related='employee_id.employee_skill_ids')
