# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import api, models


class EventQuestionAnswer(models.Model):
    _name = 'event.question.answer'
    _inherit = ['event.question.answer', 'pos.load.mixin']

    @api.model
    def _load_pos_data_fields(self, config_id):
        return ['question_id', 'name', 'sequence']

    @api.model
    def _load_pos_data_domain(self, data):
        return [('question_id', 'in', [quest['id'] for quest in data['event.question']['data']])]
