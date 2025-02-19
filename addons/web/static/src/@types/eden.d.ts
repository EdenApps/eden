interface EdenModuleErrors {
    cycle?: string | null;
    failed?: Set<string>;
    missing?: Set<string>;
    unloaded?: Set<string>;
}

interface EdenModuleFactory {
    deps: string[];
    fn: EdenModuleFactoryFn;
    ignoreMissingDeps: boolean;
}

class EdenModuleLoader {
    bus: EventTarget;
    checkErrorProm: Promise<void> | null;
    /**
     * Mapping [name => factory]
     */
    factories: Map<string, EdenModuleFactory>;
    /**
     * Names of failed modules
     */
    failed: Set<string>;
    /**
     * Names of modules waiting to be started
     */
    jobs: Set<string>;
    /**
     * Mapping [name => module]
     */
    modules: Map<string, EdenModule>;

    constructor(root?: HTMLElement);

    addJob: (name: string) => void;

    define: (
        name: string,
        deps: string[],
        factory: EdenModuleFactoryFn,
        lazy?: boolean
    ) => EdenModule;

    findErrors: (jobs?: Iterable<string>) => EdenModuleErrors;

    findJob: () => string | null;

    reportErrors: (errors: EdenModuleErrors) => Promise<void>;

    sortFactories: () => void;

    startModule: (name: string) => EdenModule;

    startModules: () => void;
}

type EdenModule = Record<string, any>;

type EdenModuleFactoryFn = (require: (dependency: string) => EdenModule) => EdenModule;

declare const eden: {
    csrf_token: string;
    debug: string;
    define: EdenModuleLoader["define"];
    loader: EdenModuleLoader;
};
