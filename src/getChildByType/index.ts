import * as React from 'react';
import { typeOfComponent } from '../typeOfComponent';

/**
 * Gets first child by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To find a React Fragment, search for type 'react.fragment'.
 * 
 * @since v1.0.0
 * @template T
 * @param {T} children - JSX children
 * @param {string[]} types - Types of children to match
 * @param {string} [customTypeKey='__TYPE'] The custom component prop key to check the type
 * @returns {T} - The first matching child
 * @example
 * // Finds the first occurrence of either a ToDo (custom component), a div, or a React Fragment
 * getChildByType(children, ['ToDo', 'div', 'react.fragment']);
 */
export const getChildByType = <T=React.ReactNode>(children: T, types: string[], customTypeKey: string = '__TYPE') : T => 
  React.Children.toArray(children).filter(child => types.indexOf(typeOfComponent(child, customTypeKey)) !== -1)[0] as T;

/**
 * Gets first child by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To find a React Fragment, search for type 'react.fragment'.  (deep search)
 * 
 * @since v1.0.0
 * @template T
 * @param {T} children - JSX children
 * @param {string[]} types - Types of children to match
 * @param {string} [customTypeKey='__TYPE'] The custom component prop key to check the type
 * @returns {T} - The first matching child
 * @example
 * // Finds the first occurrence of either a ToDo (custom component), a div, or a React Fragment
 * getChildByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);
 */
export const getChildByTypeDeep = <T=React.ReactNode>(children: T, types: string[], customTypeKey: string = '__TYPE') : T => {
  const _children = React.Children.toArray(children);

  for (const child of _children) {
    if (types.indexOf(typeOfComponent(child, customTypeKey)) !== -1) return child as T;

    if ((child as any)?.props?.children) {
      const result = getChildByTypeDeep<T>((child as any).props.children, types, customTypeKey);

      if (result) return result;
    }
  }

  return;
};