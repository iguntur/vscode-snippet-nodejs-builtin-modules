'use strict';
const builtInModules = require('builtin-modules');

const snippets = {};

builtInModules.forEach(name => {
	snippets[`(commonjs) - require '${name}'`] = {
		prefix: `req::${name}`,
		description: `const ${name} = require('${name}')`,
		body: `const \${1:${name}} = require('${name}');`
	};

	snippets[`(esmodule) - import '${name}'`] = {
		prefix: `esm::${name}`,
		description: `import ${name} from '${name}'`,
		body: `import \${1:\${2:* as }${name}} from '${name}';`
	};

	snippets[`(typescript) - import = require '${name}'`] = {
		prefix: `ts::${name}`,
		description: `import ${name} = require('${name}')`,
		body: `import \${1:${name}} = require('${name}');`
	};
});

module.exports = snippets;
