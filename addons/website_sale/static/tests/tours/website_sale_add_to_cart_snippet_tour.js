/** @eden-module **/

import { goToCart, assertCartContains } from '@website_sale/js/tours/tour_utils';
import { registerWebsitePreviewTour, clickOnEditAndWaitEditMode, clickOnSnippet, insertSnippet, selectElementInWeSelectWidget, clickOnSave, clickOnElement, assertPathName } from '@website/js/tours/tour_utils';


function editAddToCartSnippet() {
    return [
        ...clickOnEditAndWaitEditMode(),
        ...clickOnSnippet({id: 's_add_to_cart'})
    ]
}

registerWebsitePreviewTour('add_to_cart_snippet_tour', {
        url: '/',
        edition: true,
    },
    () => [
        ...insertSnippet({name: 'Add to Cart Button'}),

        // Basic product with no variants
        ...clickOnSnippet({id: 's_add_to_cart'}),
        ...selectElementInWeSelectWidget('product_template_picker_opt', 'Product No Variant', true),
        ...clickOnSave(),
        clickOnElement('add to cart button', ':iframe .s_add_to_cart_btn'),

        // Product with 2 variants with visitor choice (will open modal)
        ...editAddToCartSnippet(),
        ...selectElementInWeSelectWidget('product_template_picker_opt', 'Product Yes Variant 1', true),
        ...clickOnSave(),
        clickOnElement('add to cart button', ':iframe .s_add_to_cart_btn'),
        clickOnElement('continue shopping', ':iframe .modal button:contains(Continue Shopping)'),

        // Product with 2 variants with a variant selected
        ...editAddToCartSnippet(),
        ...selectElementInWeSelectWidget('product_template_picker_opt', 'Product Yes Variant 2', true),
        ...selectElementInWeSelectWidget('product_variant_picker_opt', 'Product Yes Variant 2 (Pink)'),
        ...clickOnSave(),
        clickOnElement('add to cart button', ':iframe .s_add_to_cart_btn'),

        // Basic product with no variants and action=buy now
        ...editAddToCartSnippet(),
        ...selectElementInWeSelectWidget('product_template_picker_opt', 'Product No Variant', true),
        ...selectElementInWeSelectWidget('action_picker_opt', 'Buy Now'),
        ...clickOnSave(),
        clickOnElement('add to cart button', ':iframe .s_add_to_cart_btn'),
        {
            // wait for the page to load, as the next check was sometimes too fast
            content: "Wait for the redirection to the payment page",
            trigger: ":iframe h3:contains(order overview)",
        },
        assertPathName('/shop/payment', ':iframe a[href="/shop/cart"]'),

        goToCart({quantity: 4, backend: true}),
        assertCartContains({productName: 'Product No Variant', backend: true}),
        assertCartContains({productName: 'Product Yes Variant 1 (Red)', backend: true}),
        assertCartContains({productName: 'Product Yes Variant 2 (Pink)', backend: true}),
    ],
);
