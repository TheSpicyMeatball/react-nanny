import * as React from 'react';

import { processTypes } from '../_private/utils';
import { typeOfComponent } from '../typeOfComponent';

/**
 * Gets all children by specified type
 *
 * @since v1.0.0 (modified v2.0.0)
 * @template T
 * @param {T} children - JSX children
 * @param {any[]} types - Types of children to match
 * @param {GetChildrenByTypeConfig} [{ customTypeKey: '__TYPE' }] - The configuration params
 * @returns {T[]} - Array of matching children
 * @docgen_types
 * // The configuration type for the util:
 * //   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type
 * 
 * export type GetChildrenByTypeConfig = { customTypeKey?: string };
 * @example
 * // Finds all occurrences of ToDo (custom component), div, and React Fragment
 * getChildrenByType(children, ['ToDo', 'div', 'react.fragment']);
 * 
 * // Finds all occurrences of MyComponent (custom component - full component passed in), a div, and React Fragment
 * import MyComponent from './MyComponent';
 * getChildrenByType(children, [MyComponent, 'div', 'react.fragment']);
 * 
 * // Finds all occurrences of ToDo (custom component) with a customized {customTypeKey}
 * getChildrenByType(children, ['ToDo'], { customTypeKey: 'myTypeKey' });
 * @docgen_note
 * This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To find a React Fragment, search for <em>'react.fragment'</em>.
 * @docgen_import { getChildrenByType, GetChildrenByTypeConfig }
 * @docgen_imp_note <em>GetChildrenByTypeConfig</em> is a TypeScript type and is only for (optional) use with TypeScript projects
 */
export const getChildrenByType = <T=React.ReactNode>(children: T, types: any[], { customTypeKey = '__TYPE' }: GetChildrenByTypeConfig = {}) : T[] => {
  const _types = processTypes(types);
  return React.Children.toArray(children).filter(child => _types.indexOf(typeOfComponent(child, customTypeKey)) !== -1) as T[];
};


/**
 * Gets all children by specified type (deep search)
 * 
 * @since v1.0.0 (modified v2.0.0)
 * @template T
 * @param {T} children - JSX children
 * @param {any[]} types - Types of children to match
 * @param {GetChildrenByTypeConfig} [{ customTypeKey: '__TYPE' }] - The configuration params
 * @returns {T[]} - Array of matching children
 * @docgen_types
 * // The configuration type for the util:
 * //   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type
 * 
 * export type GetChildrenByTypeConfig = { customTypeKey?: string };
 * @example
 * // Finds all occurrences of ToDo (custom component), div, and React Fragment
 * getChildrenByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);
 * 
 * // Finds all occurrences of MyComponent (custom component - full component passed in), a div, and React Fragment
 * import MyComponent from './MyComponent';
 * getChildrenByTypeDeep(children, [MyComponent, 'div', 'react.fragment']);
 * 
 * // Finds all occurrences of ToDo (custom component) with a customized {customTypeKey}
 * getChildrenByTypeDeep(children, ['ToDo'], { customTypeKey: 'myTypeKey' });
 * @docgen_note
 * This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To find a React Fragment, search for <em>'react.fragment'</em>.
 * @docgen_import { getChildrenByTypeDeep, GetChildrenByTypeConfig }
 * @docgen_imp_note <em>GetChildrenByTypeConfig</em> is a TypeScript type and is only for (optional) use with TypeScript projects
 */
export const getChildrenByTypeDeep = <T=React.ReactNode>(children: T, types: any[], { customTypeKey = '__TYPE' }: GetChildrenByTypeConfig = {}) : T[] => {
  const _children = React.Children.toArray(children);
  const _types = processTypes(types);

  let output = [];

  for (const child of _children) {
    if (_types.indexOf(typeOfComponent(child, customTypeKey)) !== -1) {
      output = [...output, child as T];
    } 
    
    if ((child as any)?.props?.children) {
      output = [...output, ...getChildrenByTypeDeep<T>((child as any).props.children, _types, { customTypeKey })];
    }
  }

  return output;
};

export type GetChildrenByTypeConfig = { customTypeKey?: string };