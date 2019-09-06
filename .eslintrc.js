module.exports = {
	settings: {
		"import/resolver": {
			node: {
				paths: ["src"],
				extensions: [".js", ".jsx", ".ts", ".tsx"]
			}
		}
	},
	rules: {
		"quotes": [2, "double", "avoid-escape"],
		"eol-last": ["error", "never"],
		"no-trailing-spaces": [2, { "skipBlankLines": true }],
		"no-console": [0],
		"indent": [0, "tab"],
		"padded-blocks": ["error", "always"],
		"no-tabs": 0,
		"comma-dangle": ["error", "never"],
		"react/jsx-filename-extension": [0],
		"no-unused-vars": 0,
		"keyword-spacing": 0
	}, 
	env: {
		browser: true,
		es6: true
	},
	extends: [
		"airbnb"
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: "module"
	},
	plugins: [
		"react",
		'@typescript-eslint'
	]
}
