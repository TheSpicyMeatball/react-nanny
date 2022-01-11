const React = require('react');
const { overrideProps } = require('../../dist/lib/es5/index');
const { processTypes } = require('../../dist/lib/es5/_private/utils');

describe('processTypes', () => {
  React.createElement = x => x;

  test('function', () => {
    const func = () => 'test';
    func.type = () => 'type';

    expect(processTypes([func])).toStrictEqual([func.type]);
  });

  test('object', () => {
    expect(processTypes([{}])).toStrictEqual([undefined]);

    const fwdRef = {
      type: {
        $$typeof: Symbol('react.forward_ref'),
        render: (props, ref) => (({ props: { __TYPE: 'CustomComponent' }})),
      },
    };
    expect(processTypes([fwdRef])).toStrictEqual(['CustomComponent']);
  });
});