

<h2>overridePropsDeep&lt;T=React.ReactNode, TC=React.ReactNode&gt;</h2>
<p>Immutably override props of the children and all descendants (deep)</p>
<blockquote><p>This function is a handy shortcut for when you may need to override the props of your deeply nested child components and is an alternative for writing your own looped <em>React.cloneElement</em> calls.</p></blockquote><p>Since v2.10.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>getChildOverrides</b></p>Callback function that returns an object containing the props you wish to override for each child</td><td>(child: T) =&gt; object</td></tr></tbody>
    </table><p><b>Returns:</b> {TC[]} - All children with modified prop values</p>
  <h4>Import</h4>

```
import { overridePropsDeep } from 'react-nanny';
```

  <h4>Examples</h4>





```    
* 
// This will override the active prop for each child component to {true}
overridePropsDeep(children, () => ({ active: true }));

// This will override the active prop for each child component to {true} where child has a title prop = 'Supervisor'
overridePropsDeep(children, child => child.props.title === 'Supervisor' ? ({ active: true }) : {});
```

    