/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { getChildByTypeDeep } = require('../../dist/lib/es5/index');

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
        { type: 'span', props: { children: 'Outer span' }},
      ],
    },
  },
  { props: { __TYPE: 'CustomComponent', active: false, children: 'Outer child' }},
  { props: { __TYPE: 'CustomComponent', active: true, children: 'Outer child active' }},
  { props: { CustomKey: 'customTypeKey', children: 'Custom w/customTypeKey' }},
  { type: 'span' },
  { type: 'div' },
];
React.Children.toArray = x => (x && Array.isArray(x) ? x : [x]).filter(z => z != undefined);

describe('getChildByTypeDeep', () => {
  test('Deep find => single', () => {
    expect(getChildByTypeDeep(children, 'CustomComponent')).toStrictEqual({ props: { __TYPE: 'CustomComponent', active: true, children: 'Deep child active' }});
    expect(getChildByTypeDeep(children, 'span')).toStrictEqual({ type: 'span', props: { children: 'Deep span' }});
  });

  test('Deep find', () => {
    expect(getChildByTypeDeep(children, ['CustomComponent'])).toStrictEqual({ props: { __TYPE: 'CustomComponent', active: true, children: 'Deep child active' }});
    expect(getChildByTypeDeep(children, ['span'])).toStrictEqual({ type: 'span', props: { children: 'Deep span' }});
  });

  test('Change order', () => {
    const children = [
      { props: { __TYPE: 'CustomComponent', active: true, children: 'Outer child active' }},
      { type: 'span', props: { children: 'Outer span' }},
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
                  { props: { TYPE: 'CustomKey', children: 'Child w/customTypeKey' }},
                ],
              },
            },
          ],
        },
      },
      { props: { __TYPE: 'CustomComponent', active: false, children: 'Outer child' }},
      { type: 'div' },
      { type: 'span' },
    ];
    
    expect(getChildByTypeDeep(children, ['CustomComponent'])).toStrictEqual({ props: { __TYPE: 'CustomComponent', active: true, children: 'Outer child active' }});
    expect(getChildByTypeDeep(children, ['span'])).toStrictEqual({ type: 'span', props: { children: 'Outer span' }});
  });

  test('undefined', () => {
    expect(getChildByTypeDeep(children, ['bogus'])).toBe(undefined);
  });

  test('Prioritized', () => {
    expect(getChildByTypeDeep(children, ['span', 'CustomComponent'])).toStrictEqual({ props: { __TYPE: 'CustomComponent', active: true, children: 'Deep child active' }});
    expect(getChildByTypeDeep(children, ['span', 'CustomComponent'], { prioritized: false })).toStrictEqual({ props: { __TYPE: 'CustomComponent', active: true, children: 'Deep child active' }});
    expect(getChildByTypeDeep(children, ['span', 'CustomComponent'], { prioritized: true })).toStrictEqual({ type: 'span', props: { children: 'Deep span' }});
    expect(getChildByTypeDeep(children, ['b', 'em'], { prioritized: true })).toBe(undefined);
  });

  test('customTypeKey', () => {
    expect(getChildByTypeDeep(children, ['customTypeKey'], { customTypeKey: 'CustomKey' })).toStrictEqual({ props: { CustomKey: 'customTypeKey', children: 'Custom w/customTypeKey' }});
  });
});