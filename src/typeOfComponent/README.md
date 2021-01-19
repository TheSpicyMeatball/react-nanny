

<h2>typeOfComponent</h2>
<p>Gets the string type of the component's {customTypeKey}, string type of the core html (JSX intrinsic) element, or the function type</p>
<p>Since v1.0.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th><th>Default</th></tr>
      </thead>
      <tbody><tr><td><p><b>component</b></p>The component to type check</td><td>any</td><td></td></tr><tr><td><p><b>customTypeKey <span>(optional)</span></b></p>The custom component prop key to check the type</td><td>string</td><td>'__TYPE'</td></tr></tbody>
    </table><p><b>Returns:</b> {string} - The string representation of the type</p><blockquote><p>React Fragments will return type 'react.fragment'. Priority will be given to the <em>{customTypeKey}</em> if one exists</p></blockquote>
  <h4>Import</h4>

```
import { typeOfComponent } from 'react-nanny';
```

  