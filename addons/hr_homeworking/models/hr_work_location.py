# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import _, api, models
from eden.exceptions import UserError
from eden.addons.hr_homeworking.models.hr_homeworking import DAYS

class WorkLocation(models.Model):
    _inherit = "hr.work.location"

    @api.ondelete(at_uninstall=False)
    def _unlink_except_used_by_employee(self):
        domains = [(day, 'in', self.ids) for day in DAYS]
        employee_uses_location = self.env['hr.employee'].search_count(domains, limit=1)
        if employee_uses_location:
            raise UserError(_("You cannot delete locations that are being used by your employees"))
        exceptions_using_location = self.env['hr.employee.location'].search([('work_location_id', 'in', self.ids)])
        exceptions_using_location.unlink()
