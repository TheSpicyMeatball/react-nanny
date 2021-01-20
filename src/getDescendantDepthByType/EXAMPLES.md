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
getDescendantDepthByType(children, ['World'])

// Returns the first child because it is the oldest ancestor which contains a
// World descendant and returns the last child because it is of type World.
// Doesn't return the empty divs because they aren't of type World and they
// don't contain a World descendant.
// =>
[
  {
    ancestor: (
      <div>
        <Hello>
          <World />
        </Hello>
      </div>
    ),
    depthToMatch: 2,
  },
  {
    ancestor: <World />,
    depthToMatch: 0,
  },
]
```

<h4>Other Examples</h4>
