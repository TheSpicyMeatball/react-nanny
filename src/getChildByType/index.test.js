/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { getChildByType } = require('../../dist/lib/es5/index');

describe('getChildByType', () => {
  React.Children.toArray = x => (x && Array.isArray(x) ? x : [x]).filter(z => z != undefined);
  
  test('Single', () => {
    let children = { props: { __TYPE: 'CustomComponent' }};
    expect(getChildByType(children, ['CustomComponent'])).toStrictEqual(children);

    children = [
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'Something Else' }},
      { props: { TYPE: 'Some TYPE' }},
      { type: 'div' },
    ];

    expect(getChildByType(children, 'CustomComponent')).toStrictEqual(children[0]);
    expect(getChildByType(children, 'Some TYPE', { customTypeKey: 'TYPE' })).toStrictEqual(children[3]);
  });

  test('Custom Components', () => {
    let children = { props: { __TYPE: 'CustomComponent' }};
    expect(getChildByType(children, ['CustomComponent'])).toStrictEqual(children);

    children = [
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'Something Else' }},
      { props: { TYPE: 'Some TYPE' }},
      { type: 'div' },
    ];

    expect(getChildByType(children, ['CustomComponent'])).toStrictEqual(children[0]);
    expect(getChildByType(children, ['Some TYPE'], { customTypeKey: 'TYPE' })).toStrictEqual(children[3]);
    expect(getChildByType(children, ['CustomComponent', 'Something Else'])).toStrictEqual(children[0]);
    expect(getChildByType(children, ['Something Else', 'div'])).toStrictEqual(children[2]);
  });

  test('Standard Html (JSX) Components', () => {
    const children = [
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'Something Else' }},
      { props: { TYPE: 'Some TYPE' }},
      { type: 'div' },
      { type: 'span' },
      { type: 'div' },
    ];
    expect(getChildByType(children, ['div'])).toStrictEqual(children[4]);
    expect(getChildByType(children, ['span'])).toStrictEqual(children[5]);
    expect(getChildByType(children, ['div', 'span'])).toStrictEqual(children[4]);
  });

  test('Mixed', () => {
    const children = [
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'Something Else' }},
      { props: { TYPE: 'Some TYPE' }},
      { type: 'div' },
      { type: 'span' },
      { type: 'div' },
    ];
    expect(getChildByType(children, ['div', 'span', 'CustomComponent'])).toStrictEqual(children[0]);
  });

  test('undefined', () => {
    const children = [
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'Something Else' }},
      { props: { TYPE: 'Some TYPE' }},
      { type: 'div' },
      { type: 'span' },
      { type: 'div' },
    ];
    expect(getChildByType(children, ['Doesn\'t Exist'])).toStrictEqual(undefined);
  });

  test('Prioritized', () => {
    const children = [
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'Something Else' }},
      { props: { TYPE: 'Some TYPE' }},
      { type: 'div' },
      { type: 'span' },
      { type: 'div' },
    ];
    expect(getChildByType(children, ['div', 'span', 'CustomComponent'], { prioritized: true })).toStrictEqual(children[4]);
    expect(getChildByType(children, ['b', 'em', 'NotFound'], { prioritized: true })).toBe(undefined);
  });
});