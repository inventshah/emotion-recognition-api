const { build } = require("esbuild");

// ESM module
build({
	entryPoints: ["src/index.ts"],
	outdir: "lib",
	outExtension: { ".js": ".mjs" },
	bundle: true,
	sourcemap: true,
	minify: true,
	splitting: true,
	format: "esm",
	target: ["esnext"],
}).catch(() => process.exit(1));

// Common JS
build({
	entryPoints: ["src/index.ts"],
	outdir: "lib",
	outExtension: { ".js": ".cjs.js" },
	bundle: true,
	sourcemap: true,
	minify: true,
	platform: "node",
	target: ["node10.4"],
}).catch(() => process.exit(1));

// Browser IIFE
build({
	entryPoints: ["src/index.ts"],
	outdir: "lib",
	bundle: true,
	sourcemap: true,
	minify: true,
	target: ["esnext"],
}).catch(() => process.exit(1));
