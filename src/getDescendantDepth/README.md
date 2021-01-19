

<h2>getDescendantDepth&lt;T=React.ReactNode&gt;</h2>
<p>Gets the depth to the first descendant (or self) of each root child that match the specified predicate</p>
<blockquote><p>If the child does not match the predicate or have a descendant that matches, the child is not returned with the result.</p></blockquote><p>Since v2.6.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) =&gt; boolean</td></tr></tbody>
    </table><p><b>Returns:</b> {IDescendantDepth&lt;T&gt;[]} - The oldest ancestor with the depth to the matching descendant</p><h4>Supporting Types</h4>

```
// The item type in the returned array:
//   ancestor: T - The oldest ancestor of a matching descendant
//   depthToMatch: number - The depth to the first predicate match; 0 indicates that the oldest ancestor matches

export interface IDescendantDepth<T=React.ReactNode>{ ancestor: T, depthToMatch: number }
```
  <h4>Import</h4>

```
import { getDescendantDepth } from 'react-nanny';
```

  <h4>Examples</h4>





```    
// Gets the depth for all descendants with a prop of 'active' set to true
getDescendantDepth(children, child => child.props.active);
```

    