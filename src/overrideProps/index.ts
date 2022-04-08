import * as React from 'react';
import { NannyNode } from '../types';
import { toChildrenArray } from '../_private/utils';

/**
 * Immutably override props of the children of the original component and (optionally) the original component
 *
 * @since v2.3.0
 * @param {React.ReactElement} component - The component whose children you want to modify
 * @param {(child: T, index?: number) => object} getChildOverrides - Callback function that returns an object containing the props you wish to override for each child
 * @param {object} [overrides] - Any other props to override on the original component
 * @returns {React.ReactElement} The original component with the children with modified prop values
 * @example * 
 * // This will override the active prop for each child component to {true}
 * overrideProps(component, () => ({ active: true }));
 * 
 * // This will override the active prop for each child component to {true} where child has a title prop = 'Supervisor'
 * overrideProps(component, child => child.props.title === 'Supervisor' ? ({ active: true }) : {});
 * 
 * // This will override the active prop for each child component to {true} and override the hello prop on the root component
 * overrideProps(component, () => ({ active: true }), { hello: 'Hola mundo' });
 * @docgen_description_note
 * This function is a handy shortcut for when you may need to override the props of your child components and is an alternative for writing your own looped <em>React.cloneElement</em> calls.
 */
export const overrideProps = <T=any>(component: React.ReactElement, getChildOverrides: (child: T, index?: number) => Record<string, unknown>, overrides: Record<string, unknown> = {}) : React.ReactElement => {
  if (!component) return component;

  const _overrides = overrides ?? {};
  if (!component.props && Object.keys(_overrides).length <= 0) return component;
  if (!component.props.children) return React.cloneElement(component, _overrides);

  if (Array.isArray(component.props.children)) {
    return React.cloneElement(component, Object.assign(_overrides, {
      children: toChildrenArray(component.props.children).map((child: any, index?: number) => React.cloneElement(child, getChildOverrides(child, index))),
    }));
  }

  return React.cloneElement(component, Object.assign(_overrides, {
    children: React.cloneElement(component.props.children, getChildOverrides(component.props.children, 0)),
  }));
};

/**
 * Immutably override props of the children and all descendants (deep)
 *
 * @since v2.10.0
 * @param {T} children - JSX children
 * @param {(child: T) => object} getChildOverrides - Callback function that returns an object containing the props you wish to override for each child
 * @returns {TC[]} - All children with modified prop values
 * @example * 
 * // This will override the active prop for each child component to {true}
 * overridePropsDeep(children, () => ({ active: true }));
 * 
 * // This will override the active prop for each child component to {true} where child has a title prop = 'Supervisor'
 * overridePropsDeep(children, child => child.props.title === 'Supervisor' ? ({ active: true }) : {});
 * @docgen_description_note
 * This function is a handy shortcut for when you may need to override the props of your deeply nested child components and is an alternative for writing your own looped <em>React.cloneElement</em> calls.
 */
 export const overridePropsDeep = <T=React.ReactNode, TC=React.ReactNode>(children: T, getChildOverrides: (child: TC) => Record<string, unknown>) : TC[] => {
  if (!children) return [];

  const _children = toChildrenArray(children);

  let output: TC[] = [];

  for (const child of _children) {    
    if ((child as NannyNode).props?.children) {
      const _child = React.cloneElement(child as React.ReactElement, Object.assign(
        getChildOverrides(child as TC),
        { children: overridePropsDeep((child as NannyNode).props.children, getChildOverrides) },
      ));

      output = [...output, _child as unknown as TC];
    } else if ((child as NannyNode).props) {
      const _child = React.cloneElement(child as React.ReactElement, getChildOverrides(child as TC));

      output = [...output, _child as unknown as TC];
    } else {
      output = [...output, child as unknown as TC];
    }
  }

  return output;
};