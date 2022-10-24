/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { getChildrenWithDescendant } = require('../../dist/lib/es5/index');

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
  undefined,
  { type: 'div', props: { children: [null, {type: 'div'}] } },
];
React.Children.toArray = x => (x && Array.isArray(x) ? x : [x]);

describe('getChildrenWithDescendant', () => {
  test('Basic', () => {
    expect(getChildrenWithDescendant(children, child => child?.props?.active)).toStrictEqual([
      children[0],
      children[2],
    ]);
  });

  test('Empty', () => {
    expect(getChildrenWithDescendant(children, child => child?.props?.hello === 'Newman')).toStrictEqual([]);
  });
});