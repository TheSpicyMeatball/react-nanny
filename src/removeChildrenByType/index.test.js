/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { removeChildrenByType } = require('../../dist/lib/es5/index');

describe('removeChildrenByType', () => {
  test('Single', () => {
    let children = { props: { __TYPE: 'CustomComponent' }};
    let reactChildrenToArrayOutput = [children];
    React.Children.toArray = jest.fn().mockReturnValue(reactChildrenToArrayOutput);
    expect(removeChildrenByType(children, 'CustomComponent')).toStrictEqual([]);

    children = [
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'Something Else' }},
      { props: { TYPE: 'Some TYPE' }},
      { type: 'div' },
    ];
    React.Children.toArray = jest.fn().mockReturnValue(children);

    expect(removeChildrenByType(children, 'CustomComponent')).toStrictEqual(children.slice(2));
    expect(removeChildrenByType(children, 'Some TYPE', { customTypeKey: 'TYPE' })).toStrictEqual([...children.slice(0, 3), children[4]]);
  });

  test('Custom Components', () => {
    let children = { props: { __TYPE: 'CustomComponent' }};
    let reactChildrenToArrayOutput = [children];
    React.Children.toArray = jest.fn().mockReturnValue(reactChildrenToArrayOutput);
    expect(removeChildrenByType(children, ['CustomComponent'])).toStrictEqual([]);

    children = [
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'CustomComponent' }},
      { props: { __TYPE: 'Something Else' }},
      { props: { TYPE: 'Some TYPE' }},
      { type: 'div' },
    ];
    React.Children.toArray = jest.fn().mockReturnValue(children);

    expect(removeChildrenByType(children, ['CustomComponent'])).toStrictEqual(children.slice(2));
    expect(removeChildrenByType(children, ['Some TYPE'], { customTypeKey: 'TYPE' })).toStrictEqual([...children.slice(0, 3), children[4]]);
    expect(removeChildrenByType(children, ['CustomComponent', 'Something Else'])).toStrictEqual(children.slice(3));
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
    expect(removeChildrenByType(children, ['div'])).toStrictEqual([...children.slice(0, 4), children[5]]);
    expect(removeChildrenByType(children, ['div', 'span'])).toStrictEqual(children.slice(0, 4));
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
    expect(removeChildrenByType(children, ['div', 'span', 'CustomComponent'])).toStrictEqual(children.slice(2, 4));
  });
});