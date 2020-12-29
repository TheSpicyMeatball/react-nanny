const ejs = require('ejs');
const { existsSync, readdirSync, readFileSync, writeFileSync } = require('fs');
const { join, resolve } = require('path');
const dirTree = require('directory-tree');
const { parseTags, removeTags } = require('jsdoc-parse-plus');
const htmlEncode = require('js-htmlencode').htmlEncode;

const first = (array, defaultValue) => array && array[0] || defaultValue;
const isNotNullOrEmpty = value => {
  if (value === null || value === undefined || (typeof value === 'string' && value === '')) return false;

  if (Array.isArray(value)) {
    return  value.length > 0;
  }

  if (typeof value === 'string' && value.length <= 0) return false;

  return true;
};

/**
 * Available docgen tags:
 * @docgen_types - code wrapped display of supported types
 * @docgen_note - note about the util (blockquote)
 * @docgen_details - Any extra details to say about the function that you don't want in a note blockquote
 * @docgen_import - override for the import
 */
const customTags = [
  '@docgen_types', 
  '@docgen_note',
  '@docgen_details',
  '@docgen_import',
];

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

  const tags = [
    '@description',
    '@since',
    '@param', 
    '@returns', 
    '@example', 
    '@see', 
    '@deprecated',
    ...customTags,
  ];

  for (const dir of dirs) {
    const functions = Array.from(readFileSync(join(src, dir, 'index.ts'), 'utf8').toString().matchAll(/\/\*\*(\n|\r\n)( \*(.*)(\n|\r\n))* \*\/(\n|\r\n)(.*)/gm)).reduce((accumulator, item) => [...accumulator, item[0]] , []);
    
    for (const func of functions) {
      utils = [...utils, { ...getFunctionNameFromExpression(func), ...parseTags(func, tags) }];
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

const generateTable = (util, packageName) => {
  const getValue = key => {
    if (util[key]?.value?.length > 0) {
      const startsWithTag = new RegExp(/^ *<.*?>/g);
      const endsWithTag = new RegExp(/<\/.*?>$/g);
      return startsWithTag.test(util[key].value) && endsWithTag.test(util[key].value) ? util[key].value : `<p>${util[key].value}</p>\n`;
    }

    return '';
  };

  const description = getValue('description');
  const since = util.since ? `<p>Since ${util.since.value}</p>\n` : '';
  const hasDefault = util.param.some(x => x.defaultValue !== undefined);
  const types = util.docgen_types ? `<h4>Supporting Types</h4>\n\n\`\`\`\n${util.docgen_types.value}\n\`\`\`` : '';
  const details = getValue('docgen_details');

  let notes = ''; 

  if (util?.docgen_note && Array.isArray(util.docgen_note)) {
    notes = util.docgen_note.map(note => `<blockquote><p>${note.value}</p></blockquote>`).join('');
  } else if (util?.docgen_note) {
    notes = `<blockquote><p>${util.docgen_note.value}</p></blockquote>`;
  }

  let examples = existsSync(join(__dirname, '..', 'src', util.name, 'EXAMPLES.md')) ? '\n\n' + readFileSync(join(__dirname, '..', 'src', util.name, 'EXAMPLES.md'), 'utf8') + '\n\n' : '';

  if (isNotNullOrEmpty(util.example)) {
    examples = examples + '\n\n' + `

\`\`\`    
${util.example.map(x => x.value).join('\n')}
\`\`\`

    `;
  }

  if (isNotNullOrEmpty(examples)) {
    examples = '<h4>Examples</h4>\n\n' + examples
  }

  const _import = `
  <h4>Import</h4>

\`\`\`
import ${isNotNullOrEmpty(util.docgen_import) ? util.docgen_import.value : `{ ${util.name} }`} from '${packageName}';
\`\`\`

  `;

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
      util.param.map(x => (
        `<tr><td><p><b>${x.name}${x.optional ? ' <span>(optional)</span>' : ''}</b></p>${x.description}</td>` +
        `<td>${htmlEncode(x.type)}</td>` + 
        (hasDefault ? `<td>${x.optional && x.defaultValue !== undefined ? x.defaultValue : ''}</td>` : '') + 
        '</tr>'
      )).join('') +
    `</tbody>
    </table>` +
    `<p><b>Returns:</b> ${htmlEncode(util.returns.raw.replace('@returns', '').trim())}</p>` +
    notes +
    types +
    details +
    _import +
    examples
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
      `<td>${x.description ? x.description.value : ''}</td></tr>`
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

    file = removeTags(file, customTags);
    writeFileSync(join(path, dir, 'index.d.ts'), file);
  }
};

/**
 * Gets the function name from a function expression string
 * @param {string} func - The function expression string
 * @returns {{name: string, generic?: string}}
 */
const getFunctionNameFromExpression = func => {
  const name = first(first(func.match(/export const (.*) =/), '').split('='), '').replace('export const ', '').trim();
  const genericMatch = func.match(/export const (.*?) = <(.*?)>/);
  const generic = genericMatch && genericMatch[2] || undefined;

  return { name, generic };
};

index();