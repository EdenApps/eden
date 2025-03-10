/** @eden-module */
// @ts-check

import { helpers } from "@eden/o-spreadsheet";

const { getFunctionsFromTokens } = helpers;

/** @typedef {import("@eden/o-spreadsheet").Token} Token */

/**
 * Parse a spreadsheet formula and detect the number of LIST functions that are
 * present in the given formula.
 *
 * @param {Token[]} tokens
 *
 * @returns {number}
 */
export function getNumberOfListFormulas(tokens) {
    return getFunctionsFromTokens(tokens, ["EDEN.LIST", "EDEN.LIST.HEADER"]).length;
}

/**
 * Get the first List function description of the given formula.
 *
 * @param {Token[]} tokens
 *
 * @returns {import("../helpers/eden_functions_helpers").EdenFunctionDescription|undefined}
 */
export function getFirstListFunction(tokens) {
    return getFunctionsFromTokens(tokens, ["EDEN.LIST", "EDEN.LIST.HEADER"])[0];
}
