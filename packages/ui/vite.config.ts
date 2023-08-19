import { builtinModules } from "module";
import { defineConfig } from "vitest/config";

export default defineConfig({
    build: {
        target: "es2022",
        lib: {
            entry: [
                "src/index.ts"
            ],
            name: "@snebur/ui",
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
    },
});

