const first = (array, defaultValue) => array && array[0] || defaultValue;
const last = (array, defaultValue) => array && array[array.length - 1] || defaultValue;
const isNotNullOrEmpty = value => {
  if (value === null || value === undefined || value === '') return false;

  if (Array.isArray(value)) {
    return  value.length > 0;
  }

  if (typeof value === 'string' && value.length <= 0) return false;

  return true;
};
const isNullOrEmpty = value => value === null || value === undefined || value === '' || (Array.isArray(value) && value.length <= 0);
const getTagRegExp = tag => new RegExp(` ${tag} *(.*)(\\r\\n|\\r|\\n)?( *\\*(?:(?!(@)).)*(\\r\n|\\r|\\n)*)*`, 'gm');

/**
 * Available docgen types:
 * @docgen_default - overrides the default value of a param
 * @docgen_types - code wrapped display of supported types
 * @docgen_note - note about the util (blockquote)
 * @docgen_details - Any extra details to say about the function that you don't want in a note blockquote
 */

const jsDocParse = jsDoc => {
  const name = first(first(jsDoc.match(/export const (.*) =/), '').split('='), '').replace('export const ', '').trim();
  const genericMatch = jsDoc.match(/export const (.*?) = <(.*?)>/);
  const generic = genericMatch && genericMatch[2];

  return {
    name,
    generic,
    description: getDescription(jsDoc),
    since: getTag(jsDoc, '@since'),
    params: getParams(jsDoc),
    returns: getReturns(jsDoc),
    types: getTag(jsDoc, '@docgen_types'),
    examples: getTags(jsDoc, '@example'),
    see: getTag(jsDoc, '@see'),
    deprecated: getTag(jsDoc, '@deprecated') === '' ? true : getTag(jsDoc, '@deprecated'),
    notes: getTags(jsDoc, '@docgen_note'),
    details: getTags(jsDoc, '@docgen_details'),
  }; 
};
 
/**
* Gets the description of the util
*
* @param {string} jsDoc The string of all of the jsDoc for this util
*/
const getDescription = jsDoc => {
  let description = getTag(jsDoc, '@description');

  if (description.present) return description;

  description = first(jsDoc.match(/\/\*\*( *)(.*)( *)\*\//), '');
 
  if (isNotNullOrEmpty(description)) {
    const raw = description.replace('/**', '').replace('*/', '').trim();

    return {
      tag: '@description',
      present: true,
      value: raw,
      raw,
    };
  }
 
  const raw = last(first(jsDoc.match(/\/\*\*( *)(.*)(\r\n|\r|\n)*(?:(?!(@)).)*/), '').split('*')).trim();
 
  if (isNotNullOrEmpty(raw)) {
    return {
      tag: '@description',
      present: true,
      value: raw,
      raw,
    };
  }
    
  return {
    tag: '@description',
    present: false
  };
};

/**
 * Gets the parameters of the util
 *
 * @param {string} jsDoc The string of all of the jsDoc for this util
 */
const getParams = jsDoc => {
  const rawParams = getTags(jsDoc, 'param');

  if (isNullOrEmpty(rawParams)) return [];

  return rawParams.reduce((accumulator, param) => {
    const match = param.match(/{(.*?)} (\[.*\]|.*?) (?:- )?(.*)/);

    if (isNullOrEmpty(match)) return accumulator;
    
    const type = match[1];
    const optional =  match[2].startsWith('[') && match[2].endsWith(']');
    const name = optional ? match[2].substring(1, match[2].length - 1) :  match[2];
    const description = first(match[3].split('@docgen_default'), '').trim();
    let defaultValue;

    if (optional && match[3].includes('@docgen_default')) {
      defaultValue = last(match[3].split('@docgen_default', 2), '').trim();
    } else if (optional && !name.startsWith('{')) {
      defaultValue = last(name.split('=', 2));
    }
    
    return [
      ...accumulator, 
      {
        tag: '@param',
        present: true,
        type,
        name,
        description,
        optional,
        defaultValue,
        raw: match[0].trim(),
      }
    ];
  }, []);
}

const getReturns = jsDoc => {
  const match = first(Array.from(jsDoc.matchAll(/@returns *(?:{(.*?)} *)?(?:- )?(.*)/g)));

  if (isNullOrEmpty(match)) return { tag: '@returns', present: false };

  return {
    tag: '@returns',
    present: true,
    type: match[1]?.trim(),
    description: match[2]?.trim(),
    raw: match[0]?.trim(),
  };
};
 
/**
* Gets a single jsDoc tag
*
* @param {string} jsDoc The string of all of the jsDoc for this util
* @param {string} tag The name of the tag to get
* @returns {string} The string value of the tag
*/
const getTag = (jsDoc, tag) => {
  const _tag = tag.startsWith('@') ? tag : '@' + tag;
  const matches = jsDoc.match(getTagRegExp(_tag));
 
  if (isNullOrEmpty(matches)) {
    return { tag: _tag, present: false };
  }
 
  if (first(matches).match(/\*/g).length <= 1) {
    const raw = removeNewLines(first(matches).replace('*/', '').replace('*', '')).trim();
    return {
      tag: _tag,
      present: true,
      value: raw.replace(_tag, '').trim(),
      raw,
    };
  }
 
  const raw = first(matches).replace('*/', '').replace(/ ?\* /g, '').trim();

  return {
    tag: _tag,
    present: true,
    value: raw.replace(_tag, '').trim(),
    raw,
  };
};
 
/**
* Gets all matching jsDoc tags
*
* @param {string} jsDoc - The string of all of the jsDoc for this util
* @param {string} tag - The name of the tag to get
* @returns {string[]} Array of string values for each matching tag
*/
const getTags = (jsDoc, tag) => {
  const _tag = tag.startsWith('@') ? tag : '@' + tag;
  const regex = new RegExp(`${_tag}( )*(.*)(\\r\\n|\\r|\\n)?( *\\*(?:(?!(@)).)*(\\r\\n|\\r|\\n)*)*`, 'gm');
  const matches = [...jsDoc.matchAll(regex)];
 
  if (isNullOrEmpty(matches)) {
    return [];
  }
 
  if (matches.length > 1) {
    return matches.map(x => first(x).replace('*/', '').replace(/\* /g, '').replace(_tag, '').trim());
  }
 
  return [getTag(jsDoc, _tag)];
};

/**
 * Removes a set of tags from jsDoc
 * 
 * @param {string} jsDoc - The string of all of the jsDoc for this util
 * @param {string[]} tags - Array of string tags to remove
 */
const removeTags = (jsDoc, tags) => {
  for (const tag of tags) {
    const _tag = tag.startsWith('@') ? tag : '@' + tag;
    const matches = jsDoc.matchAll(getTagRegExp(_tag));

    for (const match of matches) {
      if (match[3]?.length > 0 && match[3].trim() === '*/') {
        jsDoc = jsDoc.replace(match[0], '/\n');
      } else {
        jsDoc = jsDoc.replace(match[0], ' ');
      }
    }
  }

  return jsDoc;
};

const removeNewLines = value => value.replace(/(\r\n|\n|\r)/gm, '');
 
module.exports.jsDocParse = jsDocParse; 
module.exports.removeTags = removeTags;