const { typeOfComponent } = require('../../dist/lib/es5/index');

describe('typeOfComponent', () => {
  test('Custom Components', () => {
    expect(typeOfComponent({ props: { __TYPE: 'CustomComponent' }})).toBe('CustomComponent');
    expect(typeOfComponent({ props: { __TYPE: 'CustomComponent' }, type: 'div' })).toBe('CustomComponent');
    expect(typeOfComponent({ props: { TYPE: 'CustomComponent' }}, 'TYPE')).toBe('CustomComponent');
    expect(typeOfComponent({ props: { TYPE: 'CustomComponent' }, type: 'div' }, 'TYPE')).toBe('CustomComponent');
  });

  test('Standard Html (JSX) Components', () => {
    expect(typeOfComponent({ type: 'div' })).toBe('div');
  });

  test('string', () => {
    expect(typeOfComponent('my string')).toBe('string');
  });

  test('undefined', () => {
    expect(typeOfComponent({})).toBe(undefined);
    expect(typeOfComponent({ props: {}})).toBe(undefined);
    expect(typeOfComponent({ props: { TYPE: 'CustomComponent' }})).toBe(undefined);
    expect(typeOfComponent({ props: { __TYPE: 'CustomComponent' }}, 'bogus key')).toBe(undefined);
  });
});