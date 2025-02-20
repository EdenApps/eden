# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import models


class BaseModuleUninstall(models.TransientModel):
    _inherit = "base.module.uninstall"

    def _modules_to_display(self, modules):
        return super()._modules_to_display(modules) | modules.filtered('imported')
