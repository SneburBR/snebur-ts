import { builtinModules } from "module";
import { defineConfig } from "vitest/config";

export default defineConfig(({ command, mode, ssrBuild }) => {
 
    return {
        build: {
            target: "es2015",
            lib: {
                entry: [
                    "src/index.ts" 
                ],
                name: "@snebur/core",
                fileName: "index",
            },
            commonjsOptions: {
                ignore: [...builtinModules, "ws"],
            },
            sourcemap: true,
            outDir: "build",
            emptyOutDir: true,
            minify: false,
        },
        test: {
            globals: true,
            threads: false,
            setupFiles: "tests/setup.ts",
            logHeapUsage: true,
            benchmark: true,
        },
    };
 });
