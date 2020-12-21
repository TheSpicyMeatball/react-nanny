const React = require('react');
const { getChild } = require('../../dist/lib/es5/index');

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

describe('getChild', () => {
  test('Basic find', () => {
    expect(getChild(children, child => child.type === 'div')).toStrictEqual(children[4]);
    expect(getChild(children, child => child.type === 'span')).toStrictEqual(children[5]);
    expect(getChild(children, child => child.props.TYPE === 'Some TYPE')).toStrictEqual(children[3]);
  });

  test('undefined', () => {
    expect(getChild(children, child => child.type === 'bogus')).toBe(undefined);
  });
});