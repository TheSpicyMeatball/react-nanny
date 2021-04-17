/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { removeChildrenByTypeDeep } = require('../../dist/lib/es5/index');

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

describe('removeChildrenByTypeDeep', () => {
  test('Single', () => {
    expect(removeChildrenByTypeDeep(children, 'CustomComponent')).toStrictEqual([
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
      { type: 'span' },
      { type: 'div' },
    ]);
  });

  test('Deep remove', () => {
    expect(removeChildrenByTypeDeep(children, ['CustomComponent'])).toStrictEqual([
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
      { type: 'span' },
      { type: 'div' },
    ]);
  });

  test('Standard Html (JSX) Components', () => {
    expect(removeChildrenByTypeDeep(children, ['span'])).toStrictEqual([
      { 
        props: { 
          __TYPE: 'div',
          children: [
            { 
              props: { 
                __TYPE: 'div',
                children: [
                  { props: { __TYPE: 'CustomComponent', active: true, children: 'Deep child active' }},
                  { type: 'div' },
                ],
              },
            },
          ],
        },
      },
      { props: { __TYPE: 'CustomComponent', active: false, children: 'Outer child' }},
      { props: { __TYPE: 'CustomComponent', active: true, children: 'Outer child active' }},
      { type: 'div' },
    ]);
  });

  test('Mixed', () => {
    expect(removeChildrenByTypeDeep(children, ['span', 'CustomComponent'])).toStrictEqual([
      { 
        props: { 
          __TYPE: 'div',
          children: [
            { 
              props: { 
                __TYPE: 'div',
                children: [
                  { type: 'div' },
                ],
              },
            },
          ],
        },
      },
      { type: 'div' },
    ]);
  });
});