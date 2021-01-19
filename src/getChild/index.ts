import * as React from 'react';
import { NannyNode } from '../types';

/**
 * Gets first child by specified predicate
 * 
 * @since v1.0.0
 * @template T
 * @param {T} children - JSX children
 * @param {(child: T) => boolean} predicate - The predicate to determine if the given child is a match
 * @returns {T} - The first matching child
 * @example
 * // Finds the first occurrence of a child that has a prop of 'active' set to true
 * getChild(children, child => child.props.active);
 */
export const getChild = <T=React.ReactNode>(children: T, predicate: (child: T) => boolean) : T => 
  React.Children.toArray(children).find(predicate) as T;

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
export const getChildDeep = <T=React.ReactNode>(children: T, predicate: (child: T) => boolean) : T => {
  const _children = React.Children.toArray(children);

  for (const child of _children) {
    if (predicate(child as T)) return child as T;

    if ((child as any).props?.children) {
      const result = getChildDeep<T>((child as NannyNode).props.children, predicate);

      if (result) return result;
    }
  }

  return;
};