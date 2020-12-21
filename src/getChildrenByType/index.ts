import * as React from 'react';
import { typeOfComponent } from '../typeOfComponent';

/**
 * Gets all children by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To find a React Fragment, search for type 'react.fragment'.
 *
 * @since v1.0.0
 * @template T
 * @param {T} children - JSX children
 * @param {string[]} types - Types of children to match
 * @param {string} [customTypeKey='__TYPE'] - The custom component prop key to check the type
 * @returns {T[]} - Array of matching children
 * @example
 * // Finds all occurrences of ToDo (custom component), div, and React Fragment
 * getChildrenByType(children, ['ToDo', 'div', 'react.fragment']);
 */
export const getChildrenByType = <T=React.ReactNode>(children: T, types: string[], customTypeKey: string = '__TYPE') : T[] =>
  React.Children.toArray(children).filter(child => types.indexOf(typeOfComponent(child, customTypeKey)) !== -1) as T[];


/**
 * Gets all children by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To find a React Fragment, search for type 'react.fragment'. (deep search)
 *
 * @since v1.0.0
 * @template T
 * @param {T} children - JSX children
 * @param {string[]} types - Types of children to match
 * @param {string} [customTypeKey='__TYPE'] - The custom component prop key to check the type
 * @returns {T[]} - Array of matching children
 * @example
 * // Finds all occurrences of ToDo (custom component), div, and React Fragment
 * getChildrenByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);
 */
export const getChildrenByTypeDeep = <T=React.ReactNode>(children: T, types: string[], customTypeKey: string = '__TYPE') : T[] => {
  const _children = React.Children.toArray(children);

  let output = [];

  for (const child of _children) {
    if (types.indexOf(typeOfComponent(child, customTypeKey)) !== -1) {
      output = [...output, child as T];
    } 
    
    if ((child as any)?.props?.children) {
      output = [...output, ...getChildrenByTypeDeep<T>((child as any).props.children, types, customTypeKey)];
    }
  }

  return output;
};