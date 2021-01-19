import * as React from 'react';
import { getChildDeep } from '../getChild';

/**
 * Gets all children by specified predicate or that have a descendant node in their lineage which matches the predicate
 * 
 * @since v2.6.0
 * @template T
 * @param {T} children - JSX children
 * @param {(child: T) => boolean} predicate - The predicate to determine if the given child is a match
 * @returns {T[]} - All children that match the predicate or have a descendant which matches the predicate
 * @example
 * // Finds all children that have a descendant with a prop of 'active' set to true
 * getChildrenWithDescendant(children, child => child.props.active);
 */
export const getChildrenWithDescendant = <T=React.ReactNode>(children: T, predicate: (child: T) => boolean) : T[] => {
  const _children = React.Children.toArray(children);

  let output = [];

  for (const child of _children) {
    if (getChildDeep(child, predicate)) {
      output = [...output, child as T];
    } 
  }

  return output;
};