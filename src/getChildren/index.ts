import * as React from 'react';
import { NannyNode } from '../types';

/**
 * Gets all children by specified predicate
 *
 * @since v1.0.0
 * @template T
 * @template TC - Type of child
 * @param {T} children - JSX children
 * @param {(child: TC) => boolean} predicate - The predicate to determine if the given child is a match
 * @returns {TC[]} - All matching children
 * @example
 * // Finds all children that have an 'active' prop set to true
 * getChildren(children, child => child.props.active);
 */
export const getChildren = <T=React.ReactNode, TC=React.ReactNode>(children: T, predicate: (child: TC) => boolean) : TC[] =>
  React.Children.toArray(children).filter(predicate) as TC[];

/**
 * Gets all children by specified predicate (deep search)
 * 
 * @since v1.0.0
 * @template T
 * @template TC - Type of child
 * @param {T} children - JSX children
 * @param {(child: TC) => boolean} predicate - The predicate to determine if the given child is a match
 * @returns {TC[]} - All matching children
 * @example
 * // Finds the first occurrence of a child that has a prop of 'active' set to true
 * getChildrenDeep(children, child => child.props.active);
 */
export const getChildrenDeep = <T=React.ReactNode, TC=React.ReactNode>(children: T, predicate: (child: TC) => boolean) : TC[] => {
  const _children = React.Children.toArray(children);

  let output: TC[] = [];

  for (const child of _children) {
    if (predicate(child as TC)) {
      output = [...output, child as TC];
    } 
    
    if ((child as NannyNode).props?.children) {
      output = [...output, ...getChildrenDeep<T, TC>((child as NannyNode).props.children, predicate)];
    }
  }

  return output;
};