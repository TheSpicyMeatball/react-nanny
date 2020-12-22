import * as React from 'react';

import { processTypes } from './../_private/utils';
import { typeOfComponent } from '../typeOfComponent';

/**
 * Removes all children by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To remove a React Fragment, use type 'react.fragment'.
 *
 * @since v1.0.0 (modified v2.0.0)
 * @template T
 * @param {T} children - JSX children
 * @param {any[]} types - Types of children to match
 * @param {object} [{ customTypeKey: boolean = '__TYPE' }] - The configuration params; The custom component prop key to check the type @default { customTypeKey: '__TYPE' }
 * @returns {T[]} - All non-matching children
 * @example
 * // Removes all occurrences of ToDo (custom component), div, and React Fragment
 * removeChildrenByType(children, ['ToDo', 'div', 'react.fragment']);
 * 
 * // Removes all occurrences of MyComponent (custom component - full component passed in), a div, and React Fragment
 * import MyComponent from './MyComponent';
 * removeChildrenByTypeDeep(children, [MyComponent, 'div', 'react.fragment']);
 */
export const removeChildrenByType = <T=React.ReactNode>(children: T, types: any[], { customTypeKey = '__TYPE' }: { customTypeKey?: string } = {}) : T[] => {
  const _types = processTypes(types);
  return React.Children.toArray(children).filter(child => _types.indexOf(typeOfComponent(child, customTypeKey)) === -1) as T[];
}

/**
 * Removes all children by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To remove a React Fragment, use type 'react.fragment'. (deep search)
 *
 * @since v1.0.0 (modified v2.0.0)
 * @template T
 * @param {T} children - JSX children
 * @param {any[]} types - Types of children to match
 * @param {object} [{ customTypeKey: boolean = '__TYPE' }] - The configuration params; The custom component prop key to check the type @default { customTypeKey: '__TYPE' }
 * @returns {T[]} - All non-matching children
 * @example
 * // Removes all occurrences of ToDo (custom component), div, and React Fragment
 * removeChildrenByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);
 * 
 * // Removes all occurrences of MyComponent (custom component - full component passed in), a div, and React Fragment
 * import MyComponent from './MyComponent';
 * removeChildrenByTypeDeep(children, [MyComponent, 'div', 'react.fragment']);
 */
export const removeChildrenByTypeDeep = <T=React.ReactNode>(children: T, types: any[], { customTypeKey = '__TYPE' }: { customTypeKey?: string } = {}) : T[] => {
  const _children = React.Children.toArray(children);
  const _types = processTypes(types);
  let output = [];

  for (const child of _children) {
    if (_types.indexOf(typeOfComponent(child, customTypeKey)) === -1) {

      if ((child as any)?.props?.children) {
        output = [
          ...output, 
          {
            ...(child as any),
            props: {
              ...(child as any).props,
              children: Array.isArray((child as any).props.children) 
                        ? removeChildrenByTypeDeep<T>((child as any).props.children, _types, { customTypeKey })
                        : removeChildrenByTypeDeep<T>((child as any).props.children, _types, { customTypeKey })[0] ?? [],
            }
          }
        ];
      } else {
        output = [...output, child as T];
      }
    } 
  }

  return output;
};