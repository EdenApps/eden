# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import api, fields, models


class ContractType(models.Model):
    _name = 'hr.contract.type'
    _description = 'Contract Type'
    _order = 'sequence'

    name = fields.Char(required=True, translate=True)
    code = fields.Char(compute='_compute_code', store=True, readonly=False)
    sequence = fields.Integer()
    country_id = fields.Many2one('res.country')

    @api.depends('name')
    def _compute_code(self):
        for contract_type in self:
            if contract_type.code:
                continue
            contract_type.code = contract_type.name
