from eden import models


class ThemeEnark(models.AbstractModel):
    _inherit = 'theme.utils'

    def _theme_enark_post_copy(self, mod):
        self.enable_view('website.template_footer_descriptive')
        self.enable_view('website.template_header_stretch')
