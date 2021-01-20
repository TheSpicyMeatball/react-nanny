

<h2>getChildrenWithDescendant&lt;T=React.ReactNode&gt;</h2>
<p>Gets all children by specified predicate or that have a descendant node in their lineage which matches the predicate</p>
<p>Since v2.6.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) =&gt; boolean</td></tr></tbody>
    </table><p><b>Returns:</b> {T[]} - All children that match the predicate or have a descendant which matches the predicate</p>
  <h4>Import</h4>

```
import { getChildrenWithDescendant } from 'react-nanny';
```

  <h4>Examples</h4>



```
<MyComponent>
  <div>
    <Hello>
      <World active={true} />
    </Hello>
  </div>
  <div />
  <div />
  <div />
  <World active={true} />
</MyComponent>

// Inside MyComponent...
getChildrenWithDescendant(children, child => child?.props?.active)

// Returns the first child because it contains a descendant that is active and
// returns the last child because it is active. Doesn't return the empty divs
// because they aren't active and they don't contain a descendant that is active.
// =>
[
  <div>
    <Hello>
      <World active={true}/>
    </Hello>
  </div>,
  <World active={true}/>
]
```

<h4>Other Examples</h4>






```    
// Finds all children that have a descendant with a prop of 'active' set to true
getChildrenWithDescendant(children, child => child.props.active);
```

    