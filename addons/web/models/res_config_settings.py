# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    web_app_name = fields.Char('Web App Name', config_parameter='web.web_app_name')
