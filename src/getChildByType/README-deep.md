

<h2>getChildByTypeDeep&lt;T=React.ReactNode&gt;</h2>
<p>Gets first child by specified type (deep search)</p>
<p>Since v1.0.0 (modified v2.0.0)</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>any[]</td></tr><tr><td><p><b>{ customTypeKey: '__TYPE', prioritized: false } <span>(optional)</span></b></p>The configuration params</td><td>GetChildByTypeConfig</td></tr></tbody>
    </table><p><b>Returns:</b> {T} - The first matching child</p><blockquote><p>This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To find a React Fragment, search for <em>'react.fragment'</em>.</p></blockquote><h4>Supporting Types</h4>

```
// The configuration type for the util:
//   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type
//   prioritized?: boolean = false - Whether or not the order of types is prioritized

export type GetChildByTypeConfig = { customTypeKey?: string, prioritized?: boolean };
```
  <h4>Import</h4>

```
import { getChildByTypeDeep, GetChildByTypeConfig } from 'react-nanny';
```

  <blockquote><p><em>GetChildByTypeConfig</em> is a TypeScript type and is only for (optional) use with TypeScript projects</p></blockquote><h4>Examples</h4>





```    
// Finds the first occurrence of either a ToDo (custom component w/defined type as prop), a div, or a React Fragment
getChildByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);

// Finds the first occurrence of either a MyComponent (custom component - full component passed in), a div, or a React Fragment
import MyComponent from './MyComponent';
getChildByTypeDeep(children, [MyComponent, 'div', 'react.fragment']);

// Finds the first occurrence of either a ToDo, a div, or a React Fragment with a preference for that order. If ToDo exists, it will return that first. If not, then div, etc.
getChildByTypeDeep(children, ['ToDo', 'div', 'react.fragment'], { prioritized: true });
```

    