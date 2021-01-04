/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { removeChildrenDeep } = require('../../dist/lib/es5/index');

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

describe('removeChildrenDeep', () => {
  test('Deep remove', () => {
    expect(removeChildrenDeep(children, child => child && child.props && child.props.active === true)).toStrictEqual([
      { 
        props: { 
          __TYPE: 'div',
          children: [
            { 
              props: { 
                __TYPE: 'div',
                children: [
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
      { type: 'span' },
      { type: 'div' },
    ]);
  });
});