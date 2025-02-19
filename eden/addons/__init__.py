# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

""" Addons module.

This module serves to contain all Eden addons, across all configured addons
paths. For the code to manage those addons, see eden.modules.

Addons are made available under `eden.addons` after
eden.tools.config.parse_config() is called (so that the addons paths are
known).

This module also conveniently reexports some symbols from eden.modules.
Importing them from here is deprecated.

"""
# make eden.addons a namespace package, while keeping this __init__.py
# present, for python 2 compatibility
# https://packaging.python.org/guides/packaging-namespace-packages/
import pkgutil
import os.path
__path__ = [
    os.path.abspath(path)
    for path in pkgutil.extend_path(__path__, __name__)
]
