# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

RELEASE_LEVELS = [ALPHA, BETA, RELEASE_CANDIDATE, FINAL] = ['alpha', 'beta', 'candidate', 'final']
RELEASE_LEVELS_DISPLAY = {ALPHA: ALPHA,
                          BETA: BETA,
                          RELEASE_CANDIDATE: 'rc',
                          FINAL: ''}

# version_info format: (MAJOR, MINOR, MICRO, RELEASE_LEVEL, SERIAL)
# inspired by Python's own sys.version_info, in order to be
# properly comparable using normal operators, for example:
#  (6,1,0,'beta',0) < (6,1,0,'candidate',1) < (6,1,0,'candidate',2)
#  (6,1,0,'candidate',2) < (6,1,0,'final',0) < (6,1,2,'final',0)
version_info = (18, 0, 0, FINAL, 0, '')
version = '.'.join(str(s) for s in version_info[:2]) + RELEASE_LEVELS_DISPLAY[version_info[3]] + str(version_info[4] or '') + version_info[5]
series = serie = major_version = '.'.join(str(s) for s in version_info[:2])

product_name = 'Eden'
description = 'Eden App Platform'
long_desc = '''Eden is a complete Application Development Platform. 
The platform is designed to be a complete solution for building, deploying, and managing data-driven
applications and services. Eden includes a robust ORM built ontop of PostgreSQL. It has a built in UI for
user and administrative functions, and supports EdenUI for custom UI components. Originally forked from Odoo.
'''
classifiers = """Development Status :: 5 - Production/Stable
License :: OSI Approved :: GNU Lesser General Public License v3

Programming Language :: Python
"""
url = 'https://www.dpcco.me'
author = 'Don\'t Panic Consulting.'
author_email = 'info@dpcco.me'
license = 'LGPL-3'

nt_service_name = "eden-server-" + series.replace('~','-')
