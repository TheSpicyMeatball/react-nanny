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

const jsDocParse = jsDoc => {
  const name = first(first(jsDoc.match(/export const (.*) =/), '').split('='), '').replace('export const ', '').trim();
  const genericMatch = jsDoc.match(/export const (.*?) = <(.*?)>/);
  const generic = genericMatch && genericMatch[2];

  return {
    name,
    generic,
    description: getDescription(jsDoc),
    since: getTag(jsDoc, 'since'),
    params: getParams(jsDoc),
    returns: getTag(jsDoc, 'returns'),
    examples: getTags(jsDoc, 'example'),
    see: getTag(jsDoc, 'see'),
    deprecated: getTag(jsDoc, 'deprecated') === '' ? true : getTag(jsDoc, 'deprecated'),
  }; 
};
 
/**
* Gets the description of the util
*
* @param {string} jsDoc The string of all of the jsDoc for this util
*/
const getDescription = jsDoc => {
 let description = first(jsDoc.match(/\/\*\*( *)(.*)( *)\*\//), '');
 
 if (isNotNullOrEmpty(description)) {
   return description.replace('/**', '').replace('*/', '').trim();
 }
 
 description = last(first(jsDoc.match(/\/\*\*( *)(.*)(\r\n|\r|\n)*(?:(?!(@)).)*/), '').split('*')).trim();
 
 return description;
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
    const match = param.match(/{(.*?)} (.*) - (.*)/);

    if (isNullOrEmpty(match)) return accumulator;
    
    const optional =  match[2].startsWith('[') && match[2].endsWith(']');

    return [
      ...accumulator, 
      {
        type: match[1],
        name: optional ? match[2].substring(1, match[2].length - 1) :  match[2],
        optional,
        description: match[3],
      }
    ];
  }, []);
}
 
/**
* Gets a single jsDoc tag
*
* @param {string} jsDoc The string of all of the jsDoc for this util
* @param {string} tag The name of the tag to get; do not include '@'
* @returns {string} The string value of the tag
*/
const getTag = (jsDoc, tag) => {
 const regex = new RegExp(`@${tag}( )*(.*)(\\r\\n|\\r|\\n)?( *\\*(?:(?!(@)).)*(\\r\\n|\\r|\\n)*)*`, 'gm');
 const matches = jsDoc.match(regex);
  if (isNullOrEmpty(matches)) {
   return;
 }
 
 if (first(matches).match(/\*/g).length <= 1) {
   return removeNewLines(first(matches).replace('*/', '').replace('*', '')).replace(`@${tag}`, '').trim();
 }
 
 return first(matches).replace('*/', '').replace(/\* /g, '').replace(`@${tag}`, '').trim();
};
 
/**
* Gets all matching jsDoc tags
*
* @param {string} jsDoc The string of all of the jsDoc for this util
* @param {string} tag The name of the tag to get; do not include '@'
* @returns {string[]} Array of string values for each matching tag
*/
const getTags = (jsDoc, tag) => {
 const regex = new RegExp(`@${tag}( )*(.*)(\\r\\n|\\r|\\n)?( *\\*(?:(?!(@)).)*(\\r\\n|\\r|\\n)*)*`, 'gm');
 const matches = [...jsDoc.matchAll(regex)];
  if (isNullOrEmpty(matches)) {
   return;
 }
 
 if (matches.length > 1) {
   return matches.map(x => first(x).replace('*/', '').replace(/\* /g, '').replace(`@${tag}`, '').trim());
 }
 
 return [getTag(jsDoc, tag)];
};

const removeNewLines = value => value.replace(/(\r\n|\n|\r)/gm, '');
 
module.exports.jsDocParse = jsDocParse;