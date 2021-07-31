

<h2>overrideProps&lt;T=any&gt;</h2>
<p>Immutably override props of the children of the original component and (optionally) the original component</p>
<blockquote><p>This function is a handy shortcut for when you may need to override the props of your child components and is an alternative for writing your own looped <em>React.cloneElement</em> calls.</p></blockquote><p>Since v2.3.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>component</b></p>The component whose children you want to modify</td><td>React.ReactElement</td></tr><tr><td><p><b>getChildOverrides</b></p>Callback function that returns an object containing the props you wish to override for each child</td><td>(child: T, index?: number) =&gt; object</td></tr><tr><td><p><b>overrides <span>(optional)</span></b></p>Any other props to override on the original component</td><td>object</td></tr></tbody>
    </table><p><b>Returns:</b> {React.ReactElement} The original component with the children with modified prop values</p>
  <h4>Import</h4>

```
import { overrideProps } from 'react-nanny';
```

  <h4>Examples</h4>





```    
* 
// This will override the active prop for each child component to {true}
overrideProps(component, () => ({ active: true }));

// This will override the active prop for each child component to {true} where child has a title prop = 'Supervisor'
overrideProps(component, child => child.props.title === 'Supervisor' ? ({ active: true }) : {});

// This will override the active prop for each child component to {true} and override the hello prop on the root component
overrideProps(component, () => ({ active: true }), { hello: 'Hola mundo' });
```

    