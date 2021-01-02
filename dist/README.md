[![Build Status](https://travis-ci.com/TheSpicyMeatball/react-nanny.svg?branch=main)](https://travis-ci.com/TheSpicyMeatball/react-nanny)
[![Coverage Status](https://coveralls.io/repos/github/TheSpicyMeatball/react-nanny/badge.svg?branch=main)](https://coveralls.io/github/TheSpicyMeatball/react-nanny?branch=main)

# react-nanny

> Utils to manage your React Children; find and filter children by type or custom function, enforce child content, and more!

<p>Hello friend. Have you ever had the need to:</p>

<ul>
  <li>...query a set of React Children by type or otherwise?</li>
  <li>...reject and remove some of your children for whatever [judgement free] reason?</li>
  <li>...ensure that your children return content at some level?</li>
</ul>

<p>If you answered yes to any of those questions, then it sounds like your children could use a nanny to help bring order to the chaos...</p>

<p><b>Version:</b> 2.4.0</p>



<h2>Summary of Utils</h2>
<p>For detailed information on each util, see below this table.</p>
<table>
    <thead>
    <tr>
      <th>function</th>
      <th>Description</th>
    </tr>
    </thead>
    <tbody><tr><td>getChild</td><td>Gets first child by specified predicate</td></tr><tr><td>getChildDeep</td><td>Gets first child by specified predicate (deep search)</td></tr><tr><td>getChildByType</td><td>Gets first child by specified type</td></tr><tr><td>getChildByTypeDeep</td><td>Gets first child by specified type (deep search)</td></tr><tr><td>getChildren</td><td>Gets all children by specified predicate</td></tr><tr><td>getChildrenDeep</td><td>Gets all children by specified predicate (deep search)</td></tr><tr><td>getChildrenByType</td><td>Gets all children by specified type</td></tr><tr><td>getChildrenByTypeDeep</td><td>Gets all children by specified type (deep search)</td></tr><tr><td>noEmptyChildrenDeep</td><td>Ensure that there is some level of content and not just a bunch of empty divs, spans, etc (deep search)</td></tr><tr><td>overrideProps</td><td>Immutably override props of the children of the original component and (optionally) the original component</td></tr><tr><td>removeChildren</td><td>Removes all children by specified predicate</td></tr><tr><td>removeChildrenDeep</td><td>Removes all children by specified predicate (deep search)</td></tr><tr><td>removeChildrenByType</td><td>Removes all children by specified type</td></tr><tr><td>removeChildrenByTypeDeep</td><td>Removes all children by specified type (deep search)</td></tr><tr><td>typeOfComponent</td><td>Gets the string type of the component's {customTypeKey}, string type of the core html (JSX intrinsic) element, or the function type</td></tr></tbody>
  </table><hr />

<h2>What can I use to derive types for a comparison?</h2>
<p>You can use an imported type, a <code>React.ReactNode</code>, value from <code>typeOfComponent</code>, a string type for an HTML (JSX Intrinsic) element, or a string representation of the type by using the <code>customTypeKey</code> feature.</p>

<h3>Imported Type</h3>

```
import { getChildByType } from 'react-nanny';
import MyComponent from './MyComponent';

getChildByType(children, [MyComponent]);
```

<h3>React.ReactNode</h3>

```
import { getChildByType, removeChildrenByType } from 'react-nanny';
import MyComponent from './MyComponent';

const child = getChildByType(children, [MyComponent]);
...
removeChildrenByType(children, [child]);
```

<h3>typeOfComponent</h3>

```
import { getChildByType, removeChildrenByType, typeOfComponent } from 'react-nanny';
import MyComponent from './MyComponent';

const child = getChildByType(children, [MyComponent]);
...
removeChildrenByType(children, [typeOfComponent(child)]);
```

<h3>String type for HTML (JSX Intrinsic) Elements</h3>

```
import { getChildByType } from 'react-nanny';

getChildByType(children, ['div']);
```

<h3>customTypeKey</h3>
<h4>What the heck is a customTypeKey?</h4>
<p>One simple way to be able to define and identify a type on a component and ensure that it is the same in development builds and production builds is to add a constant prop that contains the string type. Consider the following hypothetical component:</p>

```
import React from 'react';

const Hello = ({ __TYPE }) => <div>Hello World!</div>;

Hello.defaultProps = {
  __TYPE: 'Hello',
};
```

<p>The <code>Hello</code> has a prop <code>__TYPE</code> that has a value of <code>'Hello'</code>. We can query against this value and know that it's reliable regardless of environment.</p>
<p>The <code>customTypeKey</code> in <code>react-nanny</code> defines what the name of this prop is. In our example, <code>customTypeKey</code> would be <code>'__TYPE'</code> to query using this technique</p>

```
import { getChildByType } from 'react-nanny';

getChildByType(children, ['Hello']);
```

<p>Let's say you don't like <code>__TYPE</code> and what to use your own value such as: <code>CUSTOM</code>. You can accomplish this by providing the name for the <code>customTypeKey</code>:</p>

```
import { getChildByType } from 'react-nanny';

getChildByType(children, ['Hello'], { customTypeKey: 'CUSTOM' });
```

For more information on how to enforce the integrity of the <code>customTypeKey</code>, check out my Medium article: <a href="https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292" target="_blank">Find & Filter React Children By Type</a>

<p><em>Now, without further ado, the utils...</em><hr /></p>


  

<h2>getChild&lt;T=React.ReactNode&gt;</h2>
<p>Gets first child by specified predicate</p>
<p>Since v1.0.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) =&gt; boolean</td></tr></tbody>
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
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) =&gt; boolean</td></tr></tbody>
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
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>any[]</td></tr><tr><td><p><b>{ customTypeKey: '__TYPE', prioritized: false } <span>(optional)</span></b></p>The configuration params</td><td>GetChildByTypeConfig</td></tr></tbody>
    </table><p><b>Returns:</b> {T} - The first matching child</p><blockquote><p>This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To find a React Fragment, search for <em>'react.fragment'</em>.</p></blockquote><h4>Supporting Types</h4>

```
// The configuration type for the util:
//   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type
//   prioritized?: boolean = false - Whether or not the order of types is prioritized

export type GetChildByTypeConfig = { customTypeKey?: string, prioritized?: boolean };
```
  <h4>Import</h4>

```
import { getChildByType, GetChildByTypeConfig } from 'react-nanny';
```

  <blockquote><p><em>GetChildByTypeConfig</em> is a TypeScript type and is only for (optional) use with TypeScript projects</p></blockquote><h4>Examples</h4>





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
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>any[]</td></tr><tr><td><p><b>{ customTypeKey: '__TYPE', prioritized: false } <span>(optional)</span></b></p>The configuration params</td><td>GetChildByTypeConfig</td></tr></tbody>
    </table><p><b>Returns:</b> {T} - The first matching child</p><blockquote><p>This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To find a React Fragment, search for <em>'react.fragment'</em>.</p></blockquote><h4>Supporting Types</h4>

```
// The configuration type for the util:
//   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type
//   prioritized?: boolean = false - Whether or not the order of types is prioritized

export type GetChildByTypeConfig = { customTypeKey?: string, prioritized?: boolean };
```
  <h4>Import</h4>

```
import { getChildByTypeDeep, GetChildByTypeConfig } from 'react-nanny';
```

  <blockquote><p><em>GetChildByTypeConfig</em> is a TypeScript type and is only for (optional) use with TypeScript projects</p></blockquote><h4>Examples</h4>





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
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) =&gt; boolean</td></tr></tbody>
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
<p>Gets all children by specified predicate (deep search)</p>
<p>Since v1.0.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) =&gt; boolean</td></tr></tbody>
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
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>any[]</td></tr><tr><td><p><b>{ customTypeKey: '__TYPE' } <span>(optional)</span></b></p>The configuration params</td><td>GetChildrenByTypeConfig</td></tr></tbody>
    </table><p><b>Returns:</b> {T[]} - Array of matching children</p><blockquote><p>This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To find a React Fragment, search for <em>'react.fragment'</em>.</p></blockquote><h4>Supporting Types</h4>

```
// The configuration type for the util:
//   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type

export type GetChildrenByTypeConfig = { customTypeKey?: string };
```
  <h4>Import</h4>

```
import { getChildrenByType, GetChildrenByTypeConfig } from 'react-nanny';
```

  <blockquote><p><em>GetChildrenByTypeConfig</em> is a TypeScript type and is only for (optional) use with TypeScript projects</p></blockquote><h4>Examples</h4>





```    
// Finds all occurrences of ToDo (custom component), div, and React Fragment
getChildrenByType(children, ['ToDo', 'div', 'react.fragment']);

// Finds all occurrences of MyComponent (custom component - full component passed in), a div, and React Fragment
import MyComponent from './MyComponent';
getChildrenByType(children, [MyComponent, 'div', 'react.fragment']);

// Finds all occurrences of ToDo (custom component) with a customized {customTypeKey}
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
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>any[]</td></tr><tr><td><p><b>{ customTypeKey: '__TYPE' } <span>(optional)</span></b></p>The configuration params</td><td>GetChildrenByTypeConfig</td></tr></tbody>
    </table><p><b>Returns:</b> {T[]} - Array of matching children</p><blockquote><p>This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To find a React Fragment, search for <em>'react.fragment'</em>.</p></blockquote><h4>Supporting Types</h4>

```
// The configuration type for the util:
//   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type

export type GetChildrenByTypeConfig = { customTypeKey?: string };
```
  <h4>Import</h4>

```
import { getChildrenByTypeDeep, GetChildrenByTypeConfig } from 'react-nanny';
```

  <blockquote><p><em>GetChildrenByTypeConfig</em> is a TypeScript type and is only for (optional) use with TypeScript projects</p></blockquote><h4>Examples</h4>





```    
// Finds all occurrences of ToDo (custom component), div, and React Fragment
getChildrenByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);

// Finds all occurrences of MyComponent (custom component - full component passed in), a div, and React Fragment
import MyComponent from './MyComponent';
getChildrenByTypeDeep(children, [MyComponent, 'div', 'react.fragment']);

// Finds all occurrences of ToDo (custom component) with a customized {customTypeKey}
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
//   * There is markup with content
//   * A 'CustomComponent' is provided
//   * A different custom component that has children

noEmptyChildrenDeep(component, { ignore: ['CustomComponent'], rejectCustom: false, rejectEmptyCustom: true })
```

    

<hr />

  

<h2>overrideProps&lt;T=any&gt;</h2>
<p>Immutably override props of the children of the original component and (optionally) the original component</p>
<blockquote><p>This function is a handy shortcut for when you may need to override the props of your children components and is an alternative for writing your own looped <em>React.cloneElement</em> calls.</p></blockquote><p>Since v2.3.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th><th>Default</th></tr>
      </thead>
      <tbody><tr><td><p><b>component</b></p>The component whose children you want to modify</td><td>React.ReactElement</td><td></td></tr><tr><td><p><b>getChildOverrides</b></p>Callback function that returns an object containing the props you wish to override for each child</td><td>(child: T, index?: number) =&gt; object</td><td></td></tr><tr><td><p><b>overrides <span>(optional)</span></b></p>Any other props to override on the original component</td><td>object</td><td>overrides</td></tr></tbody>
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
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>predicate</b></p>The predicate to determine if the given child is a match</td><td>(child: T) =&gt; boolean</td></tr></tbody>
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

    

<hr />

  

<h2>removeChildrenByType&lt;T=React.ReactNode&gt;</h2>
<p>Removes all children by specified type</p>
<p>Since v1.0.0 (modified v2.0.0)</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>any[]</td></tr><tr><td><p><b>{ customTypeKey: '__TYPE' } <span>(optional)</span></b></p>The configuration params</td><td>RemoveChildrenByTypeConfig</td></tr></tbody>
    </table><p><b>Returns:</b> {T[]} - All non-matching children</p><blockquote><p>This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To remove a React Fragment, search for <em>'react.fragment'</em>.</p></blockquote>
  <h4>Import</h4>

```
import { removeChildrenByType, RemoveChildrenByTypeConfig } from 'react-nanny';
```

  <blockquote><p><em>RemoveChildrenByTypeConfig</em> is a TypeScript type and is only for (optional) use with TypeScript projects</p></blockquote><h4>Examples</h4>





```    
// Removes all occurrences of ToDo (custom component), div, and React Fragment
removeChildrenByType(children, ['ToDo', 'div', 'react.fragment']);

// Removes all occurrences of MyComponent (custom component - from import), a div, and React Fragment
import MyComponent from './MyComponent';
removeChildrenByType(children, [MyComponent, 'div', 'react.fragment']);

// Removes all occurrences of MyComponent (custom component - as React.ReactNode), a div, and React Fragment
const component = getChildByType(['MyComponent']);
removeChildrenByType(children, [component, 'div', 'react.fragment']);

// Removes all occurrences of ToDo (custom component) with a customized {customTypeKey}
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
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>any[]</td></tr><tr><td><p><b>{ customTypeKey: '__TYPE' } <span>(optional)</span></b></p>The configuration params</td><td>RemoveChildrenByTypeConfig</td></tr></tbody>
    </table><p><b>Returns:</b> {T[]} - All non-matching children</p><blockquote><p>This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To remove a React Fragment, search for <em>'react.fragment'</em>.</p></blockquote>
  <h4>Import</h4>

```
import { removeChildrenByTypeDeep, RemoveChildrenByTypeConfig } from 'react-nanny';
```

  <blockquote><p><em>RemoveChildrenByTypeConfig</em> is a TypeScript type and is only for (optional) use with TypeScript projects</p></blockquote><h4>Examples</h4>





```    
// Removes all occurrences of ToDo (custom component), div, and React Fragment
removeChildrenByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);

// Removes all occurrences of MyComponent (custom component - full component passed in), a div, and React Fragment
import MyComponent from './MyComponent';
removeChildrenByTypeDeep(children, [MyComponent, 'div', 'react.fragment']);

// Removes all occurrences of MyComponent (custom component - as React.ReactNode), a div, and React Fragment
const component = getChildByType(['MyComponent']);
removeChildrenByTypeDeep(children, [component, 'div', 'react.fragment']);

// Removes all occurrences of ToDo (custom component) with a customized {customTypeKey}
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
      <tbody><tr><td><p><b>component</b></p>The component to type check</td><td>any</td><td></td></tr><tr><td><p><b>customTypeKey <span>(optional)</span></b></p>The custom component prop key to check the type</td><td>string</td><td>'__TYPE'</td></tr></tbody>
    </table><p><b>Returns:</b> {string} - The string representation of the type</p><blockquote><p>React Fragments will return type 'react.fragment'. Priority will be given to the <em>{customTypeKey}</em> if one exists</p></blockquote>
  <h4>Import</h4>

```
import { typeOfComponent } from 'react-nanny';
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
      └───index.js - 1.73 KB
    └───/getChildByType
      └───index.d.ts - 4.08 KB
      └───index.js - 5.96 KB
    └───/getChildren
      └───index.d.ts - 1.1 KB
      └───index.js - 2.16 KB
    └───/getChildrenByType
      └───index.d.ts - 3.53 KB
      └───index.js - 5.09 KB
      └───index.d.ts - 684 Bytes
      └───index.js - 2.98 KB
    └───/noEmptyChildren
      └───index.d.ts - 1.69 KB
      └───index.js - 3.35 KB
    └───/overrideProps
      └───index.d.ts - 1.61 KB
      └───index.js - 2.51 KB
    └───/removeChildren
      └───index.d.ts - 1.11 KB
      └───index.js - 2.71 KB
    └───/removeChildrenByType
      └───index.d.ts - 3.63 KB
      └───index.js - 5.72 KB
    └───/typeOfComponent
      └───index.d.ts - 614 Bytes
      └───index.js - 1.53 KB
    └───/_private
      └───utils.d.ts - 61 Bytes
      └───utils.js - 575 Bytes
  └───/es6
    └───/getChild
      └───index.d.ts - 1.1 KB
      └───index.js - 1.55 KB
    └───/getChildByType
      └───index.d.ts - 4.08 KB
      └───index.js - 5.67 KB
    └───/getChildren
      └───index.d.ts - 1.1 KB
      └───index.js - 1.96 KB
    └───/getChildrenByType
      └───index.d.ts - 3.53 KB
      └───index.js - 4.8 KB
      └───index.d.ts - 684 Bytes
      └───index.js - 594 Bytes
    └───/noEmptyChildren
      └───index.d.ts - 1.69 KB
      └───index.js - 3.12 KB
    └───/overrideProps
      └───index.d.ts - 1.61 KB
      └───index.js - 2.37 KB
    └───/removeChildren
      └───index.d.ts - 1.11 KB
      └───index.js - 2.48 KB
    └───/removeChildrenByType
      └───index.d.ts - 3.63 KB
      └───index.js - 5.41 KB
    └───/typeOfComponent
      └───index.d.ts - 614 Bytes
      └───index.js - 1.39 KB
    └───/_private
      └───utils.d.ts - 61 Bytes
      └───utils.js - 398 Bytes
```

<a href="#license"></a>
<h2>License</h2>

MIT


<a href="#author"></a>
<h2>Author</h2>
Michael Paravano




<a href="#dependencies"></a>
<h2>Dependencies</h2>



None
