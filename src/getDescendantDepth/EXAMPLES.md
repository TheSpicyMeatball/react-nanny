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
getDescendantDepth(children, child => child?.props?.active)

// Returns the first child because it is the oldest ancestor which contains a
// descendant that is active and returns the last child because it is active.
// Doesn't return the empty divs because they aren't active and they don't
// contain a descendant that is active.
// =>
[
  {
    ancestor: (
      <div>
        <Hello>
          <World active={true} />
        </Hello>
      </div>
    ),
    depthToMatch: 2,
  },
  {
    ancestor: <World active={true} />,
    depthToMatch: 0,
  },
]
```
