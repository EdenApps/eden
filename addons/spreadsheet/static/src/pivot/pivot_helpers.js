// @ts-check

import { _t } from "@web/core/l10n/translation";
import { EvaluationError, helpers } from "@eden/o-spreadsheet";
import { sprintf } from "@web/core/utils/strings";

const { isDateOrDatetimeField } = helpers;

/**
 * @typedef {import("@eden/o-spreadsheet").Token} Token
 * @typedef {import("@eden/o-spreadsheet").Granularity} Granularity
 * */

export const pivotFormulaRegex = /^=.*PIVOT/;

const AGGREGATOR_NAMES = {
    count: _t("Count"),
    count_distinct: _t("Count Distinct"),
    bool_and: _t("Boolean And"),
    bool_or: _t("Boolean Or"),
    max: _t("Maximum"),
    min: _t("Minimum"),
    avg: _t("Average"),
    sum: _t("Sum"),
};

const NUMBER_AGGREGATORS = ["max", "min", "avg", "sum", "count_distinct", "count"];
const DATE_AGGREGATORS = ["max", "min", "count_distinct", "count"];

const AGGREGATORS_BY_FIELD_TYPE = {
    integer: NUMBER_AGGREGATORS,
    float: NUMBER_AGGREGATORS,
    monetary: NUMBER_AGGREGATORS,
    date: DATE_AGGREGATORS,
    datetime: DATE_AGGREGATORS,
    boolean: ["count_distinct", "count", "bool_and", "bool_or"],
    char: ["count_distinct", "count"],
    many2one: ["count_distinct", "count"],
    reference: ["count_distinct", "count"],
};

export const EDEN_AGGREGATORS = {};

for (const type in AGGREGATORS_BY_FIELD_TYPE) {
    EDEN_AGGREGATORS[type] = {};
    for (const aggregator of AGGREGATORS_BY_FIELD_TYPE[type]) {
        EDEN_AGGREGATORS[type][aggregator] = AGGREGATOR_NAMES[aggregator];
    }
}

//--------------------------------------------------------------------------
// Public
//--------------------------------------------------------------------------

/**
 * @typedef {import("@spreadsheet").EdenField} EdenField
 */

/**
 * Parses the positional char (#), the field and operator string of pivot group.
 * e.g. "create_date:month"
 * @param {Record<string, EdenField | undefined>} allFields
 * @param {string} groupFieldString
 * @returns {{field: EdenField, granularity: Granularity, isPositional: boolean, dimensionWithGranularity: string}}
 */
export function parseGroupField(allFields, groupFieldString) {
    let fieldName = groupFieldString;
    let granularity = undefined;
    const index = groupFieldString.indexOf(":");
    if (index !== -1) {
        fieldName = groupFieldString.slice(0, index);
        granularity = groupFieldString.slice(index + 1);
    }
    const isPositional = fieldName.startsWith("#");
    fieldName = isPositional ? fieldName.substring(1) : fieldName;
    const field = allFields[fieldName];
    if (field === undefined) {
        throw new EvaluationError(sprintf(_t("Field %s does not exist"), fieldName));
    }
    if (isDateOrDatetimeField(field)) {
        granularity = granularity || "month";
    }
    const dimensionWithGranularity = granularity ? `${fieldName}:${granularity}` : fieldName;
    return {
        isPositional,
        field,
        granularity,
        dimensionWithGranularity,
    };
}

export function domainHasNoRecordAtThisPosition(domain) {
    return domain.some((node) => node.value === "NO_RECORD_AT_THIS_POSITION");
}
