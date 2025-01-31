/** @eden-module **/
// @ts-check

import { helpers } from "@eden/o-spreadsheet";

const { getFunctionsFromTokens } = helpers;

/**
 * @typedef {import("@eden/o-spreadsheet").Token} Token
 * @typedef  {import("@spreadsheet/helpers/eden_functions_helpers").EdenFunctionDescription} EdenFunctionDescription
 */

/**
 * @param {Token[]} tokens
 * @returns {number}
 */
export function getNumberOfAccountFormulas(tokens) {
    return getFunctionsFromTokens(tokens, ["EDEN.BALANCE", "EDEN.CREDIT", "EDEN.DEBIT", "EDEN.RESIDUAL", "EDEN.PARTNER.BALANCE"]).length;
}

/**
 * Get the first Account function description of the given formula.
 *
 * @param {Token[]} tokens
 * @returns {EdenFunctionDescription | undefined}
 */
export function getFirstAccountFunction(tokens) {
    return getFunctionsFromTokens(tokens, ["EDEN.BALANCE", "EDEN.CREDIT", "EDEN.DEBIT", "EDEN.RESIDUAL", "EDEN.PARTNER.BALANCE"])[0];
}
