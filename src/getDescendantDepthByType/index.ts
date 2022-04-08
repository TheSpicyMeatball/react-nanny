import * as React from 'react';
import { IDescendantDepth, NannyNode } from '../types';
import { typeOfComponent } from '../typeOfComponent';
import { processTypes } from '../_private/utils';
import { toChildrenArray } from '../_private/utils';

/**
 * Gets the depth to the first descendant (or self) of each root child that match the specified types 
 * 
 * @since v2.6.0
 * @template T
 * @template TC
 * @param {T} children - JSX children
 * @param {TC | TC[]} types - Types of children to match
 * @param {GetDescendantDepthByTypeConfig} [config={ customTypeKey: '__TYPE' }] - The configuration params
 * @returns {IDescendantDepth<T>[]} - The oldest ancestor with the depth to the matching descendant
 * @example
 * // Gets depth for all descendants that are of type ToDo (custom component), div, or React Fragment
 * getDescendantDepthByType(children, ['ToDo', 'div', 'react.fragment']);
 * 
 * // Gets depth for all descendants that are of type MyComponent (custom component - full component passed in), a div, and React Fragment
 * import MyComponent from './MyComponent';
 * getDescendantDepthByType(children, [MyComponent, 'div', 'react.fragment']);
 * 
 * // Gets depth for all descendants that are of type ToDo (custom component) with a customized {customTypeKey}
 * getDescendantDepthByType(children, ['ToDo'], { customTypeKey: 'myTypeKey' });
 * @docgen_types
 * // The configuration type for the util:
 * //   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type
 * 
 * export type GetDescendantDepthByTypeConfig = { customTypeKey?: string };
 * 
 * // The item type in the returned array:
 * //   ancestor: T - The oldest ancestor of a matching descendant
 * //   depthToMatch: number - The depth to the first predicate match; 0 indicates that the oldest ancestor matches
 * 
 * export interface IDescendantDepth<T=React.ReactNode>{ ancestor: T, depthToMatch: number }
 * @docgen_description_note
 * If the child does not match any of the specified types or have a descendant that matches, the child is not returned with the result.
 * @docgen_import { getDescendantDepthByType, GetDescendantDepthByTypeConfig }
 * @docgen_imp_note <em>GetDescendantDepthByTypeConfig</em> is a TypeScript type and is only for (optional) use with TypeScript projects
 */
export const getDescendantDepthByType = <T=React.ReactNode, TC=unknown>(children: T, types: TC | Array<TC>, { customTypeKey = '__TYPE' }: GetDescendantDepthByTypeConfig = {}) : IDescendantDepth<T>[] => {
  const _children = toChildrenArray(children);
  const _types = processTypes(Array.isArray(types) ? types : [types]);

  // recursively get the depth of the first matching child
  const getDepth = <T=React.ReactNode>(children: T, level: number) : number => {
    const _children = toChildrenArray(children);

    for (const child of _children) {
      if (_types.indexOf(typeOfComponent(child, customTypeKey)) !== -1) {
        return level + 1;
      } 
      
      if ((child as NannyNode).props?.children) {
        const result = getDepth<T>((child as NannyNode).props.children, level + 1);

        if (result > 0) return result;
      }
    }
  
    return -1;
  };

  let output: IDescendantDepth<T>[] = [];

  for (const child of _children) {
    const depthToMatch = getDepth(child, -1);

    if (depthToMatch >= 0) {
      output = [...output, { ancestor: child as T, depthToMatch }];
    }
  }

  return output;
};

export type GetDescendantDepthByTypeConfig = { customTypeKey?: string };