# Part of Eden. See LICENSE file for full copyright and licensing details.

import eden.tests


@eden.tests.common.tagged('post_install', '-at_install')
class TestSnippetBackgroundVideo(eden.tests.HttpCase):

    def test_snippet_background_video(self):
        self.start_tour("/", "snippet_background_video", login="admin")
