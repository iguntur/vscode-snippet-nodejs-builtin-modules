'use strict';
const _ = require('lodash');
const builtInModules = require('builtin-modules');

const snippets = {};

function getIdentifier(moduleId) {
	switch (moduleId) {
		case 'buffer':
		case 'console':
		case 'module':
			return _.startCase(moduleId);
		case 'events':
			return 'EventEmitter';
		default:
			return _.camelCase(moduleId);
	}
}

builtInModules.forEach(name => {
	const identifier = getIdentifier(name);

	snippets[`(commonjs) - require '${name}'`] = {
		prefix: `req::${name}`,
		description: `const ${identifier} = require('${name}')`,
		body: `const \${1:${identifier}} = require('${name}');`
	};

	snippets[`(esmodule) - import '${name}'`] = {
		prefix: `esm::${name}`,
		description: `import ${identifier} from '${name}'`,
		body: `import \${1:\${2:* as }${identifier}} from '${name}';`
	};

	snippets[`(typescript) - import = require '${name}'`] = {
		prefix: `ts::${name}`,
		description: `import ${identifier} = require('${name}')`,
		body: `import \${1:${identifier}} = require('${name}');`
	};
});

module.exports = snippets;
