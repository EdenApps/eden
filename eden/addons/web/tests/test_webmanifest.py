# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden.addons.base.tests.common import HttpCaseWithUserDemo
from eden.tests.common import tagged


@tagged("-at_install", "post_install")
class WebManifestRoutesTest(HttpCaseWithUserDemo):
    """
    This test suite is used to request the routes used by the PWA backend implementation
    """

    def test_webmanifest(self):
        """
        This route returns a well formed backend's WebManifest
        """
        self.authenticate("admin", "admin")
        response = self.url_open("/web/manifest.webmanifest")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers["Content-Type"], "application/manifest+json")
        data = response.json()
        self.assertEqual(data["name"], "Eden")
        self.assertEqual(data["scope"], "/eden")
        self.assertEqual(data["start_url"], "/eden")
        self.assertEqual(data["display"], "standalone")
        self.assertEqual(data["background_color"], "#1C9300")
        self.assertEqual(data["theme_color"], "#1C9300")
        self.assertEqual(data["prefer_related_applications"], False)
        self.assertCountEqual(data["icons"], [
            {'src': '/web/static/img/eden-icon-192x192.png', 'sizes': '192x192', 'type': 'image/png'},
            {'src': '/web/static/img/eden-icon-512x512.png', 'sizes': '512x512', 'type': 'image/png'}
        ])
        self.assertGreaterEqual(len(data["shortcuts"]), 0)
        for shortcut in data["shortcuts"]:
            self.assertGreater(len(shortcut["name"]), 0)
            self.assertGreater(len(shortcut["description"]), 0)
            self.assertGreater(len(shortcut["icons"]), 0)
            self.assertTrue(shortcut["url"].startswith("/eden?menu_id="))

    def test_webmanifest_unauthenticated(self):
        """
        This route returns a well formed backend's WebManifest
        """
        response = self.url_open("/web/manifest.webmanifest")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers["Content-Type"], "application/manifest+json")
        data = response.json()
        self.assertEqual(data["name"], "Eden")
        self.assertEqual(data["scope"], "/eden")
        self.assertEqual(data["start_url"], "/eden")
        self.assertEqual(data["display"], "standalone")
        self.assertEqual(data["background_color"], "#1C9300")
        self.assertEqual(data["theme_color"], "#1C9300")
        self.assertEqual(data["prefer_related_applications"], False)
        self.assertCountEqual(data["icons"], [
            {'src': '/web/static/img/eden-icon-192x192.png', 'sizes': '192x192', 'type': 'image/png'},
            {'src': '/web/static/img/eden-icon-512x512.png', 'sizes': '512x512', 'type': 'image/png'}
        ])
        self.assertEqual(len(data["shortcuts"]), 0)

    def test_webmanifest_scoped(self):
        response = self.url_open("/web/manifest.scoped_app_manifest?app_id=test&path=/test&app_name=Test")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers["Content-Type"], "application/manifest+json")
        data = response.json()
        self.assertEqual(data["name"], "Test")
        self.assertEqual(data["scope"], "/test")
        self.assertEqual(data["start_url"], "/test")
        self.assertEqual(data["display"], "standalone")
        self.assertEqual(data["background_color"], "#1C9300")
        self.assertEqual(data["theme_color"], "#1C9300")
        self.assertEqual(data["prefer_related_applications"], False)
        self.assertCountEqual(data["icons"], [
            {'src': "/web/static/img/eden-icon-192x192.png", 'sizes': 'any', 'type': 'image/png'}
        ])
        self.assertEqual(len(data["shortcuts"]), 0)

    def test_serviceworker(self):
        """
        This route returns a JavaScript's ServiceWorker
        """
        response = self.url_open("/web/service-worker.js")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers["Content-Type"], "text/javascript")
        self.assertEqual(response.headers["Service-Worker-Allowed"], "/eden")

    def test_offline_url(self):
        """
        This route returns the offline page
        """
        response = self.url_open("/eden/offline")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers["Content-Type"], "text/html; charset=utf-8")

    def test_apple_touch_icon(self):
        """
        This request tests the presence of an apple-touch-icon image route for the PWA icon and
        its presence from the head of the document.
        """
        self.authenticate("demo", "demo")
        response = self.url_open("/web/static/img/eden-icon-ios.png")
        self.assertEqual(response.status_code, 200)

        document = self.url_open("/eden")
        self.assertIn(
            '<link rel="apple-touch-icon" href="/web/static/img/eden-icon-ios.png"/>', document.text,
            "Icon for iOS is present in the head of the document.",
        )
