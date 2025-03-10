# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import api, models


class ProjectTaskRecurrence(models.Model):
    _inherit = 'project.task.recurrence'

    @api.model
    def _get_recurring_fields_to_copy(self):
        return super()._get_recurring_fields_to_copy() + ['sale_line_id']
