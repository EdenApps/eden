from eden import models


class ThemeBeauty(models.AbstractModel):
    _inherit = 'theme.utils'

    def _theme_beauty_post_copy(self, mod):
        self.enable_view('website.footer_custom')
