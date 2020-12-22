import * as React from 'react';

import { processTypes } from './../_private/utils';
import { getChildrenByTypeDeep } from '../getChildrenByType';
import { typeOfComponent } from '../typeOfComponent';

/**
 * Gets first child by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To find a React Fragment, search for type 'react.fragment'.
 * 
 * @since v1.0.0 (modified v2.0.0)
 * @template T
 * @param {T} children - JSX children
 * @param {any[]} types - Types of children to match
 * @param {GetChildByTypeConfig} [{ customTypeKey: boolean = '__TYPE', prioritized: boolean = false }] - The configuration params @default { customTypeKey: '__TYPE', prioritized: false }
 * @returns {T} - The first matching child
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
 */
export const getChildByType = <T=React.ReactNode>(children: T, types: any[], { customTypeKey = '__TYPE', prioritized = false }: GetChildByTypeConfig = {}) : T => {
  const _types = processTypes(types);
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
 * Gets first child by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To find a React Fragment, search for type 'react.fragment'.  (deep search)
 * 
 * @since v1.0.0 (modified v2.0.0)
 * @template T
 * @param {T} children - JSX children
 * @param {any[]} types - Types of children to match
 * @param {GetChildByTypeConfig} [{ customTypeKey: boolean = '__TYPE', prioritized: boolean = false }] - The configuration params @default { customTypeKey: '__TYPE', prioritized: false }
 * @returns {T} - The first matching child
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
 */
export const getChildByTypeDeep = <T=React.ReactNode>(children: T, types: any[], { customTypeKey = '__TYPE', prioritized = false }: GetChildByTypeConfig = {}) : T => {
  const _types = processTypes(types);

  const matches = getChildrenByTypeDeep<T>(children, _types, { customTypeKey });

  if (prioritized) {
    for (const type of _types) {
      const match = matches.find(x => typeOfComponent(x, customTypeKey) === type);

      if (match) return match as T;
    }
  }
  
  return matches[0] as T;
};

/** The custom component prop key to check the type; whether or not the order of types is prioritized */
export type GetChildByTypeConfig = { customTypeKey?: string, prioritized?: boolean };