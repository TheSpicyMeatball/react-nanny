```
<MyComponent>
  <div>
    <Hello>
      <World />
    </Hello>
  </div>
  <div />
  <div />
  <div />
  <World />
</MyComponent>

// Inside MyComponent...
getChildrenWithDescendantByType(children, ['World'])

// Returns the first child because it contains a World component as a descendant and
// returns the last child because it matches the type. Doesn't return the empty divs 
// because they aren't World components and they don't contain a World descendant.
// =>
[
  <div>
    <Hello>
      <World />
    </Hello>
  </div>,
  <World />
]
```

<h4>Other Examples</h4>
