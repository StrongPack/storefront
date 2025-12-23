// https://nextjs.org/docs/basic-features/eslint#lint-staged

// import path from "path";

// const buildEslintCommand = (filenames) =>
// 	`next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(" --file ")}`;

// export default {
// 	"*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}": [buildEslintCommand],
// 	"*.*": "prettier --write --ignore-unknown",
// };

import path from "path";

const eslintCommand = (filenames) =>
	`eslint --fix ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(" ")}`;

// export default {
// 	"*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}": [eslintCommand],
// 	"*": "prettier --write --ignore-unknown",
// };

// export default {
// 	'*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write --ignore-unknown'],
// 	'*.{json,md,yml,yaml}': ['prettier --write --ignore-unknown'],
// };

export default {
	"*.{ts,tsx}": ["eslint --fix", "prettier --write"],
	"*.{js,jsx,json,md,yml,yaml}": ["prettier --write --ignore-unknown"],
};
