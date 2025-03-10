# -*- coding: utf-8 -*-
{
    'name': "EdenBot - HR",
    'summary': """Bridge module between hr and mailbot.""",
    'description': """This module adds the EdenBot state and notifications in the user form modified by hr.""",
    'website': "https://www.edencloud.us/app/discuss",
    'category': 'Productivity/Discuss',
    'version': '1.0',
    'depends': ['mail_bot', 'hr'],
    'installable': True,
    'auto_install': True,
    'data': [
        'views/res_users_views.xml',
    ],
    'license': 'LGPL-3',
}
