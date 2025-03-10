# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import _
from eden.exceptions import ValidationError
from eden.tools import float_compare

from eden.addons.website_sale.controllers import payment


class PaymentPortal(payment.PaymentPortal):

    def _validate_transaction_for_order(self, transaction, sale_order):
        """Update programs & rewards before finalizing transaction.

        :param payment.transaction transaction: The payment transaction
        :param int order_id: The id of the sale order to pay
        :raise: ValidationError if the order amount changed after updating rewards
        """
        super()._validate_transaction_for_order(transaction, sale_order)
        if sale_order.exists():
            initial_amount = sale_order.amount_total
            sale_order._update_programs_and_rewards()
            rounding = sale_order.currency_id.rounding
            if float_compare(
                sale_order.amount_total, initial_amount, precision_rounding=rounding
            ) != 0:
                raise ValidationError(
                    _("Cannot process payment: applied reward was changed or has expired.")
                )
