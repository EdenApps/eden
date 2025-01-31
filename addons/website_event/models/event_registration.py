# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import fields, models


class EventRegistration(models.Model):
    _inherit = 'event.registration'

    visitor_id = fields.Many2one('website.visitor', string='Visitor', ondelete='set null')

    def _get_website_registration_allowed_fields(self):
        return {'name', 'phone', 'email', 'company_name', 'event_id', 'partner_id', 'event_ticket_id'}
