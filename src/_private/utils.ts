import * as React from 'react';
import { typeOfComponent } from '../typeOfComponent';

export const processTypes = (types: any[]) : any[] => types.map(x => {
  switch (typeof x) {
    case 'string':
      return x;
     
    case 'function':
      return typeOfComponent(React.createElement(x));
      
    default:
      return typeOfComponent(x);
  }
});