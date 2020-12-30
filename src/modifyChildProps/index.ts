import * as React from 'react';

/**
 * Immutably modifies props of the children of the component
 *
 * @since v2.3.0
 * @param {React.ReactElement} component - The component whose children you want to modify
 * @param {<T=any>(child: T, index?: number) => Record<string, unknown>} callback - Types of children to match
 * @param {object} [selfProps] - Any other props to modify on the original component
 * @returns {React.ReactElement} The original component with the children with modified prop values
 * @example
 * // This will set the active prop for each child component to {true}
 * modifyChildProps(component, () => ({ active: true }));
 * 
 * // This will set the active prop for each child component to {true} where child has a title prop = 'Supervisor'
 * modifyChildProps(component, child => child.props.title === 'Supervisor' ? ({ active: true }) : {});
 * 
 * // This will set the active prop for each child component to {true} and update the hello prop on the root component
 * modifyChildProps(component, () => ({ active: true }), { hello: 'Hola mundo' });
 * @docgen_description_note
 * This function is a handy shortcut for when you may need to override the props of your children components and is an alternative for writing your own looped <em>React.cloneElement</em> calls.
 */
export const modifyChildProps = (component: React.ReactElement, callback: <T=any>(child: T, index?: number) => Record<string, unknown>, selfProps: Record<string, unknown> = {}) : React.ReactElement => {
  if (!component) return component;
  if (!component?.props?.children) return React.cloneElement(component, selfProps);

  if (Array.isArray(component.props.children)) {
    return React.cloneElement(component, {
      ...selfProps,
      children: React.Children.toArray(component.props.children).map((child: any, index?: number) => React.cloneElement(child, callback(child, index))),
    });
  }

  return React.cloneElement(component, {
    ...selfProps,
    children: React.cloneElement(component.props.children, callback(component.props.children, 0)),
  });
};