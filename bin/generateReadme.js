const ejs = require('ejs');
const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { join, resolve } = require('path');
const dirTree = require('directory-tree');
const { jsDocParse } = require('./jsDocParse');

const index = async () => {
  console.log('Generating README.md...');
  
  const root = join(__dirname, '..');
  const src = join(__dirname, '..', 'src');
  const dist = join(__dirname, '..', 'dist');
  const lib = join(__dirname, '..', 'dist', 'lib');
  const es5 = join(__dirname, '..', 'dist', 'lib', 'es5');
  const es6 = join(__dirname, '..', 'dist', 'lib', 'es6');

  const dirs = readdirSync(src).filter(x => !x.includes('.') && !x.startsWith('_'));
  let utils = [];

  for (const dir of dirs) {
    const functions = Array.from(readFileSync(join(src, dir, 'index.ts'), 'utf8').toString().matchAll(/\/\*\*(\n|\r\n)( \*(.*)(\n|\r\n))* \*\/(\n|\r\n)(.*)/gm)).reduce((accumulator, item) => [...accumulator, item[0]] , []);
    
    for (const func of functions) {
      utils = [...utils, jsDocParse(func)];
    }
  }

  const packageData = require(join(dist, 'package.json'));
  const tree = dirTree(lib);
  
  const formatBytes = function(a, b) {
    if (a === 0) return '0 Bytes';
    const c = 1024,
      d = b || 2,
      e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
  };

  const templateData = {
    utils,
    fileTree: tree,
    package: packageData,
    formatBytes,
    generateTable,
    generateSummaryTable,
  };

  const file = await resolve(__dirname, './readme.ejs');

  ejs.renderFile(file, templateData, (err, output) => {
    if (err) {
      console.log(err);
    }
    writeFileSync(join(dist, 'README.md'), output);
    writeFileSync(join(root, 'README.md'), output);
  });

  sanitizeDTS(dirs, es5);
  sanitizeDTS(dirs, es6);
  
  console.log('Done');
};

const generateTable = util => {
  const hasDefault = util.params.some(x => x.defaultValue !== undefined);

  return (
    '\n\n' +
    `<h2>${util.name}${util.generic ? `&lt;${util.generic}&gt;` : ''}</h2>` +
    '\n' +
    `<p>${util.description}</p>` +
    '\n' +
    `<p>Since ${util.since}</p>` +
    '\n' +
    `<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th>` +
        (hasDefault ? '<th>Default</th>' : '') +
      `</tr>
      </thead>
      <tbody>` +
      util.params.map(x => (
        `<tr><td><p><b>${x.name}${x.optional ? ' <span>(optional)</span>' : ''}</b></p>${x.description}</td>` +
        `<td>${x.type}</td>` + 
        (hasDefault ? `<td>${x.optional && x.defaultValue !== undefined ? x.defaultValue : ''}</td>` : '') + 
        '</tr>'
      ))
      .join('') +
    `</tbody>
    </table>` +
    `<p><b>Returns:</b> ${util.returns}</p>`
  );
};

const generateSummaryTable = utils => (
  '\n\n' +
  `<h2>Utils List</h2>` +
  '\n' +
  `<table>
    <thead>
    <tr>
      <th>function</th>
      <th>Description</th>
    </tr>
    </thead>
    <tbody>` +
    utils.map(x => (
      `<tr><td>${x.name}</td>` +
      `<td>${x.description}</td></tr>`
    ))
    .join('') +
  `</tbody>
  </table>`
);

/**
 * Remove anything from jsdoc comments that is used for documentation generation only
 *
 * @param {string[]} dirs The directory names
 * @param {string} path The path to the directories
 */
const sanitizeDTS = (dirs, path) => {
  console.log('Sanitizing *.d.ts: ' + path + '...');

  for (const dir of dirs) {
    let file = readFileSync(join(path, dir, 'index.d.ts'), 'utf8');
    const matches = Array.from(file.matchAll(/ \* .*( @default.*)/g));

    for (const match of matches) {
      file = file.replace(match[1], '');
    }
    writeFileSync(join(path, dir, 'index.d.ts'), file);
  }
};

index();