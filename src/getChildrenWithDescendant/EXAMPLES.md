```
<MyComponent>
  <div>
    <Hello>
      <World active={true} />
    </Hello>
  </div>
  <div />
  <div />
  <div />
  <World active={true} />
</MyComponent>

// Inside MyComponent...
getChildrenWithDescendant(children, child => child?.props?.active)

// Returns the first child because it contains a descendant that is active and
// returns the last child because it is active. Doesn't return the empty divs
// because they aren't active and they don't contain a descendant that is active.
// =>
[
  <div>
    <Hello>
      <World active={true}/>
    </Hello>
  </div>,
  <World active={true}/>
]
```

<h4>Other Examples</h4>
