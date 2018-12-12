'use strict';
const fs = require('fs');
const path = require('path');
const snippets = require('../lib/snippets');

const snippetFilepath = path.join(__dirname, '..', 'snippets', 'snippets.json');
fs.writeFileSync(snippetFilepath, JSON.stringify(snippets, null, 4), 'utf8');
