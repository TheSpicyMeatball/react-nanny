/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { getChildrenByTypeDeep } = require('../../dist/lib/es5/index');

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
  {
    props: {
      __TYPE: 'CustomComponentGroup', active: true, children: [
        {props: {__TYPE: 'CustomComponent', active: true, children: 'Outer child active in group'}},
      ],
    },
  },
  { type: 'span' },
  { type: 'div' },
  undefined,
  { type: 'div', props: { children: [null, {type: 'div'}] } },
];
React.Children.toArray = x => (x && Array.isArray(x) ? x : [x]);

describe('getChildrenByTypeDeep', () => {
  test('Deep Single', () => {
    expect(getChildrenByTypeDeep(children, 'CustomComponent')).toStrictEqual([
      { props: { __TYPE: 'CustomComponent', active: true, children: 'Deep child active' }},
      { props: { __TYPE: 'CustomComponent', active: false, children: 'Outer child' }},
      { props: { __TYPE: 'CustomComponent', active: true, children: 'Outer child active' }},
      { props: {__TYPE: 'CustomComponent', active: true, children: 'Outer child active in group'}},
    ]);
  });

  test('Deep Custom Component', () => {
    expect(getChildrenByTypeDeep(children, ['CustomComponent'])).toStrictEqual([
      { props: { __TYPE: 'CustomComponent', active: true, children: 'Deep child active' }},
      { props: { __TYPE: 'CustomComponent', active: false, children: 'Outer child' }},
      { props: { __TYPE: 'CustomComponent', active: true, children: 'Outer child active' }},
      { props: {__TYPE: 'CustomComponent', active: true, children: 'Outer child active in group' }},
    ]);
  });

  test('Deep Custom Component Mixed', () => {
    expect(getChildrenByTypeDeep(children, ['CustomComponent', 'CustomComponentGroup'])).toStrictEqual([
      { props: { __TYPE: 'CustomComponent', active: true, children: 'Deep child active' }},
      { props: { __TYPE: 'CustomComponent', active: false, children: 'Outer child' }},
      { props: { __TYPE: 'CustomComponent', active: true, children: 'Outer child active' }},
      {
        props: {
          __TYPE: 'CustomComponentGroup', active: true, children: [
            {props: {__TYPE: 'CustomComponent', active: true, children: 'Outer child active in group'}},
          ],
        },
      },
      { props: {__TYPE: 'CustomComponent', active: true, children: 'Outer child active in group'}},
    ]);
  });

    test('Deep Custom Component Mixed Skip', () => {
        expect(getChildrenByTypeDeep(children, ['CustomComponent', 'CustomComponentGroup'], {skipWhenFound: true})).toStrictEqual([
            { props: { __TYPE: 'CustomComponent', active: true, children: 'Deep child active' }},
            { props: { __TYPE: 'CustomComponent', active: false, children: 'Outer child' }},
            { props: { __TYPE: 'CustomComponent', active: true, children: 'Outer child active' }},
            {
                props: {
                    __TYPE: 'CustomComponentGroup', active: true, children: [
                        {props: {__TYPE: 'CustomComponent', active: true, children: 'Outer child active in group'}},
                    ],
                },
            },
        ]);
    });


  test('Standard Html (JSX) Components', () => {
    expect(getChildrenByTypeDeep(children, ['span'])).toStrictEqual([
      { type: 'span', props: { children: 'Deep span' }},
      { type: 'span', props: { children: 'Outer span', hello: 'world' }},
      { type: 'span' },
    ]);
  });

  test('Mixed', () => {
    expect(getChildrenByTypeDeep(children, ['span', 'CustomComponent'])).toStrictEqual([
      { props: { __TYPE: 'CustomComponent', active: true, children: 'Deep child active' }},
      { type: 'span', props: { children: 'Deep span' }},
      { type: 'span', props: { children: 'Outer span', hello: 'world' }},
      { props: { __TYPE: 'CustomComponent', active: false, children: 'Outer child' }},
      { props: { __TYPE: 'CustomComponent', active: true, children: 'Outer child active' }},
      {props: {__TYPE: 'CustomComponent', active: true, children: 'Outer child active in group'}},
      { type: 'span' },
    ]);
  });

  test('Empty', () => {
    expect(getChildrenByTypeDeep(children, ['bogus'])).toStrictEqual([]);
  });
});