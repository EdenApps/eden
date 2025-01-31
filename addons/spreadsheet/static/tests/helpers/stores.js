// @ts-check

import { stores } from "@eden/o-spreadsheet";
import { createModelWithDataSource } from "@spreadsheet/../tests/helpers/model";

const { ModelStore, NotificationStore, DependencyContainer } = stores;

/**
 * @template T
 * @typedef {import("@eden/o-spreadsheet").StoreConstructor<T>} StoreConstructor<T>
 */

/**
 * @typedef {import("@spreadsheet").EdenSpreadsheetModel} EdenSpreadsheetModel
 */

/**
 * @template T
 * @param {StoreConstructor<T>} Store
 * @param  {any[]} args
 * @return {Promise<{ store: T, container: InstanceType<DependencyContainer>, model: EdenSpreadsheetModel }>}
 */
export async function makeStore(Store, ...args) {
    const model = await createModelWithDataSource();
    return makeStoreWithModel(model, Store, ...args);
}

/**
 * @template T
 * @param {import("@eden/o-spreadsheet").Model} model
 * @param {StoreConstructor<T>} Store
 * @param  {any[]} args
 * @return {{ store: T, container: InstanceType<DependencyContainer>, model: EdenSpreadsheetModel }}
 */
export function makeStoreWithModel(model, Store, ...args) {
    const container = new DependencyContainer();
    container.inject(ModelStore, model);
    container.inject(NotificationStore, makeTestNotificationStore());
    return {
        store: container.instantiate(Store, ...args),
        container,
        // @ts-ignore
        model: container.get(ModelStore),
    };
}

function makeTestNotificationStore() {
    return {
        notifyUser: () => {},
        raiseError: () => {},
        askConfirmation: () => {},
    };
}
