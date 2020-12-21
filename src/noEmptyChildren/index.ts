import { typeOfComponent } from '../typeOfComponent';

/**
 * Ensure that there is content by no empty children (deep search)
 *
 * @since v1.0.0
 * @param {any} component - A component, array of components, or content of a component
 * @param {NoEmptyConfig} [config] - Configuration options for custom components
 * @returns {boolean} - Whether or not there is content provided. true = content is provided as children at some depth; false = no content is provided as children at any depth
 * @example
 * noEmptyChildrenDeep(component, { ignore: ['CustomComponent'], rejectCustom: false, rejectEmptyCustom: true })
 */
export const noEmptyChildrenDeep = (component: any, { ignore = [], rejectCustom = true, rejectEmptyCustom = false }: NoEmptyConfig = {}) : boolean => {
  if (ignore.indexOf(typeOfComponent(component)) >= 0) return true;

  if (Array.isArray(component)) {
    for (const item of component) {
      if (noEmptyChildrenDeep(item,  { ignore, rejectCustom, rejectEmptyCustom })) {
        return true;
      }
    }

    return false;
  }

  if (typeof component.type === 'string' && !component.props) {
    return false;
  }

  if ((typeof component.type === 'string' || (typeOfComponent(component) === 'react.fragment')) && component.props.children) {
    return noEmptyChildrenDeep(component.props.children,  { ignore, rejectCustom, rejectEmptyCustom });
  } else if (typeof component.type === 'string' || typeOfComponent(component) === 'react.fragment') {
    return false;
  }

  if (rejectEmptyCustom && isCustom(component) && !component?.props?.children) {
    return false;
  }

  return true;
};

const isCustom = (component: any) => typeof component !== 'string' && typeof component.type !== 'string';

export type NoEmptyConfig = { ignore?: string[], rejectCustom?: boolean, rejectEmptyCustom?: boolean };