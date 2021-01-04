/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { removeChildren } = require('../../dist/lib/es5/index');

const children = [
  { props: { active: false }},
  { props: { hello: 'world' }},
  { props: { active: true }},
  { props: { active: true }},
  { props: { active: false }},
  { props: { hello: 'world' }},
  { props: { hello: 'world' }},
];
React.Children.toArray = jest.fn().mockReturnValue(children);

describe('removeChildren', () => {
  test('Basic remove', () => {
    expect(removeChildren(children, child => !child.props.active)).toStrictEqual(children.slice(2, 4));
    expect(removeChildren(children, child => child.props.hello === 'world')).toStrictEqual([children[0], ...children.slice(2, 5)]);
  });

  test('Empty', () => {
    expect(removeChildren(children, child => 'active' in child.props || child.props.hello === 'world')).toStrictEqual([]);
  });
});