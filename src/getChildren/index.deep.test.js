/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { getChildrenDeep } = require('../../dist/lib/es5/index');

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

describe('getChildrenDeep', () => {
  test('Deep find', () => {
    expect(getChildrenDeep(children, child => child && child.props && child.props.active)).toStrictEqual([
      { props: { __TYPE: 'CustomComponent', active: true, children: 'Deep child active' }},
      { props: { __TYPE: 'CustomComponent', active: true, children: 'Outer child active' }},
    ]);
    expect(getChildrenDeep(children, child => child && child.props && child.props.hello === 'world')).toStrictEqual([{ type: 'span', props: { children: 'Outer span', hello: 'world' }}]);
  });

  test('Empty', () => {
    expect(getChildrenDeep(children, child => child && child.props && child.props.hello === 'Newman')).toStrictEqual([]);
  });
});