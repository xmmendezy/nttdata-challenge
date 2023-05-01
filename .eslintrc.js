module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "tsconfig.json",
		tsconfigRootDir: __dirname,
		sourceType: "module"
	},
	plugins: ["@typescript-eslint/eslint-plugin"],
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended"
	],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: [".eslintrc.js"],
	rules: {
		semi: [1, "always"],
		"comma-dangle": ["error", "always-multiline"],
		indent: [
			"error",
			"tab",
			{
				SwitchCase: 1,
				ignoredNodes: ["PropertyDefinition"]
			}
		],
		"max-lines": ["error", 2000],
		quotes: ["error", "single"],
		"prefer-const": "error",
		"no-var": "error",
		"no-unused-vars": "off",
		camelcase: "off",
		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-explicit-any": "off"
	}
};
