const ejs = require('ejs');
const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { join, resolve } = require('path');
const dirTree = require('directory-tree');
const { jsDocParse, removeTags } = require('./jsDocParse');

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
  const getValue = key => {
    if (util[key]?.value?.length > 0) {
      const startsWithTag = new RegExp(/^ *<.*?>/g);
      const endsWithTag = new RegExp(/<\/.*?>$/g);
      return startsWithTag.test(util[key].value) && endsWithTag.test(util[key].value) ? util[key].value : `<p>${util[key].value}</p>\n`;
    }

    return '';
  }

  const description = getValue('description');
  const since = util.since.present ? `<p>Since ${util.since.value}</p>\n` : '';
  const hasDefault = util.params.some(x => x.defaultValue !== undefined);
  const notes = util.notes.present ? util.notes.map(note => `<blockquote><p>${note.value}</p></blockquote>`).join('') : '';
  const types = util.types.present ? `<h4>Supporting Types</h4>\n\n\`\`\`\n${util.types.value}\n\`\`\`` : '';
  const details = getValue('details');

  return (
    '\n\n' +
    `<h2>${util.name}${util.generic ? `&lt;${util.generic}&gt;` : ''}</h2>` +
    '\n' +
    description +
    since +
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
      )).join('') +
    `</tbody>
    </table>` +
    `<p><b>Returns:</b> ${util.returns.raw.replace('@returns', '').trim()}</p>` +
    notes +
    types +
    details
  );
};

const generateSummaryTable = utils => (
  '\n\n' +
  `<h2>Summary of Utils</h2>` +
  '\n' +
  '<p>For detailed information on each util, see below this table.</p>' +
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
      `<td>${x.description.present ? x.description.value : ''}</td></tr>`
    ))
    .join('') +
  `</tbody>
  </table><hr />`
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
    const matches = Array.from(file.matchAll(/@docgen_default +(.*)/g));

    for (const match of matches) {
      file = file.replace(match[0], ' ');
    }

    file = removeTags(file, ['@docgen_types', '@docgen_details', '@docgen_note']);
    writeFileSync(join(path, dir, 'index.d.ts'), file);
  }
};

index();