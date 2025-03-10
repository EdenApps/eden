from eden import fields, models, _


class Container(models.Model):

    _name = 'muk_mail_route.container'
    _inherit = [
        'mail.activity.mixin', 
        'mail.thread'
    ]
    _description = 'Message Container'
    
    # ----------------------------------------------------------
    # Functions
    # ----------------------------------------------------------

    def message_post(self, *args, **kwargs):
        return super(
            Container,
            self.with_context(
                mail_create_nosubscribe=True, 
                mail_post_autofollow=False
            )
        ).message_post(
            *args, **kwargs
        )
    
    # ----------------------------------------------------------
    # Compute
    # ----------------------------------------------------------

    def _compute_display_name(self):
        self.display_name = _('Message Container')
