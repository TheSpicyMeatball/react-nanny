/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { getDescendantDepthByType } = require('../../dist/lib/es5/index');

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
        { props: { TYPE: 'CustomComponent', children: 'Outer span', hello: 'world' }},
      ],
    },
  },
  { props: { __TYPE: 'CustomComponent', active: false, children: 'Outer child' }},
  { props: { __TYPE: 'CustomComponent', active: true, children: 'Outer child active' }},
  { type: 'span' },
  { type: 'div' },
];
React.Children.toArray = x => (x && Array.isArray(x) ? x : [x]).filter(z => z != undefined);

describe('getDescendantDepthByType', () => {
  test('Single', () => {
    expect(getDescendantDepthByType(children, 'CustomComponent')).toStrictEqual([
      { ancestor: children[0], depthToMatch: 2 },
      { ancestor: children[1], depthToMatch: 0 },
      { ancestor: children[2], depthToMatch: 0 },
    ]);
  });

  test('Basic', () => {
    expect(getDescendantDepthByType(children, ['CustomComponent'])).toStrictEqual([
      { ancestor: children[0], depthToMatch: 2 },
      { ancestor: children[1], depthToMatch: 0 },
      { ancestor: children[2], depthToMatch: 0 },
    ]);
  });

  test('customTypeKey', () => {
    expect(getDescendantDepthByType(children, ['CustomComponent'], { customTypeKey: 'TYPE' })).toStrictEqual([
      { ancestor: children[0], depthToMatch: 1 },
    ]);
  });

  test('Empty', () => {
    expect(getDescendantDepthByType(children, ['Doesn\'t Exist'])).toStrictEqual([]);
  });
});