# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

{
    'name': 'Website Events CRM',
    'version': '1.0',
    'category': 'Website/Website',
    
    'description': "Allow per-order lead creation mode",
    'depends': ['event_crm', 'website_event'],
    'data': [
        'views/event_lead_rule_views.xml',
    ],
    'demo': [
        'data/event_crm_demo.xml',
    ],
    'installable': True,
    'auto_install': True,
    'license': 'LGPL-3',
}
