# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

{
    'name': 'Mass mailing on attendees',
    'category': 'Hidden',
    'version': '1.0',
    'description':
        """
Mass mail event attendees
=========================

Bridge module adding UX requirements to ease mass mailing of event attendees.
        """,
    'depends': ['event', 'mass_mailing'],
    'data': [
        'views/event_views.xml'
    ],
    'auto_install': True,
    'license': 'LGPL-3',
}
