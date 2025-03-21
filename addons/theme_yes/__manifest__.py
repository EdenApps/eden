{
    'name': 'Yes Theme',
    'description': 'Yes Theme - Wedding',
    'category': 'Theme/Personal',
    'summary': 'Wedding, Love, Photography, Services',
    'sequence': 330,
    'version': '2.0.0',
    'depends': ['theme_common'],
    'data': [
        'data/generate_primary_template.xml',
        'data/ir_asset.xml',
        'views/images.xml',

        'views/snippets/s_cta_box.xml',
        'views/snippets/s_banner.xml',
        'views/snippets/s_striped_top.xml',
        'views/snippets/s_call_to_action.xml',
        'views/snippets/s_cards_grid.xml',
        'views/snippets/s_sidegrid.xml',
        'views/snippets/s_carousel.xml',
        'views/snippets/s_carousel_intro.xml',
        'views/snippets/s_company_team.xml',
        'views/snippets/s_company_team_detail.xml',
        'views/snippets/s_company_team_basic.xml',
        'views/snippets/s_cover.xml',
        'views/snippets/s_card_offset.xml',
        'views/snippets/s_image_text.xml',
        'views/snippets/s_image_title.xml',
        'views/snippets/s_images_mosaic.xml',
        'views/snippets/s_image_gallery.xml',
        'views/snippets/s_images_wall.xml',
        'views/snippets/s_image_punchy.xml',
        'views/snippets/s_masonry_block.xml',
        'views/snippets/s_framed_intro.xml',
        'views/snippets/s_media_list.xml',
        'views/snippets/s_picture.xml',
        'views/snippets/s_popup.xml',
        'views/snippets/s_freegrid.xml',
        'views/snippets/s_features_wall.xml',
        'views/snippets/s_quotes_carousel.xml',
        'views/snippets/s_quotes_carousel_minimal.xml',
        'views/snippets/s_text_image.xml',
        'views/snippets/s_three_columns.xml',
        'views/snippets/s_title.xml',
        'views/snippets/s_quadrant.xml',
        'views/snippets/s_unveil.xml',
        'views/snippets/s_key_benefits.xml',
        'views/snippets/s_pricelist_boxed.xml',
        'views/snippets/s_image_hexagonal.xml',
        'views/snippets/s_striped_center_top.xml',
        'views/snippets/s_key_images.xml',
        'views/snippets/s_kickoff.xml',
        'views/snippets/s_intro_pill.xml',
        'views/snippets/s_big_number.xml',
        'views/snippets/s_image_frame.xml',
        'views/snippets/s_shape_image.xml',
        'views/snippets/s_text_cover.xml',
        'views/snippets/s_empowerment.xml',
        'views/snippets/s_image_text_overlap.xml',
        'views/snippets/s_features.xml',
        'views/new_page_template.xml',
    ],
    'images': [
        'static/description/yes_description.png',
        'static/description/yes_screenshot.jpg',
    ],
    'images_preview_theme': {
        'website.s_cover_default_image': '/theme_yes/static/src/img/snippets/s_cover.jpg',
        'website.s_media_list_default_image_1': '/theme_yes/static/src/img/snippets/s_media_list_1.jpg',
        'website.s_media_list_default_image_2': '/theme_yes/static/src/img/snippets/s_media_list_2.jpg',
        'website.s_media_list_default_image_3': '/theme_yes/static/src/img/snippets/s_media_list_3.jpg',
        'website.s_quotes_carousel_demo_image_0': '/theme_yes/static/src/img/snippets/s_quotes_carousel_1.jpg',
        'website.s_cover_default_image': '/theme_yes/static/src/img/snippets/s_cover.jpg',
        'website.s_picture_default_image': '/theme_yes/static/src/img/snippets/s_cover.jpg',
        'website.library_image_10': '/theme_yes/static/src/img/snippets/library_image_10.webp',
        'website.library_image_05': '/theme_yes/static/src/img/snippets/library_image_05.webp',
        'website.library_image_08': '/theme_yes/static/src/img/snippets/library_image_08.jpg',
        'website.library_image_13': '/theme_yes/static/src/img/snippets/library_image_13.webp',
        'website.library_image_03': '/theme_yes/static/src/img/snippets/library_image_03.jpg',
        'website.library_image_02': '/theme_yes/static/src/img/snippets/library_image_02.jpg',
        'website.library_image_14': '/theme_yes/static/src/img/snippets/library_image_14.webp',
        'website.library_image_16': '/theme_yes/static/src/img/snippets/library_image_16.webp',
        'website.s_parallax_default_image': '/theme_yes/static/src/img/snippets/s_parallax.webp',
    },
    'configurator_snippets': {
        'homepage': ['s_kickoff', 's_title', 's_company_team', 's_image_text_overlap', 's_features', 's_freegrid', 's_quotes_carousel', 's_call_to_action'],
    },
    'new_page_templates': {
        'about': {
            'personal': ['s_text_cover', 's_image_text', 's_text_block_h2', 's_numbers', 's_features', 's_call_to_action'],
        },
    },
    'license': 'LGPL-3',
    'live_test_url': 'https://theme-yes.eden.com',
    'assets': {
        'website.assets_editor': [
            'theme_yes/static/src/js/tour.js',
        ],
    }
}
