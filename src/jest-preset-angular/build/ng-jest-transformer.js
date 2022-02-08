"use strict";
var _NgJestTransformer_ngJestLogger, _NgJestTransformer_esbuildImpl;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgJestTransformer = void 0;
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const bs_logger_1 = require("bs-logger");
const ts_jest_transformer_1 = require("ts-jest/dist/ts-jest-transformer");
const ng_jest_compiler_1 = require("./compiler/ng-jest-compiler");
const ng_jest_config_1 = require("./config/ng-jest-config");
class NgJestTransformer extends ts_jest_transformer_1.TsJestTransformer {
    constructor() {
        var _a;
        super();
        _NgJestTransformer_ngJestLogger.set(this, void 0);
        _NgJestTransformer_esbuildImpl.set(this, void 0);
        (0, tslib_1.__classPrivateFieldSet)(this, _NgJestTransformer_ngJestLogger, (0, bs_logger_1.createLogger)({
            context: {
                [bs_logger_1.LogContexts.package]: 'jest-preset-angular',
                [bs_logger_1.LogContexts.logLevel]: bs_logger_1.LogLevels.trace,
                version: require('../package.json').version,
            },
            targets: (_a = process.env.NG_JEST_LOG) !== null && _a !== void 0 ? _a : undefined,
        }), "f");
        let useNativeEsbuild = false;
        try {
            const esbuildCheckPath = require.resolve('@angular-devkit/build-angular/esbuild-check.js');
            const { status, error } = (0, child_process_1.spawnSync)(process.execPath, [esbuildCheckPath]);
            useNativeEsbuild = status === 0 && error === undefined;
        }
        catch (e) {
            useNativeEsbuild = false;
        }
        (0, tslib_1.__classPrivateFieldSet)(this, _NgJestTransformer_esbuildImpl, useNativeEsbuild ? require('esbuild') : require('esbuild-wasm'), "f");
    }
    _createConfigSet(config) {
        return new ng_jest_config_1.NgJestConfig(config);
    }
    _createCompiler(configSet, cacheFS) {
        this._compiler = new ng_jest_compiler_1.NgJestCompiler(configSet, cacheFS);
    }
    process(fileContent, filePath, transformOptions) {
        const configSet = this._createConfigSet(transformOptions.config);
        if (path_1.default.extname(filePath) === '.mjs' ||
            (/node_modules\/(.*.js$)/.test(filePath.replace(/\\/g, '/')) && !filePath.includes('tslib'))) {
            (0, tslib_1.__classPrivateFieldGet)(this, _NgJestTransformer_ngJestLogger, "f").debug({ filePath }, 'process with esbuild');
            const compilerOpts = configSet.parsedTsConfig.options;
            const { code, map } = (0, tslib_1.__classPrivateFieldGet)(this, _NgJestTransformer_esbuildImpl, "f").transformSync(fileContent, {
                loader: 'js',
                format: transformOptions.supportsStaticESM && configSet.useESM ? 'esm' : 'cjs',
                target: compilerOpts.target === configSet.compilerModule.ScriptTarget.ES2015 ? 'es2015' : 'es2016',
                sourcemap: compilerOpts.sourceMap,
                sourcefile: filePath,
                sourcesContent: true,
                sourceRoot: compilerOpts.sourceRoot,
            });
            return {
                code,
                map,
            };
        }
        else {
            return super.process(fileContent, filePath, transformOptions);
        }
    }
}
exports.NgJestTransformer = NgJestTransformer;
_NgJestTransformer_ngJestLogger = new WeakMap(), _NgJestTransformer_esbuildImpl = new WeakMap();