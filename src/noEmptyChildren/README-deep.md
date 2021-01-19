

<h2>noEmptyChildrenDeep</h2>
<p>Ensure that there is some level of content and not just a bunch of empty divs, spans, etc (deep search)</p>
<p>Since v1.0.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>component</b></p>A component, array of components, or content of a component</td><td>any</td></tr><tr><td><p><b>config <span>(optional)</span></b></p>Configuration options for custom components</td><td>NoEmptyConfig</td></tr></tbody>
    </table><p><b>Returns:</b> {boolean} - Whether or not there is content provided. true = content is provided as children at some depth; false = no content is provided as children at any depth</p><h4>Supporting Types</h4>

```
// The configuration type for the util:
//   ignore?: string[] = [] - A list of components to ignore; Components in this list will be considered as valid content
//   rejectCustom?: boolean = true - Whether or not custom components should be rejected as content
//   rejectEmptyCustom?: boolean = false - Whether or not custom components require children to be considered valid content; Note: {rejectCustom} must be set to false in order for this setting to be considered

export type NoEmptyConfig = { ignore?: string[], rejectCustom?: boolean, rejectEmptyCustom?: boolean };
```
  <h4>Import</h4>

```
import { noEmptyChildrenDeep } from 'react-nanny';
```

  <h4>Examples</h4>





```    
// Ensure that one of the following is true at some level of depth for the children: 
//   * There is markup with content
//   * A 'CustomComponent' is provided
//   * A different custom component that has children

noEmptyChildrenDeep(component, { ignore: ['CustomComponent'], rejectCustom: false, rejectEmptyCustom: true })
```

    