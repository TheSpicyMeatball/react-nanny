# react-nanny

> Utils to manage your React Children; find and filter children by type or custom function, enforce child content, and more!

<p>Hello friend. Have you ever had the need to:</p>

<ul>
  <li>...query a set of React Children by type or otherwise?</li>
  <li>...reject and remove some of your children for whatever [judgement free] reason?</li>
  <li>...ensure that your children return content at some level?</li>
</ul>

<p>If you answered yes to any of those questions, then it sounds like your children could use a nanny to help bring order to the chaos...</p>

<p><b>Version:</b> 2.0.0</p>

<h2>Installation</h2>

```
$ npm install react-nanny --save
```


<h2>Summary of Utils</h2>
<p>For detailed information on each util, see below this table.</p>
<table>
    <thead>
    <tr>
      <th>function</th>
      <th>Description</th>
    </tr>
    </thead>
    <tbody><tr><td>getChild</td><td>Gets first child by specified predicate</td></tr><tr><td>getChildDeep</td><td>Gets first child by specified predicate (deep search)</td></tr><tr><td>getChildByType</td><td>Gets first child by specified type</td></tr><tr><td>getChildByTypeDeep</td><td>Gets first child by specified type (deep search)</td></tr><tr><td>getChildren</td><td>Gets all children by specified predicate</td></tr><tr><td>getChildrenDeep</td><td>Gets first child by specified predicate (deep search)</td></tr><tr><td>getChildrenByType</td><td>Gets all children by specified type</td></tr><tr><td>getChildrenByTypeDeep</td><td>Gets all children by specified type (deep search)</td></tr><tr><td>noEmptyChildrenDeep</td><td>Ensure that there is some level of content and not just a bunch of empty divs, spans, etc (deep search)</td></tr><tr><td>removeChildren</td><td>Removes all children by specified predicate</td></tr><tr><td>removeChildrenDeep</td><td>Removes all children by specified predicate (deep search)</td></tr><tr><td>removeChildrenByType</td><td>Removes all children by specified type</td></tr><tr><td>removeChildrenByTypeDeep</td><td>Removes all children by specified type (deep search)</td></tr><tr><td>typeOfComponent</td><td>Gets the string type of the component's {customTypeKey}, string type of the core html (JSX intrinsic) element, or the function type</td></tr></tbody>
  </table><hr />



  

<h2>getChild&lt;T=React.ReactNode&gt;</h2>
<p>Gets first child by specified predicate</p>
<p>Since v1.0.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) => boolean</td></tr></tbody>
    </table><p><b>Returns:</b> {T} - The first matching child</p>

<h4>Import</h4>

```
import { getChild } from 'react-nanny';
```


<h4>Examples</h4>

```
// Finds the first occurrence of a child that has a prop of 'active' set to true
getChild(children, child => child.props.active);
```


<hr />

  

<h2>getChildDeep&lt;T=React.ReactNode&gt;</h2>
<p>Gets first child by specified predicate (deep search)</p>
<p>Since v1.0.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) => boolean</td></tr></tbody>
    </table><p><b>Returns:</b> {T} - The first matching child</p>

<h4>Import</h4>

```
import { getChildDeep } from 'react-nanny';
```


<h4>Examples</h4>

```
// Finds the first occurrence of a child that has a prop of 'active' set to true
getChildDeep(children, child => child.props.active);
```


<hr />

  

<h2>getChildByType&lt;T=React.ReactNode&gt;</h2>
<p>Gets first child by specified type</p>
<p>Since v1.0.0 (modified v2.0.0)</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th><th>Default</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>any[]</td><td></td></tr><tr><td><p><b>{ customTypeKey: string = '__TYPE', prioritized: boolean = false } <span>(optional)</span></b></p>The configuration params</td><td>GetChildByTypeConfig</td><td>{ customTypeKey: '__TYPE', prioritized: false }</td></tr></tbody>
    </table><p><b>Returns:</b> {T} - The first matching child</p><h4>Supporting Types</h4>

```
// The configuration type for the util:
//   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type
//   prioritized?: boolean = false - Whether or not the order of types is prioritized
export type GetChildByTypeConfig = { customTypeKey?: string, prioritized?: boolean };
```

<h4>Import</h4>

```
import { getChildByType } from 'react-nanny';
```


<h4>Examples</h4>

```
// Finds the first occurrence of either a ToDo (custom component w/defined type as prop), a div, or a React Fragment
getChildByType(children, ['ToDo', 'div', 'react.fragment']);

// Finds the first occurrence of either a MyComponent (custom component - full component passed in), a div, or a React Fragment
import MyComponent from './MyComponent';
getChildByType(children, [MyComponent, 'div', 'react.fragment']);

// Finds the first occurrence of either a ToDo, a div, or a React Fragment with a preference for that order. If ToDo exists, it will return that first. If not, then div, etc.
getChildByType(children, ['ToDo', 'div', 'react.fragment'], { prioritized: true });
```


<hr />

  

<h2>getChildByTypeDeep&lt;T=React.ReactNode&gt;</h2>
<p>Gets first child by specified type (deep search)</p>
<p>Since v1.0.0 (modified v2.0.0)</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th><th>Default</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>any[]</td><td></td></tr><tr><td><p><b>{ customTypeKey: string = '__TYPE', prioritized: boolean = false } <span>(optional)</span></b></p>The configuration params</td><td>GetChildByTypeConfig</td><td>{ customTypeKey: '__TYPE', prioritized: false }</td></tr></tbody>
    </table><p><b>Returns:</b> {T} - The first matching child</p><h4>Supporting Types</h4>

```
// The configuration type for the util:
//   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type
//   prioritized?: boolean = false - Whether or not the order of types is prioritized
export type GetChildByTypeConfig = { customTypeKey?: string, prioritized?: boolean };
```

<h4>Import</h4>

```
import { getChildByTypeDeep } from 'react-nanny';
```


<h4>Examples</h4>

```
// Finds the first occurrence of either a ToDo (custom component w/defined type as prop), a div, or a React Fragment
getChildByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);

// Finds the first occurrence of either a MyComponent (custom component - full component passed in), a div, or a React Fragment
import MyComponent from './MyComponent';
getChildByTypeDeep(children, [MyComponent, 'div', 'react.fragment']);

// Finds the first occurrence of either a ToDo, a div, or a React Fragment with a preference for that order. If ToDo exists, it will return that first. If not, then div, etc.
getChildByTypeDeep(children, ['ToDo', 'div', 'react.fragment'], { prioritized: true });
```


<hr />

  

<h2>getChildren&lt;T=React.ReactNode&gt;</h2>
<p>Gets all children by specified predicate</p>
<p>Since v1.0.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) => boolean</td></tr></tbody>
    </table><p><b>Returns:</b> {T[]} - Array of matching children</p>

<h4>Import</h4>

```
import { getChildren } from 'react-nanny';
```


<h4>Examples</h4>

```
// Finds all children that have an 'active' prop set to true
getChildren(children, child => child.props.active);
```


<hr />

  

<h2>getChildrenDeep&lt;T=React.ReactNode&gt;</h2>
<p>Gets first child by specified predicate (deep search)</p>
<p>Since v1.0.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) => boolean</td></tr></tbody>
    </table><p><b>Returns:</b> {T} - The first matching child</p>

<h4>Import</h4>

```
import { getChildrenDeep } from 'react-nanny';
```


<h4>Examples</h4>

```
// Finds the first occurrence of a child that has a prop of 'active' set to true
getChildrenDeep(children, child => child.props.active);
```


<hr />

  

<h2>getChildrenByType&lt;T=React.ReactNode&gt;</h2>
<p>Gets all children by specified type</p>
<p>Since v1.0.0 (modified v2.0.0)</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th><th>Default</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>any[]</td><td></td></tr><tr><td><p><b>{ customTypeKey: string = '__TYPE' } <span>(optional)</span></b></p>The configuration params; The custom component prop key to check the type</td><td>GetChildrenByTypeConfig</td><td>{ customTypeKey: '__TYPE' }</td></tr></tbody>
    </table><p><b>Returns:</b> {T[]} - Array of matching children</p><h4>Supporting Types</h4>

```
// The configuration type for the util:
//   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type
export type GetChildrenByTypeConfig = { customTypeKey?: string };
```

<h4>Import</h4>

```
import { getChildrenByType } from 'react-nanny';
```


<h4>Examples</h4>

```
// Finds all occurrences of ToDo (custom component), div, and React Fragment
getChildrenByType(children, ['ToDo', 'div', 'react.fragment']);

// Finds all occurrences of MyComponent (custom component - full component passed in), a div, and React Fragment
import MyComponent from './MyComponent';
getChildrenByType(children, [MyComponent, 'div', 'react.fragment']);

// Finds all occurrences of ToDo (custom component) with a customized <em>{customTypeKey}</em>
getChildrenByType(children, ['ToDo'], { customTypeKey: 'myTypeKey' });
```


<hr />

  

<h2>getChildrenByTypeDeep&lt;T=React.ReactNode&gt;</h2>
<p>Gets all children by specified type (deep search)</p>
<p>Since v1.0.0 (modified v2.0.0)</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th><th>Default</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>any[]</td><td></td></tr><tr><td><p><b>{ customTypeKey: string = '__TYPE' } <span>(optional)</span></b></p>The configuration params; The custom component prop key to check the type</td><td>GetChildrenByTypeConfig</td><td>{ customTypeKey: '__TYPE' }</td></tr></tbody>
    </table><p><b>Returns:</b> {T[]} - Array of matching children</p><h4>Supporting Types</h4>

```
// The configuration type for the util:
//   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type
export type GetChildrenByTypeConfig = { customTypeKey?: string };
```

<h4>Import</h4>

```
import { getChildrenByTypeDeep } from 'react-nanny';
```


<h4>Examples</h4>

```
// Finds all occurrences of ToDo (custom component), div, and React Fragment
getChildrenByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);

// Finds all occurrences of MyComponent (custom component - full component passed in), a div, and React Fragment
import MyComponent from './MyComponent';
getChildrenByTypeDeep(children, [MyComponent, 'div', 'react.fragment']);

// Finds all occurrences of ToDo (custom component) with a customized <em>{customTypeKey}</em>
getChildrenByTypeDeep(children, ['ToDo'], { customTypeKey: 'myTypeKey' });
```


<hr />

  

<h2>noEmptyChildrenDeep</h2>
<p>Ensure that there is some level of content and not just a bunch of empty divs, spans, etc (deep search)</p>
<p>Since v1.0.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th><th>Default</th></tr>
      </thead>
      <tbody><tr><td><p><b>component</b></p>A component, array of components, or content of a component</td><td>any</td><td></td></tr><tr><td><p><b>config <span>(optional)</span></b></p>Configuration options for custom components</td><td>NoEmptyConfig</td><td>config</td></tr></tbody>
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
//  There is markup with content
//  A 'CustomComponent' is provided
//  A different custom component that has children
noEmptyChildrenDeep(component, { ignore: ['CustomComponent'], rejectCustom: false, rejectEmptyCustom: true })
```


<hr />

  

<h2>removeChildren&lt;T=React.ReactNode&gt;</h2>
<p>Removes all children by specified predicate</p>
<p>Since v1.0.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) => boolean</td></tr></tbody>
    </table><p><b>Returns:</b> {T[]} - All non-matching children</p>

<h4>Import</h4>

```
import { removeChildren } from 'react-nanny';
```


<h4>Examples</h4>

```
// Removes all children that have an 'active' prop set to false
removeChildren(children, child => !child.props.active);
```


<hr />

  

<h2>removeChildrenDeep&lt;T=React.ReactNode&gt;</h2>
<p>Removes all children by specified predicate (deep search)</p>
<p>Since v1.0.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) => boolean</td></tr></tbody>
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


<hr />

  

<h2>removeChildrenByType&lt;T=React.ReactNode&gt;</h2>
<p>Removes all children by specified type</p>
<p>Since v1.0.0 (modified v2.0.0)</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th><th>Default</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>any[]</td><td></td></tr><tr><td><p><b>{ customTypeKey: string = '__TYPE' } <span>(optional)</span></b></p>The configuration params; The custom component prop key to check the type</td><td>RemoveChildrenByTypeConfig</td><td>{ customTypeKey: '__TYPE' }</td></tr></tbody>
    </table><p><b>Returns:</b> {T[]} - All non-matching children</p>

<h4>Import</h4>

```
import { removeChildrenByType } from 'react-nanny';
```


<h4>Examples</h4>

```
// Removes all occurrences of ToDo (custom component), div, and React Fragment
removeChildrenByType(children, ['ToDo', 'div', 'react.fragment']);

// Removes all occurrences of MyComponent (custom component - full component passed in), a div, and React Fragment
import MyComponent from './MyComponent';
removeChildrenByTypeDeep(children, [MyComponent, 'div', 'react.fragment']);

// Removes all occurrences of ToDo (custom component) with a customized <em>{customTypeKey}</em>
removeChildrenByType(children, ['ToDo'], { customTypeKey: 'myTypeKey' });
```


<hr />

  

<h2>removeChildrenByTypeDeep&lt;T=React.ReactNode&gt;</h2>
<p>Removes all children by specified type (deep search)</p>
<p>Since v1.0.0 (modified v2.0.0)</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th><th>Default</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td><td></td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>any[]</td><td></td></tr><tr><td><p><b>{ customTypeKey: string = '__TYPE' } <span>(optional)</span></b></p>The configuration params; The custom component prop key to check the type</td><td>RemoveChildrenByTypeConfig</td><td>{ customTypeKey: '__TYPE' }</td></tr></tbody>
    </table><p><b>Returns:</b> {T[]} - All non-matching children</p>

<h4>Import</h4>

```
import { removeChildrenByTypeDeep } from 'react-nanny';
```


<h4>Examples</h4>

```
// Removes all occurrences of ToDo (custom component), div, and React Fragment
removeChildrenByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);

// Removes all occurrences of MyComponent (custom component - full component passed in), a div, and React Fragment
import MyComponent from './MyComponent';
removeChildrenByTypeDeep(children, [MyComponent, 'div', 'react.fragment']);

// Removes all occurrences of ToDo (custom component) with a customized <em>{customTypeKey}</em>
removeChildrenByTypeDeep(children, ['ToDo'], { customTypeKey: 'myTypeKey' });
```


<hr />

  

<h2>typeOfComponent</h2>
<p>Gets the string type of the component's {customTypeKey}, string type of the core html (JSX intrinsic) element, or the function type</p>
<p>Since v1.0.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th><th>Default</th></tr>
      </thead>
      <tbody><tr><td><p><b>component</b></p>The component to type check</td><td>any</td><td></td></tr><tr><td><p><b>customTypeKey='__TYPE' <span>(optional)</span></b></p>The custom component prop key to check the type</td><td>string</td><td>'__TYPE'</td></tr></tbody>
    </table><p><b>Returns:</b> {string} - The string representation of the type</p>

<h4>Import</h4>

```
import { typeOfComponent } from 'react-nanny';
```


<h4>Examples</h4>

```

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
      └───index.d.ts - 3.86 KB
      └───index.js - 5.75 KB
    └───/getChildren
      └───index.d.ts - 1.1 KB
      └───index.js - 2.16 KB
    └───/getChildrenByType
      └───index.d.ts - 3.35 KB
      └───index.js - 4.91 KB
      └───index.d.ts - 634 Bytes
      └───index.js - 2.78 KB
    └───/noEmptyChildren
      └───index.d.ts - 1.68 KB
      └───index.js - 3.34 KB
    └───/removeChildren
      └───index.d.ts - 1.11 KB
      └───index.js - 3.01 KB
    └───/removeChildrenByType
      └───index.d.ts - 2.97 KB
      └───index.js - 5.36 KB
    └───/typeOfComponent
      └───index.d.ts - 614 Bytes
      └───index.js - 1.53 KB
    └───/_private
      └───utils.d.ts - 61 Bytes
      └───utils.js - 408 Bytes
  └───/es6
    └───/getChild
      └───index.d.ts - 1.1 KB
      └───index.js - 1.6 KB
    └───/getChildByType
      └───index.d.ts - 3.86 KB
      └───index.js - 5.45 KB
    └───/getChildren
      └───index.d.ts - 1.1 KB
      └───index.js - 1.96 KB
    └───/getChildrenByType
      └───index.d.ts - 3.35 KB
      └───index.js - 4.62 KB
      └───index.d.ts - 634 Bytes
      └───index.js - 544 Bytes
    └───/noEmptyChildren
      └───index.d.ts - 1.68 KB
      └───index.js - 3.12 KB
    └───/removeChildren
      └───index.d.ts - 1.11 KB
      └───index.js - 2.78 KB
    └───/removeChildrenByType
      └───index.d.ts - 2.97 KB
      └───index.js - 5.05 KB
    └───/typeOfComponent
      └───index.d.ts - 614 Bytes
      └───index.js - 1.39 KB
    └───/_private
      └───utils.d.ts - 61 Bytes
      └───utils.js - 249 Bytes
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