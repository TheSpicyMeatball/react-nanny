import * as React from 'react';
import { typeOfComponent } from '../typeOfComponent';

export const processTypes = (types: any[]) : any[] => types.map(x => typeof x === 'string' ? x : typeOfComponent(React.createContext(x)));