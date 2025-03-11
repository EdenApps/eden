{
    'name': 'MuK Mail Routing', 
    'summary': 'Collects unrouted and failed emails',
    'description': '''
        This module collects mails that could not be routed 
        and allows them to be assigned subsequently.
    ''',
    'version': '18.0.1.0.0',
    'category': 'Productivity/Mail',
    'license': 'LGPL-3', 
    'author': 'MuK IT',
    'contributors': [
        'Mathias Markl <mathias.markl@mukit.at>',
    ],
    'depends': [
        'mail',
    ],
    'data': [
        'data/mail_channel.xml',
        'security/ir.model.access.csv',
        'views/mail_mail.xml',
        'views/mail_message.xml',
        'views/container.xml',
        'views/router.xml',
        'views/menu.xml',
    ],
    'images': [
        'static/description/banner.png',
    ],
    'installable': True,
    'application': False,
    'auto_install': True,
}
