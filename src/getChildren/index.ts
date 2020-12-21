import * as React from 'react';

/**
 * Gets all children by specified predicate
 *
 * @since v1.0.0
 * @template T
 * @param {T} children - JSX children
 * @param {(child: T) => boolean} predicate - The predicate to determine if the given child is a match
 * @returns {T[]} - Array of matching children
 * @example
 * // Finds all children that have an 'active' prop set to true
 * getChildren(children, child => child.props.active);
 */
export const getChildren = <T=React.ReactNode>(children: T, predicate: (child: T) => boolean) : T[] =>
  React.Children.toArray(children).filter(predicate) as T[];

/**
 * Gets first child by specified predicate (deep search)
 * 
 * @since v1.0.0
 * @template T
 * @param {T} children - JSX children
 * @param {(child: T) => boolean} predicate - The predicate to determine if the given child is a match
 * @returns {T} - The first matching child
 * @example
 * // Finds the first occurrence of a child that has a prop of 'active' set to true
 * getChildDeep(children, child => child.props.active);
 */
export const getChildrenDeep = <T=React.ReactNode>(children: T, predicate: (child: T) => boolean) : T[] => {
  const _children = React.Children.toArray(children);

  let output = [];

  for (const child of _children) {
    if (predicate(child as T)) {
      output = [...output, child as T];
    } 
    
    if ((child as any)?.props?.children) {
      output = [...output, ...getChildrenDeep<T>((child as any).props.children, predicate)];
    }
  }

  return output;
};