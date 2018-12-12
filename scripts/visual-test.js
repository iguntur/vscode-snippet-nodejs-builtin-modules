'use strict';
const fs = require('fs');
const path = require('path');
const pathEnsure = require('path-ensure');
const pkg = require('../package.json');

require('./build');

process.nextTick(() => {
	const extensionPath = `${pkg.publisher}.${pkg.name}-${pkg.version}`;
	const vscodeExtensionPath = path.join(process.env.HOME, '.vscode', 'extensions', extensionPath);

	const source = path.join(__dirname, '..', 'snippets', 'snippets.json');
	const output = path.join(vscodeExtensionPath, 'snippets', 'snippets.json');
	fs.createReadStream(source).pipe(fs.createWriteStream(pathEnsure.sync(output)));

	fs
		.createReadStream(path.join(__dirname, '..', 'package.json'))
		.pipe(fs.createWriteStream(path.join(vscodeExtensionPath, 'package.json')));
});
