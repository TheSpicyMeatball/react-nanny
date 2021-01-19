

<h2>removeChildrenDeep&lt;T=React.ReactNode&gt;</h2>
<p>Removes all children by specified predicate (deep search)</p>
<p>Since v1.0.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) =&gt; boolean</td></tr></tbody>
    </table><p><b>Returns:</b> {T[]} - All non-matching children</p>
  <h4>Import</h4>

```
import { removeChildrenDeep } from 'react-nanny';
```

  <h4>Examples</h4>





```    
// Removes all children that have an 'active' prop set to false
removeChildrenDeep(children, child => !child.props.active);
```

    