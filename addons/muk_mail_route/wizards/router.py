from eden import api, fields, models


class Router(models.TransientModel):

    _name = 'muk_mail_route.router'
    _description = 'Router'
    
    # ----------------------------------------------------------
    # Selection
    # ----------------------------------------------------------
    
    @api.model
    def _selection_reference(self):
        model_ids = self.env['ir.model'].sudo().search([
            ('access_ids.group_id.users', '=', self.env.uid),
            ('is_mail_thread', '=', True),
            ('transient', '=', False),
        ])
        return model_ids.mapped(lambda rec: (rec.model, rec.name))
    
    # ----------------------------------------------------------
    # Fields
    # ----------------------------------------------------------

    reference = fields.Reference(
        selection=lambda self: self._selection_reference(),
        string='Route Object',
        required=True,
    )
    
    notify = fields.Boolean(
        string='Notify Followers',
        default=True,
    )

    set_is_internal = fields.Boolean(
        string='Set Internal',
        default=False,
        help='If this option is set, all routed messages are set to internal.',
    )
    
    message_ids = fields.Many2many(
        comodel_name='mail.message',
        relation='mail_message_wizard_rel',
        column1='message_id',
        column2='wizard_id',
        string='Messages',
    )

    # ----------------------------------------------------------
    # Actions
    # ----------------------------------------------------------
    
    def action_route(self):
        self.ensure_one()
        self.message_ids.sudo().write({
            'model':  self.reference._name, 
            'res_id':  self.reference.id, 
            'record_name':  self.reference.display_name,
        })
        self.message_ids.sudo().mapped('attachment_ids').write({
            'res_model':  self.reference._name, 
            'res_id':  self.reference.id, 
        })
        if self.set_is_internal:
            self.message_ids.write({
                'is_internal':  True, 
            })
        if self.notify:
            for msg in self.message_ids:
                self.reference._notify_thread(msg)
