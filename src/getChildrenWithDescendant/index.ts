import * as React from 'react';
import { getChildDeep } from '../getChild';
import { toChildrenArray } from '../_private/utils';

/**
 * Gets all children by specified predicate or that have a descendant node in their lineage which matches the predicate
 * 
 * @since v2.6.0
 * @template T
 * @template TC - Type of child
 * @param {T} children - JSX children
 * @param {(child: TC) => boolean} predicate - The predicate to determine if the given child is a match
 * @returns {TC[]} - All children that match the predicate or have a descendant which matches the predicate
 */
export const getChildrenWithDescendant = <T=React.ReactNode, TC=React.ReactNode>(children: T, predicate: (child: TC) => boolean) : TC[] => {
  const _children = toChildrenArray(children);

  let output: TC[] = [];

  for (const child of _children) {
    if (getChildDeep(child, predicate)) {
      output = [...output, child as TC];
    } 
  }

  return output;
};