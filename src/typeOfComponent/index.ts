/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * Gets the string type of the component's {customTypeKey}, string type of the core html (JSX intrinsic) element, or the function type
 *
 * @since v1.0.0
 * @param {any} component - The component to type check
 * @param {string} [customTypeKey='__TYPE'] - The custom component prop key to check the type
 * @returns {string} - The string representation of the type
 * @docgen_note
 * React Fragments will return type 'react.fragment'. Priority will be given to the <em>{customTypeKey}</em> if one exists
 */
export const typeOfComponent = (component: any, customTypeKey = '__TYPE') : string =>
  (component?.props && component.props[customTypeKey]) ||
  (typeof component?.type === 'string' && component.type) ||
  (component?.type && typeof component.type === 'symbol' && component.type.toString() === 'Symbol(react.fragment)' && 'react.fragment') ||
  (typeof component?.type === 'function' && component.type) ||
  (typeof component === 'string' && 'string') ||
  undefined;