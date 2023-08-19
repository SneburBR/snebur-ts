import { builtinModules } from "module";
import { defineConfig } from "vitest/config";

export default defineConfig({
    build: {
        target: "es2015",
        lib: {
            entry: [
                "src/main.ts"
            ],
            name: "@snebur/ui-demo",
            fileName: "main",
        },
        commonjsOptions: {
            ignore: [...builtinModules, "ws"],
        },
        sourcemap: true,
        outDir: "build",
        emptyOutDir: true,
        minify: false,
    } 
});

