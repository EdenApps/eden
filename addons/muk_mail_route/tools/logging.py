import traceback

from markupsafe import Markup

from eden import api, SUPERUSER_ID
from eden.modules.registry import Registry


def post_exception_to_channel(dbname, error, message):
    with Registry(dbname).cursor() as cr:
        env = api.Environment(cr, SUPERUSER_ID, {})
        channel = env.ref(
            'muk_mail_route.channel_mail_monitoring', False
        )
        if channel:
            trace_text = ''.join(traceback.format_exception(
                error.__class__, error, error.__traceback__
            ))
            body = Markup(
                """
                    <p class="pb-1">{}<br/>{}</p>
                    <p>
                        <pre>{}</pre>
                    </p>
                """
            ).format(
                message, error, trace_text
            )
            channel.message_post(
                body=body, 
                message_type='comment',
                subtype_xmlid='mail.mt_comment'
            )
