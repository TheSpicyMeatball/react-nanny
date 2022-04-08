import * as React from 'react';
import { typeOfComponent } from '../typeOfComponent';

export const processTypes = (types: any[]) : any[] => types.map(x => {
  switch (typeof x) {
    case 'string':
      return x;
     
    case 'function':
      return typeOfComponent(React.createElement(x));

    case 'object': 
    default: {
      const component = React.createElement(x);
      const type = typeOfComponent(component);

      if (type === 'react.forward_ref') {
        return typeOfComponent((component.type as any).render(component.props, component.ref));
      }

      return typeOfComponent(x);
    }
  }
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toChildrenArray = children => Array.isArray(children) ? children : React.Children.toArray(children);