# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import models
from eden.modules.loading import force_demo
from eden.addons.base.models.ir_module import assert_log_admin_access


class IrDemo(models.TransientModel):

    _name = 'ir.demo'
    _description = 'Demo'

    @assert_log_admin_access
    def install_demo(self):
        force_demo(self.env)
        return {
            'type': 'ir.actions.act_url',
            'target': 'self',
            'url': '/eden',
        }
