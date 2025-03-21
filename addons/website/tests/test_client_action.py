# Part of Eden. See LICENSE file for full copyright and licensing details.

import eden.tests


@eden.tests.common.tagged('post_install', '-at_install')
class TestClientAction(eden.tests.HttpCase):

    def test_01_client_action_redirect(self):
        page = self.env['website.page'].create({
            'name': 'Base',
            'type': 'qweb',
            'arch': """
                <t t-call="website.layout">
                    <a id="test_contact_BE" href="/@/contactus?enable_editor=1">Contact</a>
                    <a id="test_contact_FE" href="/contactus?enable_editor=1">Contact</a>
                </t>
            """,
            'key': 'website.test_client_action_redirect',
            'url': '/test_client_action_redirect',
            'is_published': True,
        })
        self.start_tour(page.url, 'client_action_redirect', login='admin')

    def test_02_client_action_iframe_fallback(self):
        self.start_tour('/@/', 'client_action_iframe_fallback', login='admin')
