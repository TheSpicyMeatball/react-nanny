import * as React from 'react';

import { processTypes } from '../_private/utils';
import { typeOfComponent } from '../typeOfComponent';

/**
 * Gets all children by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To find a React Fragment, search for type 'react.fragment'.
 *
 * @since v1.0.0 (modified v2.0.0)
 * @template T
 * @param {T} children - JSX children
 * @param {any[]} types - Types of children to match
 * @param {object} [{ customTypeKey: boolean = '__TYPE' }] - The configuration params; The custom component prop key to check the type @default { customTypeKey: '__TYPE' }
 * @returns {T[]} - Array of matching children
 * @example
 * // Finds all occurrences of ToDo (custom component), div, and React Fragment
 * getChildrenByType(children, ['ToDo', 'div', 'react.fragment']);
 * 
 * // Finds all occurrences of MyComponent (custom component - full component passed in), a div, and React Fragment
 * import MyComponent from './MyComponent';
 * getChildrenByType(children, [MyComponent, 'div', 'react.fragment']);
 */
export const getChildrenByType = <T=React.ReactNode>(children: T, types: any[], { customTypeKey = '__TYPE' }: { customTypeKey?: string } = {}) : T[] => {
  const _types = processTypes(types);
  return React.Children.toArray(children).filter(child => _types.indexOf(typeOfComponent(child, customTypeKey)) !== -1) as T[];
}


/**
 * Gets all children by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To find a React Fragment, search for type 'react.fragment'. (deep search)
 *
 * @since v1.0.0 (modified v2.0.0)
 * @template T
 * @param {T} children - JSX children
 * @param {any[]} types - Types of children to match
 * @param {object} [{ customTypeKey: boolean = '__TYPE' }] - The configuration params; The custom component prop key to check the type @default { customTypeKey: '__TYPE' }
 * @returns {T[]} - Array of matching children
 * @example
 * // Finds all occurrences of ToDo (custom component), div, and React Fragment
 * getChildrenByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);
 * 
 * // Finds all occurrences of MyComponent (custom component - full component passed in), a div, and React Fragment
 * import MyComponent from './MyComponent';
 * getChildrenByType(children, [MyComponent, 'div', 'react.fragment']);
 */
export const getChildrenByTypeDeep = <T=React.ReactNode>(children: T, types: any[], { customTypeKey = '__TYPE' }: { customTypeKey?: string } = {}) : T[] => {
  const _children = React.Children.toArray(children);
  const _types = processTypes(types);

  let output = [];

  for (const child of _children) {
    if (_types.indexOf(typeOfComponent(child, customTypeKey)) !== -1) {
      output = [...output, child as T];
    } 
    
    if ((child as any)?.props?.children) {
      output = [...output, ...getChildrenByTypeDeep<T>((child as any).props.children, _types, { customTypeKey })];
    }
  }

  return output;
};