from eden import _, api, fields, models


class MailMessage(models.Model):
    
    _inherit = 'mail.message'

    # ----------------------------------------------------------
    # Action
    # ----------------------------------------------------------
    
    def action_route_message(self):
        return {
            'name': _('Route Message'),
            'res_model': 'muk_mail_route.router',
            'type': 'ir.actions.act_window',
            'view_type': 'form',
            'view_mode': 'form',
            'target': 'new',
            'context': {
                'default_message_ids': [fields.Command.set(self.ids)],
            },
        }
