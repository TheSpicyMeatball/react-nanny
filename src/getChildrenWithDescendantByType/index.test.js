/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { getChildrenWithDescendantByType } = require('../../dist/lib/es5/index');

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
React.Children.toArray = x => (x && Array.isArray(x) ? x : [x]);

describe('getChildrenWithDescendantByType', () => {
  test('Single', () => {
    expect(getChildrenWithDescendantByType(children, 'CustomComponent')).toStrictEqual([
      children[0],
      children[1],
      children[2],
    ]);
  });

  test('Basic', () => {
    expect(getChildrenWithDescendantByType(children, ['CustomComponent'])).toStrictEqual([
      children[0],
      children[1],
      children[2],
    ]);
  });

  test('customTypeKey', () => {
    expect(getChildrenWithDescendantByType(children, ['CustomComponent'], { customTypeKey: 'TYPE' })).toStrictEqual([
      children[0],
    ]);
  });

  test('Empty', () => {
    expect(getChildrenWithDescendantByType(children, ['Doesn\'t Exist'])).toStrictEqual([]);
  });
});