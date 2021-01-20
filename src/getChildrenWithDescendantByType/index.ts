import * as React from 'react';
import { getChildByTypeDeep } from '../getChildByType';

/**
 * Gets all children by specified type or that have a descendant node in their lineage which match the specified type
 * 
 * @since v2.6.0
 * @template T
 * @param {T} children - JSX children
 * @param {any[]} types - Types of children to match
 * @param {GetChildrenWithDescendantByTypeConfig} [config={ customTypeKey: '__TYPE' }] - The configuration params
 * @returns {T[]} - All children that match the specified type or have a descendant which matches the specified type
 * @docgen_types
 * // The configuration type for the util:
 * //   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type
 * 
 * export type GetChildrenWithDescendantByTypeConfig = { customTypeKey?: string };
 * @example
 * // Finds all root children that are of type or have a descendant of type ToDo (custom component), div, or React Fragment
 * getChildrenWithDescendantByType(children, ['ToDo', 'div', 'react.fragment']);
 * 
 * // Finds all root children that are of type or have a descendant of type MyComponent (custom component - full component passed in), a div, and React Fragment
 * import MyComponent from './MyComponent';
 * getChildrenWithDescendantByType(children, [MyComponent, 'div', 'react.fragment']);
 * 
 * // Finds all root children that are of type or have a descendant of type ToDo (custom component) with a customized {customTypeKey}
 * getChildrenWithDescendantByType(children, ['ToDo'], { customTypeKey: 'myTypeKey' });
 * @docgen_note
 * This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To find a React Fragment, search for <em>'react.fragment'</em>.
 * @docgen_import { getChildrenWithDescendantByType, GetChildrenWithDescendantByTypeConfig }
 * @docgen_imp_note <em>GetChildrenWithDescendantByTypeConfig</em> is a TypeScript type and is only for (optional) use with TypeScript projects
 */
export const getChildrenWithDescendantByType = <T=React.ReactNode>(children: T, types: any[], { customTypeKey = '__TYPE' }: GetChildrenWithDescendantByTypeConfig = {}) : T[] => {
  const _children = React.Children.toArray(children);

  let output = [];

  for (const child of _children) {
    if (getChildByTypeDeep(child, types, { customTypeKey, prioritized: false })) {
      output = [...output, child as T];
    } 
  }

  return output;
};


export type GetChildrenWithDescendantByTypeConfig = { customTypeKey?: string };