import * as React from 'react';
import { NannyNode } from '../types';

/**
 * Gets first child by specified predicate
 * 
 * @since v1.0.0
 * @template T
 * @template TC - Type of child
 * @param {T} children - JSX children
 * @param {(child: TChild) => boolean} predicate - The predicate to determine if the given child is a match
 * @returns {TChild} - The first matching child
 * @example
 * // Finds the first occurrence of a child that has a prop of 'active' set to true
 * getChild(children, child => child.props.active);
 */
export const getChild = <T=React.ReactNode, TC=React.ReactNode>(children: T, predicate: (child: TC) => boolean) : TC => 
  React.Children.toArray(children).find(predicate) as TC;

/**
 * Gets first child by specified predicate (deep search)
 * 
 * @since v1.0.0
 * @template T
 * @template TC - Type of child
 * @param {T} children - JSX children
 * @param {(child: TC) => boolean} predicate - The predicate to determine if the given child is a match
 * @returns {TChild} - The first matching child
 * @example
 * // Finds the first occurrence of a child that has a prop of 'active' set to true
 * getChildDeep(children, child => child.props.active);
 */
export const getChildDeep = <T=React.ReactNode, TC=React.ReactNode>(children: T, predicate: (child: TC) => boolean) : TC => {
  const _children = React.Children.toArray(children);

  for (const child of _children) {
    if (predicate(child as TC)) return child as TC;

    if ((child as any)?.props?.children) {
      const result = getChildDeep<T, TC>((child as NannyNode).props.children, predicate);

      if (result) return result;
    }
  }

  return;
};