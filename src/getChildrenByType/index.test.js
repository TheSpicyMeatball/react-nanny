const React = require('react');
const { getChildrenByType } = require('../../dist/lib/es5/index');

describe('getChildrenByType', () => {
  test('Custom Components', () => {
    let children = { props: { __TYPE: 'CustomComponent' }};
    let reactChildrenToArrayOutput = [children];
    React.Children.toArray = jest.fn().mockReturnValue(reactChildrenToArrayOutput);
    expect(getChildrenByType(children, ['CustomComponent'])).toStrictEqual(reactChildrenToArrayOutput);

    children = [
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'Something Else' }},
      { props: { TYPE: 'Some TYPE' }},
      { type: 'div' },
    ];
    React.Children.toArray = jest.fn().mockReturnValue(children);

    expect(getChildrenByType(children, ['CustomComponent'])).toStrictEqual(children.slice(0, 2));
    expect(getChildrenByType(children, ['Some TYPE'], { customTypeKey: 'TYPE' })).toStrictEqual([children[3]]);
    expect(getChildrenByType(children, ['CustomComponent', 'Something Else'])).toStrictEqual(children.slice(0, 3));
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
    expect(getChildrenByType(children, ['div'])).toStrictEqual([children[4], children[6]]);
    expect(getChildrenByType(children, ['div', 'span'])).toStrictEqual(children.slice(4, 7));
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
    expect(getChildrenByType(children, ['div', 'span', 'CustomComponent'])).toStrictEqual([...children.slice(0, 2), ...children.slice(4, 7)]);
  });

  test('Empty', () => {
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
    expect(getChildrenByType(children, ['Doesn\'t Exist'])).toStrictEqual([]);
  });
});