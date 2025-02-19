# -*- coding: utf-8 -*-

import logging

import eden.release
import eden.tools
from eden.exceptions import AccessDenied
from eden.modules.registry import Registry
from eden.tools.translate import _

_logger = logging.getLogger(__name__)

RPC_VERSION_1 = {
        'server_version': eden.release.version,
        'server_version_info': eden.release.version_info,
        'server_serie': eden.release.serie,
        'protocol_version': 1,
}

def exp_login(db, login, password):
    return exp_authenticate(db, login, password, None)

def exp_authenticate(db, login, password, user_agent_env):
    if not user_agent_env:
        user_agent_env = {}
    res_users = Registry(db)['res.users']
    try:
        credential = {'login': login, 'password': password, 'type': 'password'}
        return res_users.authenticate(db, credential, {**user_agent_env, 'interactive': False})['uid']
    except AccessDenied:
        return False

def exp_version():
    return RPC_VERSION_1

def exp_about(extended=False):
    """Return information about the OpenERP Server.

    @param extended: if True then return version info
    @return string if extended is False else tuple
    """

    info = _('See http://openerp.com')

    if extended:
        return info, eden.release.version
    return info

def exp_set_loglevel(loglevel, logger=None):
    # TODO Previously, the level was set on the now deprecated
    # `eden.netsvc.Logger` class.
    return True

def dispatch(method, params):
    g = globals()
    exp_method_name = 'exp_' + method
    if exp_method_name in g:
        return g[exp_method_name](*params)
    else:
        raise Exception("Method not found: %s" % method)
