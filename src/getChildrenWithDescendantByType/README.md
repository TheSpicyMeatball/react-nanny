

<h2>getChildrenWithDescendantByType&lt;T=React.ReactNode&gt;</h2>
<p>Gets all children by specified type or that have a descendant node in their lineage which match the specified type</p>
<p>Since v2.6.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>any[]</td></tr><tr><td><p><b>{ customTypeKey: '__TYPE' } <span>(optional)</span></b></p>The configuration params</td><td>GetChildrenWithDescendantByTypeConfig</td></tr></tbody>
    </table><p><b>Returns:</b> {T[]} - All children that match the specified type or have a descendant which matches the specified type</p><blockquote><p>This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To find a React Fragment, search for <em>'react.fragment'</em>.</p></blockquote><h4>Supporting Types</h4>

```
// The configuration type for the util:
//   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type

export type GetChildrenWithDescendantByTypeConfig = { customTypeKey?: string };
```
  <h4>Import</h4>

```
import { getChildrenWithDescendantByType, GetChildrenWithDescendantByTypeConfig } from 'react-nanny';
```

  <blockquote><p><em>GetChildrenWithDescendantByTypeConfig</em> is a TypeScript type and is only for (optional) use with TypeScript projects</p></blockquote><h4>Examples</h4>



```
<MyComponent>
  <div>
    <Hello>
      <World />
    </Hello>
  </div>
  <div />
  <div />
  <div />
  <World />
</MyComponent>

// Inside MyComponent...
getChildrenWithDescendantByType(children, ['World'])

// Returns the first child because it contains a World component as a descendant and
// returns the last child because it matches the type. Doesn't return the empty divs 
// because they aren't World components and they don't contain a World descendant.
// =>
[
  <div>
    <Hello>
      <World />
    </Hello>
  </div>,
  <World />
]
```

<h4>Other Examples</h4>






```    
// Finds all root children that are of type or have a descendant of type ToDo (custom component), div, or React Fragment
getChildrenWithDescendantByType(children, ['ToDo', 'div', 'react.fragment']);

// Finds all root children that are of type or have a descendant of type MyComponent (custom component - full component passed in), a div, and React Fragment
import MyComponent from './MyComponent';
getChildrenWithDescendantByType(children, [MyComponent, 'div', 'react.fragment']);

// Finds all root children that are of type or have a descendant of type ToDo (custom component) with a customized {customTypeKey}
getChildrenWithDescendantByType(children, ['ToDo'], { customTypeKey: 'myTypeKey' });
```

    