# react-nanny

> Utils to manage your React Children; find and filter children by type or custom function

<p><b>Version:</b> 0.0.2</p>

<h2>Installation</h2>

```
$ npm install react-nanny --save
```

<h2>Utils</h2>
  
    

<h3>getChild&lt;T=React.ReactNode&gt;</h3>
<p>Gets first child by specified predicate</p>
<p>Since v1.0.0</p>
<table>
    <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
    </thead>
    <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) => boolean</td><td></td></tr></tbody>
  </table><p><b>Returns:</b> {T} - The first matching child</p>

<h4>Import</h4>

```
import { getChild } from react-nanny';
```


<h4>Examples</h4>

```
// Finds the first occurrence of a child that has a prop of 'active' set to true
 getChild(children, child => child.props.active);
```


<hr />

    

<h3>getChildDeep&lt;T=React.ReactNode&gt;</h3>
<p>Gets first child by specified predicate (deep search)</p>
<p>Since v1.0.0</p>
<table>
    <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
    </thead>
    <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) => boolean</td><td></td></tr></tbody>
  </table><p><b>Returns:</b> {T} - The first matching child</p>

<h4>Import</h4>

```
import { getChildDeep } from react-nanny';
```


<h4>Examples</h4>

```
// Finds the first occurrence of a child that has a prop of 'active' set to true
 getChildDeep(children, child => child.props.active);
```


<hr />

    

<h3>getChildByType&lt;T=React.ReactNode&gt;</h3>
<p>Gets first child by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To find a React Fragment, search for type 'react.fragment'.</p>
<p>Since v1.0.0</p>
<table>
    <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
    </thead>
    <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>string[]</td><td></td></tr><tr><td><p><b>customTypeKey <span>(optional)</span></b></p>The custom component prop key to check the type</td><td>string</td><td>'__TYPE'</td></tr></tbody>
  </table><p><b>Returns:</b> {T} - The first matching child</p>

<h4>Import</h4>

```
import { getChildByType } from react-nanny';
```


<h4>Examples</h4>

```
// Finds the first occurrence of either a ToDo (custom component), a div, or a React Fragment
 getChildByType(children, ['ToDo', 'div', 'react.fragment']);
```


<hr />

    

<h3>getChildByTypeDeep&lt;T=React.ReactNode&gt;</h3>
<p>Gets first child by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To find a React Fragment, search for type 'react.fragment'.  (deep search)</p>
<p>Since v1.0.0</p>
<table>
    <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
    </thead>
    <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>string[]</td><td></td></tr><tr><td><p><b>customTypeKey <span>(optional)</span></b></p>The custom component prop key to check the type</td><td>string</td><td>'__TYPE'</td></tr></tbody>
  </table><p><b>Returns:</b> {T} - The first matching child</p>

<h4>Import</h4>

```
import { getChildByTypeDeep } from react-nanny';
```


<h4>Examples</h4>

```
// Finds the first occurrence of either a ToDo (custom component), a div, or a React Fragment
 getChildByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);
```


<hr />

    

<h3>getChildren&lt;T=React.ReactNode&gt;</h3>
<p>Gets all children by specified predicate</p>
<p>Since v1.0.0</p>
<table>
    <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
    </thead>
    <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) => boolean</td><td></td></tr></tbody>
  </table><p><b>Returns:</b> {T[]} - Array of matching children</p>

<h4>Import</h4>

```
import { getChildren } from react-nanny';
```


<h4>Examples</h4>

```
// Finds all children that have an 'active' prop set to true
 getChildren(children, child => child.props.active);
```


<hr />

    

<h3>getChildrenDeep&lt;T=React.ReactNode&gt;</h3>
<p>Gets first child by specified predicate (deep search)</p>
<p>Since v1.0.0</p>
<table>
    <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
    </thead>
    <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) => boolean</td><td></td></tr></tbody>
  </table><p><b>Returns:</b> {T} - The first matching child</p>

<h4>Import</h4>

```
import { getChildrenDeep } from react-nanny';
```


<h4>Examples</h4>

```
// Finds the first occurrence of a child that has a prop of 'active' set to true
 getChildDeep(children, child => child.props.active);
```


<hr />

    

<h3>getChildrenByType&lt;T=React.ReactNode&gt;</h3>
<p>Gets all children by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To find a React Fragment, search for type 'react.fragment'.</p>
<p>Since v1.0.0</p>
<table>
    <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
    </thead>
    <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>string[]</td><td></td></tr><tr><td><p><b>customTypeKey <span>(optional)</span></b></p>The custom component prop key to check the type</td><td>string</td><td>'__TYPE'</td></tr></tbody>
  </table><p><b>Returns:</b> {T[]} - Array of matching children</p>

<h4>Import</h4>

```
import { getChildrenByType } from react-nanny';
```


<h4>Examples</h4>

```
// Finds all occurrences of ToDo (custom component), div, and React Fragment
 getChildrenByType(children, ['ToDo', 'div', 'react.fragment']);
```


<hr />

    

<h3>getChildrenByTypeDeep&lt;T=React.ReactNode&gt;</h3>
<p>Gets all children by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To find a React Fragment, search for type 'react.fragment'. (deep search)</p>
<p>Since v1.0.0</p>
<table>
    <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
    </thead>
    <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>string[]</td><td></td></tr><tr><td><p><b>customTypeKey <span>(optional)</span></b></p>The custom component prop key to check the type</td><td>string</td><td>'__TYPE'</td></tr></tbody>
  </table><p><b>Returns:</b> {T[]} - Array of matching children</p>

<h4>Import</h4>

```
import { getChildrenByTypeDeep } from react-nanny';
```


<h4>Examples</h4>

```
// Finds all occurrences of ToDo (custom component), div, and React Fragment
 getChildrenByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);
```


<hr />

    

<h3>noEmptyChildrenDeep</h3>
<p>Ensure that there is content by no empty children (deep search)</p>
<p>Since v1.0.0</p>
<table>
    <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
    </thead>
    <tbody><tr><td><p><b>component</b></p>A component, array of components, or content of a component</td><td>any</td><td></td></tr><tr><td><p><b>config <span>(optional)</span></b></p>Configuration options for custom components</td><td>NoEmptyConfig</td><td>config</td></tr></tbody>
  </table><p><b>Returns:</b> {boolean} - Whether or not there is content provided. true = content is provided as children at some depth; false = no content is provided as children at any depth</p>

<h4>Import</h4>

```
import { noEmptyChildrenDeep } from react-nanny';
```


<h4>Examples</h4>

```
noEmptyChildrenDeep(component, { ignore: ['CustomComponent'], rejectCustom: false, rejectEmptyCustom: true })
```


<hr />

    

<h3>removeChildren&lt;T=React.ReactNode&gt;</h3>
<p>Removes all children by specified predicate</p>
<p>Since v1.0.0</p>
<table>
    <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
    </thead>
    <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) => boolean</td><td></td></tr></tbody>
  </table><p><b>Returns:</b> {T[]} - All non-matching children</p>

<h4>Import</h4>

```
import { removeChildren } from react-nanny';
```


<h4>Examples</h4>

```
// Removes all children that have an 'active' prop set to false
 removeChildren(children, child => !child.props.active);
```


<hr />

    

<h3>removeChildrenDeep&lt;T=React.ReactNode&gt;</h3>
<p>Removes all children by specified predicate (deep search)</p>
<p>Since v1.0.0</p>
<table>
    <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
    </thead>
    <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) => boolean</td><td></td></tr></tbody>
  </table><p><b>Returns:</b> {T[]} - All non-matching children</p>

<h4>Import</h4>

```
import { removeChildrenDeep } from react-nanny';
```


<h4>Examples</h4>

```
// Removes all children that have an 'active' prop set to false
 removeChildrenDeep(children, child => !child.props.active);
```


<hr />

    

<h3>removeChildrenByType&lt;T=React.ReactNode&gt;</h3>
<p>Removes all children by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To remove a React Fragment, use type 'react.fragment'.</p>
<p>Since v1.0.0</p>
<table>
    <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
    </thead>
    <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>string[]</td><td></td></tr><tr><td><p><b>customTypeKey <span>(optional)</span></b></p>The custom component prop key to check the type</td><td>string</td><td>'__TYPE'</td></tr></tbody>
  </table><p><b>Returns:</b> {T[]} - All non-matching children</p>

<h4>Import</h4>

```
import { removeChildrenByType } from react-nanny';
```


<h4>Examples</h4>

```
// Removes all occurrences of ToDo (custom component), div, and React Fragment
 removeChildrenByType(children, ['ToDo', 'div', 'react.fragment']);
```


<hr />

    

<h3>removeChildrenByTypeDeep&lt;T=React.ReactNode&gt;</h3>
<p>Removes all children by specified type. This function will check the prop {customTypeKey} first and then the 'type' string to match core html elements. To remove a React Fragment, use type 'react.fragment'. (deep search)</p>
<p>Since v1.0.0</p>
<table>
    <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
    </thead>
    <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>string[]</td><td></td></tr><tr><td><p><b>customTypeKey <span>(optional)</span></b></p>The custom component prop key to check the type</td><td>string</td><td>'__TYPE'</td></tr></tbody>
  </table><p><b>Returns:</b> {T[]} - All non-matching children</p>

<h4>Import</h4>

```
import { removeChildrenByTypeDeep } from react-nanny';
```


<h4>Examples</h4>

```
// Removes all occurrences of ToDo (custom component), div, and React Fragment
 removeChildrenByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);
```


<hr />

    

<h3>typeOfComponent</h3>
<p>Gets the string type of the component or core html (JSX) element. React Fragments will return type 'react.fragment'. Priority will be given to the prop '__TYPE'.</p>
<p>Since v1.0.0</p>
<table>
    <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
    </thead>
    <tbody><tr><td><p><b>component</b></p>The component to type check</td><td>any</td><td></td></tr><tr><td><p><b>customTypeKey <span>(optional)</span></b></p>The custom component prop key to check the type</td><td>string</td><td>'__TYPE'</td></tr></tbody>
  </table><p><b>Returns:</b> {string} - The string representation of the type</p>

<h4>Import</h4>

```
import { typeOfComponent } from react-nanny';
```



<hr />


<a href="#package-contents"></a>
<h2>Package Contents</h2>

Within the module you'll find the following directories and files:

```html
package.json
CHANGELOG.md -- history of changes to the module
README.md -- this file
/lib
  └───/es5
    └───/getChild
      └───index.d.ts - 1.1 KB
      └───index.js - 1.78 KB
    └───/getChildByType
      └───index.d.ts - 1.6 KB
      └───index.js - 2.68 KB
    └───/getChildren
      └───index.d.ts - 1.1 KB
      └───index.js - 2.16 KB
    └───/getChildrenByType
      └───index.d.ts - 1.59 KB
      └───index.js - 3.05 KB
      └───index.d.ts - 559 Bytes
      └───index.js - 2.78 KB
    └───/noEmptyChildren
      └───index.d.ts - 838 Bytes
      └───index.js - 2.44 KB
    └───/removeChildren
      └───index.d.ts - 1.11 KB
      └───index.js - 3.01 KB
    └───/removeChildrenByType
      └───index.d.ts - 1.6 KB
      └───index.js - 3.87 KB
    └───/typeOfComponent
      └───index.d.ts - 503 Bytes
      └───index.js - 1.14 KB
  └───/es6
    └───/getChild
      └───index.d.ts - 1.1 KB
      └───index.js - 1.6 KB
    └───/getChildByType
      └───index.d.ts - 1.6 KB
      └───index.js - 2.42 KB
    └───/getChildren
      └───index.d.ts - 1.1 KB
      └───index.js - 1.96 KB
    └───/getChildrenByType
      └───index.d.ts - 1.59 KB
      └───index.js - 2.77 KB
      └───index.d.ts - 559 Bytes
      └───index.js - 544 Bytes
    └───/noEmptyChildren
      └───index.d.ts - 838 Bytes
      └───index.js - 2.21 KB
    └───/removeChildren
      └───index.d.ts - 1.11 KB
      └───index.js - 2.78 KB
    └───/removeChildrenByType
      └───index.d.ts - 1.6 KB
      └───index.js - 3.57 KB
    └───/typeOfComponent
      └───index.d.ts - 503 Bytes
      └───index.js - 1012 Bytes
```

<a href="#license"></a>
<h2>License</h2>

ISC


<a href="#author"></a>
<h2>Author</h2>
Michael Paravano




<a href="#dependencies"></a>
<h2>Dependencies</h2>


<table>

</table>