

<h2>getChildDeep&lt;T=React.ReactNode, TC=React.ReactNode&gt;</h2>
<p>Gets first child by specified predicate (deep search)</p>
<p>Since v1.0.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: TC) =&gt; boolean</td></tr></tbody>
    </table><p><b>Returns:</b> {TChild} - The first matching child</p>
  <h4>Import</h4>

```
import { getChildDeep } from 'react-nanny';
```

  <h4>Examples</h4>





```    
// Finds the first occurrence of a child that has a prop of 'active' set to true
getChildDeep(children, child => child.props.active);
```

    