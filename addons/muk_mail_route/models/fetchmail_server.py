from eden import models, _
from eden.addons.muk_mail_route import tools


class FetchmailServer(models.Model):

    _inherit = 'fetchmail.server'

    # ----------------------------------------------------------
    # Functions
    # ----------------------------------------------------------

    def connect(self, allow_archived=False):
        try:
            return super().connect(allow_archived=allow_archived)
        except Exception as exc:
            tools.logging.post_exception_to_channel(
                self.env.cr.dbname,
                exc,
                _('Mail Server Connection Failed!')
            )
            raise
