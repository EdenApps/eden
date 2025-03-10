# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import fields, models


class HrApplicant(models.Model):
    _inherit = 'hr.applicant'

    candidate_skill_ids = fields.One2many(related="candidate_id.candidate_skill_ids", readonly=False)
    skill_ids = fields.Many2many(related="candidate_id.skill_ids", readonly=False)
