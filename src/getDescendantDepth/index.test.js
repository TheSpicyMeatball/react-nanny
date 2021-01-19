/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { getDescendantDepth } = require('../../dist/lib/es5/index');

const children = [
  { 
    props: { 
      __TYPE: 'div',
      children: [
        { 
          props: { 
            __TYPE: 'div',
            children: [
              { props: { __TYPE: 'CustomComponent', active: true, children: 'Deep child active' }},
              { type: 'span', props: { children: 'Deep span' }},
              { type: 'div' },
            ],
          },
        },
        { type: 'span', props: { children: 'Outer span', hello: 'world' }},
      ],
    },
  },
  { props: { __TYPE: 'CustomComponent', active: false, children: 'Outer child' }},
  { props: { __TYPE: 'CustomComponent', active: true, children: 'Outer child active' }},
  { type: 'span' },
  { type: 'div' },
];
React.Children.toArray = x => (x && Array.isArray(x) ? x : [x]).filter(z => z != undefined);

describe('getDescendantDepth', () => {
  test('Basic', () => {
    expect(getDescendantDepth(children, child => child?.props?.active)).toStrictEqual([
      { ancestor: children[0], depthToMatch: 2 },
      { ancestor: children[2], depthToMatch: 0 },
    ]);
  });

  test('Empty', () => {
    expect(getDescendantDepth(children, child => child?.props?.hello === 'Newman')).toStrictEqual([]);
  });
});