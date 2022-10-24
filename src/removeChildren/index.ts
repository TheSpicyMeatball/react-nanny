import * as React from 'react';
import { NannyNode } from '../types';

/**
 * Removes all children by specified predicate
 *
 * @since v1.0.0
 * @template T
 * @template TC - Type of child
 * @param {T} children - JSX children
 * @param {(child: T) => boolean} predicate - The predicate to determine if the given child is a match
 * @returns {T[]} - All non-matching children
 * @example
 * // Removes all children that have an 'active' prop set to false
 * removeChildren(children, child => !child.props.active);
 */
export const removeChildren = <T=React.ReactNode, TC=React.ReactNode>(children: T, predicate: (child: TC) => boolean) : TC[] =>
  React.Children.toArray(children).filter((child: TC) => !predicate(child)) as TC[];

/**
 * Removes all children by specified predicate (deep search)
 *
 * @since v1.0.0
 * @template T
 * @template TC - Type of child
 * @param {T} children - JSX children
 * @param {(child: TC) => boolean} predicate - The predicate to determine if the given child is a match
 * @returns {T[]} - All non-matching children
 * @example
 * // Removes all children that have an 'active' prop set to false
 * removeChildrenDeep(children, child => !child.props.active);
 */
export const removeChildrenDeep = <T=React.ReactNode, TC=React.ReactNode>(children: T, predicate: (child: TC) => boolean) : TC[] => {
  const _children = React.Children.toArray(children);

  let output = [];

  for (const child of _children) {
    if (!predicate(child as TC)) {
      if ((child as NannyNode)?.props?.children) {
        output = [
          ...output, 
          Object.assign((child as NannyNode), {
            props: Object.assign((child as NannyNode).props, {
              children: Array.isArray((child as NannyNode).props.children) 
                        ? removeChildrenDeep<T>((child as NannyNode).props.children, predicate)
                        : removeChildrenDeep<T>((child as NannyNode).props.children, predicate)[0],
            }),
          }),
        ];
      } else {
        output = [...output, child as TC];
      }
    } 
  }

  return output;
};