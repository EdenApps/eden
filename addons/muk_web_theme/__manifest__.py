{
    'name': 'MuK Backend Theme', 
    'summary': 'Eden Community Backend Theme',
    'description': '''
        This module offers a mobile compatible design for Eden Community. 
        Furthermore it allows the user to define some design preferences.
    ''',
    'version': '18.0.1.2.4',
    'category': 'Themes/Backend', 
    'license': 'LGPL-3', 
    'author': 'MuK IT',
    'contributors': [
        'Mathias Markl <mathias.markl@mukit.at>',
    ],
    'depends': [
        'muk_web_chatter',
        'muk_web_dialog',
        'muk_web_appsbar',
        'muk_web_colors',
    ],
    'excludes': [
        'web_enterprise',
    ],
    'data': [
        'templates/web_layout.xml',
        'views/res_config_settings.xml',
    ],
    'assets': {
        'web._assets_primary_variables': [
            (
                'after', 
                'web/static/src/scss/primary_variables.scss', 
                'muk_web_theme/static/src/scss/colors.scss'
            ),
            (
                'after', 
                'web/static/src/scss/primary_variables.scss', 
                'muk_web_theme/static/src/scss/variables.scss'
            ),
        ],
        'web.assets_backend': [
            'muk_web_theme/static/src/webclient/**/*.xml',
            'muk_web_theme/static/src/webclient/**/*.scss',
            'muk_web_theme/static/src/webclient/**/*.js',
            'muk_web_theme/static/src/views/**/*.scss',
        ],
    },
    'images': [
        'static/description/banner.png',
        'static/description/theme_screenshot.png'
    ],
    'installable': True,
    'application': False,
    'auto_install': True,
    'post_init_hook': '_setup_module',
    'uninstall_hook': '_uninstall_cleanup',
}
