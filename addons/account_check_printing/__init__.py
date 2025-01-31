# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.
from . import models
from . import wizard


def create_check_sequence_on_bank_journals(env):
    env['account.journal'].search([('type', '=', 'bank')])._create_check_sequence()
