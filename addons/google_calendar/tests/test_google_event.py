# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.
from eden.tests.common import BaseCase
from eden.addons.google_calendar.utils.google_calendar import GoogleEvent


class TestGoogleEvent(BaseCase):
    def test_google_event_readonly(self):
        event = GoogleEvent()
        with self.assertRaises(TypeError):
            event._events['foo'] = 'bar'
        with self.assertRaises(AttributeError):
            event._events.update({'foo': 'bar'})
        with self.assertRaises(TypeError):
            dict.update(event._events, {'foo': 'bar'})
