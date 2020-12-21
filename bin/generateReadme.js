const ejs = require('ejs');
const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { join, resolve } = require('path');
const dirTree = require('directory-tree');
const { jsDocParse } = require('./jsDocParse');

const index = async () => {
  const root = join(__dirname, '..');
  const src = join(__dirname, '..', 'src');
  const dist = join(__dirname, '..', 'dist');
  const lib = join(__dirname, '..', 'dist', 'lib');
  const dirs = readdirSync(src).filter(x => !x.includes('.'));
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
  };

  const file = await resolve(__dirname, './readme.ejs');

  ejs.renderFile(file, templateData, (err, output) => {
    if (err) {
      console.log(err);
    }
    writeFileSync(join(dist, 'README.md'), output);
    writeFileSync(join(root, 'README.md'), output);
  });
};

const generateTable = util => (
  '\n\n' +
  `<h3>${util.name}${util.generic ? `&lt;${util.generic}&gt;` : ''}</h3>` +
  '\n' +
  `<p>${util.description}</p>` +
  '\n' +
  `<p>Since ${util.since}</p>` +
  '\n' +
  `<table>
    <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
    </tr>
    </thead>
    <tbody>` +
    util.params.map(x => (
      `<tr><td><p><b>${x.name}${x.optional ? ' <span>(optional)</span>' : ''}</b></p>${x.description}</td>` +
      `<td>${x.type}</td></tr>`
    ))
    .join('') +
  `</tbody>
  </table>` +
  `<p><b>Returns:</b> ${util.returns}</p>`
);

index();