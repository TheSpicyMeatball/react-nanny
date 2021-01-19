

<h2>removeChildrenByTypeDeep&lt;T=React.ReactNode&gt;</h2>
<p>Removes all children by specified type (deep search)</p>
<p>Since v1.0.0 (modified v2.0.0)</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>any[]</td></tr><tr><td><p><b>{ customTypeKey: '__TYPE' } <span>(optional)</span></b></p>The configuration params</td><td>RemoveChildrenByTypeConfig</td></tr></tbody>
    </table><p><b>Returns:</b> {T[]} - All non-matching children</p><blockquote><p>This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To remove a React Fragment, search for <em>'react.fragment'</em>.</p></blockquote>
  <h4>Import</h4>

```
import { removeChildrenByTypeDeep, RemoveChildrenByTypeConfig } from 'react-nanny';
```

  <blockquote><p><em>RemoveChildrenByTypeConfig</em> is a TypeScript type and is only for (optional) use with TypeScript projects</p></blockquote><h4>Examples</h4>





```    
// Removes all occurrences of ToDo (custom component), div, and React Fragment
removeChildrenByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);

// Removes all occurrences of MyComponent (custom component - full component passed in), a div, and React Fragment
import MyComponent from './MyComponent';
removeChildrenByTypeDeep(children, [MyComponent, 'div', 'react.fragment']);

// Removes all occurrences of MyComponent (custom component - as React.ReactNode), a div, and React Fragment
const component = getChildByType(['MyComponent']);
removeChildrenByTypeDeep(children, [component, 'div', 'react.fragment']);

// Removes all occurrences of ToDo (custom component) with a customized {customTypeKey}
removeChildrenByTypeDeep(children, ['ToDo'], { customTypeKey: 'myTypeKey' });
```

    