import * as React from 'react';

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
 * This function is a handy shortcut for when you may need to override the props of your children components and is an alternative for writing your own looped <em>React.cloneElement</em> calls.
 */
export const overrideProps = <T=any>(component: React.ReactElement, getChildOverrides: (child: T, index?: number) => Record<string, unknown>, overrides: Record<string, unknown> = {}) : React.ReactElement => {
  if (!component) return component;

  const _overrides = overrides ?? {};
  if (!component?.props?.children) return React.cloneElement(component, _overrides);

  if (Array.isArray(component.props.children)) {
    return React.cloneElement(component, Object.assign(_overrides, {
      children: React.Children.toArray(component.props.children).map((child: any, index?: number) => React.cloneElement(child, getChildOverrides(child, index))),
    }));
  }

  return React.cloneElement(component, Object.assign(_overrides, {
    children: React.cloneElement(component.props.children, getChildOverrides(component.props.children, 0)),
  }));
};