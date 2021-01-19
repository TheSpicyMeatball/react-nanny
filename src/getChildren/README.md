

<h2>getChildren&lt;T=React.ReactNode&gt;</h2>
<p>Gets all children by specified predicate</p>
<p>Since v1.0.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) =&gt; boolean</td></tr></tbody>
    </table><p><b>Returns:</b> {T[]} - All matching children</p>
  <h4>Import</h4>

```
import { getChildren } from 'react-nanny';
```

  <h4>Examples</h4>





```    
// Finds all children that have an 'active' prop set to true
getChildren(children, child => child.props.active);
```

    