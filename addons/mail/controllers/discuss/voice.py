# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import http
from eden.http import request
from eden.tools import file_open


class VoiceController(http.Controller):

    @http.route("/discuss/voice/worklet_processor", methods=["GET"], type="http", auth="public", readonly=True)
    def voice_worklet_processor(self):
        return request.make_response(
            file_open("mail/static/src/discuss/voice_message/worklets/processor.js", "rb").read(),
            headers=[
                ("Content-Type", "application/javascript"),
            ],
        )
