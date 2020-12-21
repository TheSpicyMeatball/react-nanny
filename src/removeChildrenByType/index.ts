import * as React from 'react';
import { typeOfComponent } from '../typeOfComponent';

/**
 * Removes all children by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To remove a React Fragment, use type 'react.fragment'.
 *
 * @since v1.0.0
 * @template T
 * @param {T} children - JSX children
 * @param {string[]} types - Types of children to match
 * @param {string} [customTypeKey='__TYPE'] - The custom component prop key to check the type
 * @returns {T[]} - All non-matching children
 * @example
 * // Removes all occurrences of ToDo (custom component), div, and React Fragment
 * removeChildrenByType(children, ['ToDo', 'div', 'react.fragment']);
 */
export const removeChildrenByType = <T=React.ReactNode>(children: T, types: string[], customTypeKey: string = '__TYPE') : T[] =>
  React.Children.toArray(children).filter(child => types.indexOf(typeOfComponent(child, customTypeKey)) === -1) as T[];

/**
 * Removes all children by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To remove a React Fragment, use type 'react.fragment'. (deep search)
 *
 * @since v1.0.0
 * @template T
 * @param {T} children - JSX children
 * @param {string[]} types - Types of children to match
 * @param {string} [customTypeKey='__TYPE'] - The custom component prop key to check the type
 * @returns {T[]} - All non-matching children
 * @example
 * // Removes all occurrences of ToDo (custom component), div, and React Fragment
 * removeChildrenByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);
 */
export const removeChildrenByTypeDeep = <T=React.ReactNode>(children: T, types: string[], customTypeKey: string = '__TYPE') : T[] => {
  const _children = React.Children.toArray(children);

  let output = [];

  for (const child of _children) {
    if (types.indexOf(typeOfComponent(child, customTypeKey)) === -1) {

      if ((child as any)?.props?.children) {
        output = [
          ...output, 
          {
            ...(child as any),
            props: {
              ...(child as any).props,
              children: Array.isArray((child as any).props.children) 
                        ? removeChildrenByTypeDeep<T>((child as any).props.children, types, customTypeKey)
                        : removeChildrenByTypeDeep<T>((child as any).props.children, types, customTypeKey)[0] ?? [],
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