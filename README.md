[![Build Status](https://travis-ci.com/TheSpicyMeatball/react-nanny.svg?branch=main)](https://travis-ci.com/TheSpicyMeatball/react-nanny)
[![Coverage Status](https://coveralls.io/repos/github/TheSpicyMeatball/react-nanny/badge.svg?branch=main)](https://coveralls.io/github/TheSpicyMeatball/react-nanny?branch=main)
[![dependencies Status](https://status.david-dm.org/gh/TheSpicyMeatball/react-nanny.svg?path=dist)](https://david-dm.org/TheSpicyMeatball/react-nanny?path=dist)
[![peerDependencies Status](https://status.david-dm.org/gh/TheSpicyMeatball/react-nanny.svg?path=dist&type=peer)](https://david-dm.org/TheSpicyMeatball/react-nanny?path=dist&type=peer)

# react-nanny

> Utils to manage your React Children; find and filter children by type or custom function, enforce child content, and more!

<p>Hello friend. Have you ever had the need to:</p>

<ul>
  <li>...query a set of React Children by type or otherwise?</li>
  <li>...reject and remove some of your children for whatever [judgement free] reason?</li>
  <li>...ensure that your children return content at some level?</li>
</ul>

<p>If you answered yes to any of those questions, then it sounds like your children could use a nanny to help bring order to the chaos...</p>

<p><b>Version:</b> 2.6.0</p>

<h3>Dependencies</h3>

<code>react-nanny</code> doesn't have any dependencies. However, it does have a peer dependency of <code>"react": ">=16.0.0"</code> which you most likely satisfy if you're the kind of person who's looking for utils for React children.

<h2>Summary of Utils</h2>

> Click on each function name for details and examples

<table>
    <thead>
    <tr>
      <th>function</th>
      <th>Description</th>
    </tr>
    </thead>
    <tbody><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/getChild/README.md">getChild</a></td><td>Gets first child by specified predicate</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/getChild/README-deep.md">getChildDeep</a></td><td>Gets first child by specified predicate (deep search)</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/getChildByType/README.md">getChildByType</a></td><td>Gets first child by specified type</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/getChildByType/README-deep.md">getChildByTypeDeep</a></td><td>Gets first child by specified type (deep search)</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/getChildren/README.md">getChildren</a></td><td>Gets all children by specified predicate</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/getChildren/README-deep.md">getChildrenDeep</a></td><td>Gets all children by specified predicate (deep search)</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/getChildrenByType/README.md">getChildrenByType</a></td><td>Gets all children by specified type</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/getChildrenByType/README-deep.md">getChildrenByTypeDeep</a></td><td>Gets all children by specified type (deep search)</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/getChildrenWithDescendant/README.md">getChildrenWithDescendant</a></td><td>Gets all children by specified predicate or that have a descendant node in their lineage which matches the predicate</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/getChildrenWithDescendantByType/README.md">getChildrenWithDescendantByType</a></td><td>Gets all children by specified type or that have a descendant node in their lineage which match the specified type</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/getDescendantDepth/README.md">getDescendantDepth</a></td><td>Gets the depth to the first descendant (or self) of each root child that match the specified predicate</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/getDescendantDepthByType/README.md">getDescendantDepthByType</a></td><td>Gets the depth to the first descendant (or self) of each root child that match the specified types</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/noEmptyChildren/README-deep.md">noEmptyChildrenDeep</a></td><td>Ensure that there is some level of content and not just a bunch of empty divs, spans, etc (deep search)</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/overrideProps/README.md">overrideProps</a></td><td>Immutably override props of the children of the original component and (optionally) the original component</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/removeChildren/README.md">removeChildren</a></td><td>Removes all children by specified predicate</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/removeChildren/README-deep.md">removeChildrenDeep</a></td><td>Removes all children by specified predicate (deep search)</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/removeChildrenByType/README.md">removeChildrenByType</a></td><td>Removes all children by specified type</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/removeChildrenByType/README-deep.md">removeChildrenByTypeDeep</a></td><td>Removes all children by specified type (deep search)</td></tr><tr><td><a href="https://github.com/TheSpicyMeatball/react-nanny/tree/main/src/typeOfComponent/README.md">typeOfComponent</a></td><td>Gets the string type of the component's {customTypeKey}, string type of the core html (JSX intrinsic) element, or the function type</td></tr></tbody>
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
      └───index.js - 5.97 KB
    └───/getChildren
      └───index.d.ts - 1.1 KB
      └───index.js - 2.11 KB
    └───/getChildrenByType
      └───index.d.ts - 3.53 KB
      └───index.js - 5.04 KB
    └───/getChildrenWithDescendant
      └───index.d.ts - 579 Bytes
      └───index.js - 1.4 KB
    └───/getChildrenWithDescendantByType
      └───index.d.ts - 2.22 KB
      └───index.js - 3.12 KB
    └───/getDescendantDepth
      └───index.d.ts - 1.09 KB
      └───index.js - 2.54 KB
    └───/getDescendantDepthByType
      └───index.d.ts - 2.35 KB
      └───index.js - 4 KB
      └───index.d.ts - 1.08 KB
      └───index.js - 4.06 KB
    └───/noEmptyChildren
      └───index.d.ts - 1.75 KB
      └───index.js - 3.43 KB
    └───/overrideProps
      └───index.d.ts - 1.61 KB
      └───index.js - 2.49 KB
    └───/removeChildren
      └───index.d.ts - 1.11 KB
      └───index.js - 2.61 KB
    └───/removeChildrenByType
      └───index.d.ts - 3.63 KB
      └───index.js - 5.63 KB
    └───/typeOfComponent
      └───index.d.ts - 614 Bytes
      └───index.js - 1.5 KB
      └───types.d.ts - 249 Bytes
      └───types.js - 79 Bytes
    └───/_private
      └───utils.d.ts - 61 Bytes
      └───utils.js - 575 Bytes
  └───/es6
    └───/getChild
      └───index.d.ts - 1.1 KB
      └───index.js - 1.55 KB
    └───/getChildByType
      └───index.d.ts - 4.08 KB
      └───index.js - 5.68 KB
    └───/getChildren
      └───index.d.ts - 1.1 KB
      └───index.js - 1.91 KB
    └───/getChildrenByType
      └───index.d.ts - 3.53 KB
      └───index.js - 4.76 KB
    └───/getChildrenWithDescendant
      └───index.d.ts - 579 Bytes
      └───index.js - 1.22 KB
    └───/getChildrenWithDescendantByType
      └───index.d.ts - 2.22 KB
      └───index.js - 2.91 KB
    └───/getDescendantDepth
      └───index.d.ts - 1.09 KB
      └───index.js - 2.39 KB
    └───/getDescendantDepthByType
      └───index.d.ts - 2.35 KB
      └───index.js - 3.81 KB
      └───index.d.ts - 1.08 KB
      └───index.js - 886 Bytes
    └───/noEmptyChildren
      └───index.d.ts - 1.75 KB
      └───index.js - 3.2 KB
    └───/overrideProps
      └───index.d.ts - 1.61 KB
      └───index.js - 2.35 KB
    └───/removeChildren
      └───index.d.ts - 1.11 KB
      └───index.js - 2.38 KB
    └───/removeChildrenByType
      └───index.d.ts - 3.63 KB
      └───index.js - 5.32 KB
    └───/typeOfComponent
      └───index.d.ts - 614 Bytes
      └───index.js - 1.35 KB
      └───types.d.ts - 249 Bytes
      └───types.js - 12 Bytes
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
