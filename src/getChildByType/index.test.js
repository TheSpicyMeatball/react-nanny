const React = require('react');
const { getChildByType } = require('../../dist/lib/es5/index');

describe('getChildByType', () => {
  test('Custom Components', () => {
    let children = { props: { __TYPE: 'CustomComponent' }};
    React.Children.toArray = jest.fn().mockReturnValue([children]);
    expect(getChildByType(children, ['CustomComponent'])).toStrictEqual(children);

    children = [
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'Something Else' }},
      { props: { TYPE: 'Some TYPE' }},
      { type: 'div' },
    ];
    React.Children.toArray = jest.fn().mockReturnValue(children);

    expect(getChildByType(children, ['CustomComponent'])).toStrictEqual(children[0]);
    expect(getChildByType(children, ['Some TYPE'], 'TYPE')).toStrictEqual(children[3]);
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
    React.Children.toArray = jest.fn().mockReturnValue(children);
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
    React.Children.toArray = jest.fn().mockReturnValue(children);
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
    React.Children.toArray = jest.fn().mockReturnValue(children);
    expect(getChildByType(children, ['Doesn\'t Exist'])).toStrictEqual(undefined);
  });
});