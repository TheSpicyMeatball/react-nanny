/**
 * Gets the string type of the component or core html (JSX) element. React Fragments will return type 'react.fragment'. Priority will be given to the prop '__TYPE'.
 *
 * @since v1.0.0
 * @param {any} component - The component to type check
 * @param {string} [customTypeKey='__TYPE'] - The custom component prop key to check the type
 * @returns {string} - The string representation of the type
 */
export const typeOfComponent = (component: any, customTypeKey: string = '__TYPE') : string =>
  (component?.props && component?.props[customTypeKey]) ||
  component?.type?.toString().replace('Symbol(react.fragment)', 'react.fragment') ||
  (typeof component === 'string' ? 'string' : undefined) ||
  undefined;