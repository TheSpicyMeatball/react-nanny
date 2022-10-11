import * as React from 'react';
import { IDescendantDepth, NannyNode } from '../types';

/**
 * Gets the depth to the first descendant (or self) of each root child that match the specified predicate 
 * 
 * @since v2.6.0
 * @template T
 * @template TC - Type of child
 * @param {T} children - JSX children
 * @param {(child: T) => boolean} predicate - The predicate to determine if the given child is a match
 * @returns {IDescendantDepth<T>[]} - The oldest ancestor with the depth to the matching descendant
 * @docgen_types
 * // The item type in the returned array:
 * //   ancestor: T - The oldest ancestor of a matching descendant
 * //   depthToMatch: number - The depth to the first predicate match; 0 indicates that the oldest ancestor matches
 * 
 * export interface IDescendantDepth<T=React.ReactNode>{ ancestor: T, depthToMatch: number }
 * @docgen_description_note
 * If the child does not match the predicate or have a descendant that matches, the child is not returned with the result.
 */
export const getDescendantDepth = <T=React.ReactNode, TC=React.ReactNode>(children: T, predicate: (child: TC) => boolean) : IDescendantDepth<TC>[] => {
  const _children = React.Children.toArray(children);

  // recursively get the depth of the first matching child
  const getDepth = <T=React.ReactNode, TC=React.ReactNode>(children: T, predicate: (child: TC) => boolean, level: number) : number => {
    const _children = React.Children.toArray(children);
  
    for (const child of _children) {
      if (predicate(child as TC)) return level + 1;
  
      if ((child as any).props?.children) {
        const result = getDepth<T, TC>((child as NannyNode).props.children, predicate, level + 1);
  
        if (result > 0) return result;
      }
    }
  
    return -1;
  };

  let output: IDescendantDepth<TC>[] = [];

  for (const child of _children) {
    const depthToMatch = getDepth(child, predicate, -1);

    if (depthToMatch >= 0) {
      output = [...output, { ancestor: child as TC, depthToMatch }];
    }
  }

  return output;
};