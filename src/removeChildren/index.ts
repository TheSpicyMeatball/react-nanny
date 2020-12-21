import * as React from 'react';

/**
 * Removes all children by specified predicate
 *
 * @since v1.0.0
 * @template T
 * @param {T} children - JSX children
 * @param {(child: T) => boolean} predicate - The predicate to determine if the given child is a match
 * @returns {T[]} - All non-matching children
 * @example
 * // Removes all children that have an 'active' prop set to false
 * removeChildren(children, child => !child.props.active);
 */
export const removeChildren = <T=React.ReactNode>(children: T, predicate: (child: T) => boolean) : T[] =>
  React.Children.toArray(children).filter((child: T) => !predicate(child)) as T[];

/**
 * Removes all children by specified predicate (deep search)
 *
 * @since v1.0.0
 * @template T
 * @param {T} children - JSX children
 * @param {(child: T) => boolean} predicate - The predicate to determine if the given child is a match
 * @returns {T[]} - All non-matching children
 * @example
 * // Removes all children that have an 'active' prop set to false
 * removeChildrenDeep(children, child => !child.props.active);
 */
export const removeChildrenDeep = <T=React.ReactNode>(children: T, predicate: (child: T) => boolean) : T[] => {
  const _children = React.Children.toArray(children);

  let output = [];

  for (const child of _children) {
    if (!predicate(child as T)) {

      if ((child as any)?.props?.children) {
        output = [
          ...output, 
          {
            ...(child as any),
            props: {
              ...(child as any).props,
              children: Array.isArray((child as any).props.children) 
                        ? removeChildrenDeep<T>((child as any).props.children, predicate)
                        : removeChildrenDeep<T>((child as any).props.children, predicate)[0] ?? [],
            }
          }
        ];
      } else {
        output = [...output, child as T];
      }
    } 
  }

  return output;
};