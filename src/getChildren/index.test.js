/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { getChildren } = require('../../dist/lib/es5/index');

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

describe('getChildren', () => {
  test('Basic find', () => {
    expect(getChildren(children, child => child.props.active)).toStrictEqual(children.slice(2, 4));
    expect(getChildren(children, child => child.props.hello === 'world')).toStrictEqual([children[1], ...children.slice(5)]);
  });

  test('Empty', () => {
    expect(getChildren(children, child => child.props.hello === 'Newman')).toStrictEqual([]);
  });
});