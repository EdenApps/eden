# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import models


class CrmLead(models.Model):
    _inherit = 'crm.lead'
    _mailing_enabled = True
