const React = require('react');
const { getChildDeep } = require('../../dist/lib/es5/index');

let children = [
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
  { type: 'span' },
  { type: 'div' },
];
React.Children.toArray = x => (x && Array.isArray(x) ? x : [x]).filter(z => z != undefined);

describe('getChildDeep', () => {
  test('Deep find', () => {
    expect(getChildDeep(children, child => child && child.props && child.props.active)).toStrictEqual({ props: { __TYPE: 'CustomComponent', active: true, children: 'Deep child active' }});
    expect(getChildDeep(children, child => child && child.type === 'span')).toStrictEqual({ type: 'span', props: { children: 'Deep span' }});
  });

  test('Change order', () => {
    children = [
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
    
    expect(getChildDeep(children, child => child && child.props && child.props.active)).toStrictEqual({ props: { __TYPE: 'CustomComponent', active: true, children: 'Outer child active' }});
    expect(getChildDeep(children, child => child && child.type === 'span')).toStrictEqual({ type: 'span', props: { children: 'Outer span' }});
  });

  test('undefined', () => {
    expect(getChildDeep(children, child => child && child.props && child.props.bogus)).toBe(undefined);
  });
});