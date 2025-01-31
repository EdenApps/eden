# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import models


class Partner(models.Model):
    _inherit = 'res.partner'
    _mailing_enabled = True
