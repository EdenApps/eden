import { useState } from "@eden/owl";
import { useService } from "@web/core/utils/hooks";

/**
 * @returns {import("@point_of_sale/app/store/pos_store").PosStore}
 */
export function usePos() {
    return useState(useService("pos"));
}
