# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import models


class ResGroups(models.Model):
    _name = "res.groups"
    _inherit = ["res.groups", "bus.listener.mixin"]
