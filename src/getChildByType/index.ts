import * as React from 'react';

import { processTypes } from './../_private/utils';
import { getChildrenByTypeDeep } from '../getChildrenByType';
import { typeOfComponent } from '../typeOfComponent';

/**
 * Gets first child by specified type
 * 
 * @since v1.0.0 (modified v2.0.0)
 * @template T
 * @template TC
 * @param {T} children - JSX children
 * @param {TC | TC[]} types - Types of children to match
 * @param {GetChildByTypeConfig} [config={ customTypeKey: '__TYPE', prioritized: false }] - The configuration params
 * @returns {T} - The first matching child
 * @docgen_types
 * // The configuration type for the util:
 * //   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type
 * //   prioritized?: boolean = false - Whether or not the order of types is prioritized
 * 
 * export type GetChildByTypeConfig = { customTypeKey?: string, prioritized?: boolean };
 * @example
 * // Finds the first occurrence of either a ToDo (custom component w/defined type as prop), a div, or a React Fragment
 * getChildByType(children, ['ToDo', 'div', 'react.fragment']);
 * 
 * // Finds the first occurrence of either a MyComponent (custom component - full component passed in), a div, or a React Fragment
 * import MyComponent from './MyComponent';
 * getChildByType(children, [MyComponent, 'div', 'react.fragment']);
 * 
 * // Finds the first occurrence of either a ToDo, a div, or a React Fragment with a preference for that order. If ToDo exists, it will return that first. If not, then div, etc.
 * getChildByType(children, ['ToDo', 'div', 'react.fragment'], { prioritized: true });
 * @docgen_note
 * This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To find a React Fragment, search for <em>'react.fragment'</em>.
 * @docgen_import { getChildByType, GetChildByTypeConfig }
 * @docgen_imp_note <em>GetChildByTypeConfig</em> is a TypeScript type and is only for (optional) use with TypeScript projects
 */
export const getChildByType = <T=React.ReactNode, TC=unknown>(children: T, types: TC | Array<TC>, { customTypeKey = '__TYPE', prioritized = false }: GetChildByTypeConfig = {}) : T => {
  const _types = processTypes(Array.isArray(types) ? types : [types]);
  const matches = React.Children.toArray(children).filter(child => _types.indexOf(typeOfComponent(child, customTypeKey)) !== -1);

  if (prioritized) {
    for (const type of _types) {
      const match = matches.find(x => typeOfComponent(x, customTypeKey) === type);

      if (match) return match as T;
    }
  }
  
  return matches[0] as T;
};

/**
 * Gets first child by specified type (deep search)
 * 
 * @since v1.0.0 (modified v2.0.0)
 * @template T
 * @template TC
 * @param {T} children - JSX children
 * @param {TC | TC[]} types - Types of children to match
 * @param {GetChildByTypeConfig} [{ customTypeKey: '__TYPE', prioritized: false }] - The configuration params
 * @returns {T} - The first matching child
 * @docgen_types
 * // The configuration type for the util:
 * //   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type
 * //   prioritized?: boolean = false - Whether or not the order of types is prioritized
 * 
 * export type GetChildByTypeConfig = { customTypeKey?: string, prioritized?: boolean };
 * @example
 * // Finds the first occurrence of either a ToDo (custom component w/defined type as prop), a div, or a React Fragment
 * getChildByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);
 * 
 * // Finds the first occurrence of either a MyComponent (custom component - full component passed in), a div, or a React Fragment
 * import MyComponent from './MyComponent';
 * getChildByTypeDeep(children, [MyComponent, 'div', 'react.fragment']);
 * 
 * // Finds the first occurrence of either a ToDo, a div, or a React Fragment with a preference for that order. If ToDo exists, it will return that first. If not, then div, etc.
 * getChildByTypeDeep(children, ['ToDo', 'div', 'react.fragment'], { prioritized: true });
 * @docgen_note
 * This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To find a React Fragment, search for <em>'react.fragment'</em>.
 * @docgen_import { getChildByTypeDeep, GetChildByTypeConfig }
 * @docgen_imp_note <em>GetChildByTypeConfig</em> is a TypeScript type and is only for (optional) use with TypeScript projects
 */
export const getChildByTypeDeep = <T=React.ReactNode, TC=unknown>(children: T, types: TC | Array<TC>, { customTypeKey = '__TYPE', prioritized = false }: GetChildByTypeConfig = {}) : T => {
  const _types = processTypes(Array.isArray(types) ? types : [types]);

  const matches = getChildrenByTypeDeep<T>(children, _types, { customTypeKey });

  if (prioritized) {
    for (const type of _types) {
      const match = matches.find(x => typeOfComponent(x, customTypeKey) === type);

      if (match) return match as T;
    }
  }
  
  return matches[0] as T;
};

export type GetChildByTypeConfig = { customTypeKey?: string, prioritized?: boolean };