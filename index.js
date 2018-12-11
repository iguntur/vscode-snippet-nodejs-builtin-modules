'use strict';
const fs = require('fs');
const path = require('path');
const builtInModules = require('builtin-modules');

const snippets = {};

builtInModules.forEach(name => {
	snippets[`(commonjs) - require '${name}'`] = {
		scope: 'javascript,typescript,markdown',
		prefix: `req::${name}`,
		description: `const ${name} = require('${name}')`,
		body: [
			`const \${1:${name}} = require('${name}');`
		]
	};

	snippets[`(esmodule) - import '${name}'`] = {
		scope: 'javascript,typescript,markdown',
		prefix: `esm::${name}`,
		description: `import ${name} from '${name}'`,
		body: [
			`import \${1:\${2:* as }${name}} from '${name}';`
		]
	};

	snippets[`(typescript) - import = require '${name}'`] = {
		scope: 'javascript,typescript,markdown',
		prefix: `ts::${name}`,
		description: `import ${name} = require('${name}')`,
		body: [
			`import \${1:${name}} = require('${name}');`
		]
	};
});

const vscodeSnippetPath = '.config/Code/User/snippets'; // Hard coded
const snippetFilename = 'nodejs-builtin-module.code-snippets';
const filepath = path.join(process.env.HOME, vscodeSnippetPath, snippetFilename);

fs.writeFileSync(filepath, JSON.stringify(snippets, null, 4), 'utf8');
