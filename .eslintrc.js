module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.json'],
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:n8n-nodes-base/nodes',
	],
	rules: {
		'n8n-nodes-base/node-filename-against-convention': 'error',
		'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'error',
		'n8n-nodes-base/node-class-description-outputs-wrong': 'error',
		'n8n-nodes-base/node-class-description-name-miscased': 'error',
		'n8n-nodes-base/node-class-description-name-unsuffixed': 'error',
		'n8n-nodes-base/node-class-description-icon-not-svg': 'error',
		'n8n-nodes-base/node-class-description-missing-subtitle': 'error',
		'n8n-nodes-base/node-param-default-missing': 'error',
		'n8n-nodes-base/node-param-description-missing-from-dynamic-multi-options': 'error',
		'n8n-nodes-base/node-param-description-missing-from-dynamic-options': 'error',
		'n8n-nodes-base/node-param-description-missing-from-limit': 'error',
		'n8n-nodes-base/node-param-description-missing-from-multi-options': 'error',
		'n8n-nodes-base/node-param-description-missing-from-options': 'error',
		'n8n-nodes-base/node-param-description-missing-final-period': 'error',
		'n8n-nodes-base/node-param-description-missing-for-ignore-ssl-issues': 'error',
		'n8n-nodes-base/node-param-description-missing-for-return-all': 'error',
		'n8n-nodes-base/node-param-description-missing-for-simplify': 'error',
		'n8n-nodes-base/node-param-description-miscased-id': 'error',
		'n8n-nodes-base/node-param-description-miscased-json': 'error',
		'n8n-nodes-base/node-param-description-miscased-url': 'error',
		'n8n-nodes-base/node-param-description-unneeded-backticks': 'error',
		'n8n-nodes-base/node-param-description-untrimmed': 'error',
		'n8n-nodes-base/node-param-description-url-missing-protocol': 'error',
		'n8n-nodes-base/node-param-description-weak': 'error',
		'n8n-nodes-base/node-param-display-name-excess-inner-whitespace': 'error',
		'n8n-nodes-base/node-param-display-name-miscased': 'error',
		'n8n-nodes-base/node-param-display-name-miscased-id': 'error',
		'n8n-nodes-base/node-param-display-name-not-first-position': 'error',
		'n8n-nodes-base/node-param-display-name-untrimmed': 'error',
		'n8n-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options': 'error',
		'n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options': 'error',
		'n8n-nodes-base/node-param-display-name-wrong-for-limit': 'error',
		'n8n-nodes-base/node-param-display-name-wrong-for-multi-options': 'error',
		'n8n-nodes-base/node-param-display-name-wrong-for-options': 'error',
		'n8n-nodes-base/node-param-display-name-wrong-for-simplify': 'error',
		'n8n-nodes-base/node-param-display-name-wrong-for-update-fields': 'error',
		'n8n-nodes-base/node-param-min-value-wrong-for-limit': 'error',
		'n8n-nodes-base/node-param-multi-options-type-unsorted-items': 'error',
		'n8n-nodes-base/node-param-name-untrimmed': 'error',
		'n8n-nodes-base/node-param-operation-without-no-data-expression': 'error',
		'n8n-nodes-base/node-param-option-description-identical-to-name': 'error',
		'n8n-nodes-base/node-param-option-name-containing-star': 'error',
		'n8n-nodes-base/node-param-option-name-duplicate': 'error',
		'n8n-nodes-base/node-param-option-name-wrong-for-get-all': 'error',
		'n8n-nodes-base/node-param-option-name-wrong-for-upsert': 'error',
		'n8n-nodes-base/node-param-option-value-duplicate': 'error',
		'n8n-nodes-base/node-param-options-type-unsorted-items': 'error',
		'n8n-nodes-base/node-param-placeholder-miscased-id': 'error',
		'n8n-nodes-base/node-param-placeholder-missing-email': 'error',
		'n8n-nodes-base/node-param-required-false': 'error',
		'n8n-nodes-base/node-param-resource-without-no-data-expression': 'error',
		'n8n-nodes-base/node-param-type-options-missing-from-limit': 'error',
		'n8n-nodes-base/node-param-type-options-password-missing': 'error',
	},
}; 