import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";

export default [
	// ---------- JS / Config files (NO tsconfig.project) ----------
	{
		files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
		languageOptions: {
			sourceType: "module",
		},
		rules: {
			...js.configs.recommended.rules,
		},
	},

	// ---------- TS / TSX (type-aware) ----------
	{
		files: ["**/*.ts", "**/*.tsx"],
		plugins: {
			"@next/next": nextPlugin,
			"@typescript-eslint": tseslint,
			import: importPlugin,
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: "./tsconfig.json",
				sourceType: "module",
			},
		},
		rules: {
			// Next core web vitals
			...nextPlugin.configs["core-web-vitals"].rules,

			// rules خودت
			"import/order": "error",
			"import/no-mutable-exports": "error",
			"import/no-cycle": "error",
			"import/no-default-export": "off",
			"import/prefer-default-export": "off",
			"import/no-unresolved": "off",

			"@typescript-eslint/consistent-type-imports": [
				"error",
				{
					prefer: "type-imports",
					fixStyle: "inline-type-imports",
					disallowTypeAnnotations: false,
				},
			],

			"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],

			"@typescript-eslint/return-await": ["error", "in-try-catch"],
			"@typescript-eslint/require-await": "off",
			"@typescript-eslint/no-explicit-any": "off",
		},
	},
];
