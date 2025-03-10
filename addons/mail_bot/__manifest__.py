# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

{
    'name': 'EdenBot',
    'version': '1.2',
    'category': 'Productivity/Discuss',
    'summary': 'Add EdenBot in discussions',
    'website': 'https://www.edencloud.us/app/discuss',
    'depends': ['mail'],
    'auto_install': True,
    'installable': True,
    'data': [
        'views/res_users_views.xml',
        'data/mailbot_data.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'mail_bot/static/src/scss/edenbot_style.scss',
        ],
    },
    'license': 'LGPL-3',
}
