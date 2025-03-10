from eden import api, models, _
from eden.addons.muk_mail_route import tools


class MailThread(models.AbstractModel):

    _inherit = 'mail.thread'

    # ----------------------------------------------------------
    # Helper
    # ----------------------------------------------------------

    @api.model
    def _get_failed_route_container(self):
        model_ctx = self.env['muk_mail_route.container'].sudo().with_context(
            mail_create_nosubscribe=True, 
            mail_post_autofollow=False,
            mail_create_nolog=True, 
        )
        container = model_ctx.search([], limit=1)
        if not container:
            container = model_ctx.create({})
        elif container.message_follower_ids:
            container.message_follower_ids.unlink()
        return container
    
    @api.model
    def _get_failed_message_route(self, message, message_dict, custom_values):
        container = self._get_failed_route_container()
        user = self._mail_find_user_for_gateway(
            message_dict['email_from']
        )
        message_dict.pop('parent_id', None) 
        user_id = user.id if user else self.env.uid
        return self._routing_check_route(
            message, 
            message_dict,
            (container._name, container.id, custom_values, user_id, None),
            raise_exception=True
        )
        
    # ----------------------------------------------------------
    # Functions
    # ----------------------------------------------------------

    @api.model
    def message_process(self, *args, **kwargs):
        try:
            return super().message_process(*args, **kwargs)
        except Exception as exc:
            tools.logging.post_exception_to_channel(
                self.env.cr.dbname,
                exc,
                _('Mail Process Failed!')
            )
            raise

    @api.model
    def message_route(
        self, message, message_dict, model=None, thread_id=None, custom_values=None
    ):
        res = []
        try:
            res = super().message_route(
                message, 
                message_dict, 
                model=model, 
                thread_id=thread_id, 
                custom_values=custom_values
            )
        except ValueError:
            route = self._get_failed_message_route(
                message, message_dict, custom_values
            )
            return [route]
        else:
            if not res:
                route = self._get_failed_message_route(
                    message, message_dict, custom_values
                )
                res.append(route)
        return res
