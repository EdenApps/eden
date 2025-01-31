# Part of Eden. See LICENSE file for full copyright and licensing details.
from eden.tests import HttpCase, tagged


@tagged("post_install", "-at_install")
class TestDiscussAction(HttpCase):
    def test_go_back_to_thread_from_breadcrumbs(self):
        self.start_tour(
            "/eden/discuss?active_id=mail.box_inbox",
            "discuss_go_back_to_thread_from_breadcrumbs.js",
            login="admin",
        )
