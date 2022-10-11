import * as React from 'react';

import { processTypes } from '../_private/utils';
import { typeOfComponent } from '../typeOfComponent';
import { NannyNode } from '../types';

/**
 * Gets all children by specified type
 *
 * @since v1.0.0 (modified v2.0.0)
 * @template T
 * @template TC
 * @param {T} children - JSX children
 * @param {TC | TC[]} types - Types of children to match
 * @param {GetChildrenByTypeConfig} [config={ customTypeKey: '__TYPE' }] - The configuration params
 * @returns {T[]} - Array of matching children
 * @docgen_types
 * // The configuration type for the util:
 * //   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type
 * 
 * export type GetChildrenByTypeConfig = { customTypeKey?: string };
 * @example
 * // Finds all occurrences of ToDo (custom component), div, and React Fragment
 * getChildrenByType(children, ['ToDo', 'div', 'react.fragment']);
 * 
 * // Finds all occurrences of MyComponent (custom component - full component passed in), a div, and React Fragment
 * import MyComponent from './MyComponent';
 * getChildrenByType(children, [MyComponent, 'div', 'react.fragment']);
 * 
 * // Finds all occurrences of ToDo (custom component) with a customized {customTypeKey}
 * getChildrenByType(children, ['ToDo'], { customTypeKey: 'myTypeKey' });
 * @docgen_note
 * This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To find a React Fragment, search for <em>'react.fragment'</em>.
 * @docgen_import { getChildrenByType, GetChildrenByTypeConfig }
 * @docgen_imp_note <em>GetChildrenByTypeConfig</em> is a TypeScript type and is only for (optional) use with TypeScript projects
 */
export const getChildrenByType = <T=React.ReactNode, TC=unknown>(children: T, types: TC | Array<TC>, { customTypeKey = '__TYPE' }: GetChildrenByTypeConfig = {}) : T[] => {
  const _types = processTypes(Array.isArray(types) ? types : [types]);
  return React.Children.toArray(children).filter(child => _types.indexOf(typeOfComponent(child, customTypeKey)) !== -1) as T[];
};


/**
 * Gets all children by specified type (deep search)
 * 
 * @since v1.0.0 (modified v2.0.0)
 * @template TC
 * @param {T} children - JSX children
 * @param {TC | TC[]} types - Types of children to match
 * @param {GetChildrenByTypeConfig} [{ customTypeKey: '__TYPE', skipWhenFound: false }] - The configuration params
 * @returns {T[]} - Array of matching children
 * @docgen_types
 * // The configuration type for the util:
 * //   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type
 * //   skipWhenFound?: boolean = false - Will stop the depth search when something was found
 * 
 * export type GetChildrenByTypeConfig = { customTypeKey?: string, skipWhenFound?: boolean };
 * @example
 * // Finds all occurrences of ToDo (custom component), div, and React Fragment
 * getChildrenByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);
 * 
 * // Finds all occurrences of MyComponent (custom component - full component passed in), a div, and React Fragment
 * import MyComponent from './MyComponent';
 * getChildrenByTypeDeep(children, [MyComponent, 'div', 'react.fragment']);
 * 
 * // Finds all occurrences of ToDo (custom component) with a customized {customTypeKey}
 * getChildrenByTypeDeep(children, ['ToDo'], { customTypeKey: 'myTypeKey' });
 * @docgen_note
 * This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To find a React Fragment, search for <em>'react.fragment'</em>.
 * To stop the depth search when something was found, set <em>skipWhenFound</em> true.
 * @docgen_import { getChildrenByTypeDeep, GetChildrenByTypeConfig }
 * @docgen_imp_note <em>GetChildrenByTypeConfig</em> is a TypeScript type and is only for (optional) use with TypeScript projects
 */
export const getChildrenByTypeDeep = <T=React.ReactNode, TC=unknown>(children: T, types: TC | Array<TC>, { customTypeKey = '__TYPE', skipWhenFound = false }: GetChildrenByTypeConfig = {}) : T[] => {
  const _children = React.Children.toArray(children);
  const _types = processTypes(Array.isArray(types) ? types : [types]);

  let output = [];

  for (const child of _children) {
    const found = _types.indexOf(typeOfComponent(child, customTypeKey)) !== -1;
    if (found) {
      output = [...output, child as T];
    }

    if ((child as NannyNode).props?.children && !(skipWhenFound && found)) {
      output = [...output, ...getChildrenByTypeDeep<T>((child as NannyNode).props.children, _types, { customTypeKey, skipWhenFound })];
    }
  }

  return output;
};

export type GetChildrenByTypeConfig = { customTypeKey?: string, skipWhenFound?: boolean };