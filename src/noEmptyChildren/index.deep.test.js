const React = require('react');
const { noEmptyChildrenDeep } = require('../../dist/lib/es5/index');

describe('noEmptyChildrenDeep', () => {
  test('Deep => not empty', () => {
    const component = {
      type: 'div',
      props: {
        children: 'Content',
      },
    };
    expect(noEmptyChildrenDeep(component)).toStrictEqual(true);
  });
  test('Deep => not empty => fragment', () => {
    const component = {
      type: 'Symbol(react.fragment)',
      props: {
        children: 'Content',
      },
    };
    expect(noEmptyChildrenDeep(component)).toStrictEqual(true);
  });
  test('Deep => not empty => complex', () => {
    const component = {
      type: 'div',
      props: {
        children: [
          {
            type: 'div',
            props: {
              children: [
                {
                  type: 'div',
                  children: 'Content',
                },
              ],              
            },
          },
          {
            type: 'div',
            props: {
              children: [
                {
                  type: 'div',
                  props: {
                    children: [
                      {
                        type: 'div',
                        props: {
                          children: 'Content',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          children: 'Content',
                        },
                      },
                    ],
                  },                  
                },
                {
                  type: 'div',
                  props: {
                    children: 'Content',
                  },
                },
              ],
            }
          },
        ],
      },
    };
    expect(noEmptyChildrenDeep(component)).toStrictEqual(true);
  });
  test('Deep => not empty => one thing', () => {
    const component = {
      type: 'div',
      props: {
        children: [
          {
            type: 'div',
            props: {
              children: [
                {
                  type: 'div',
                  props: {},
                },
              ],              
            },
          },
          {
            type: 'div',
            props: {
              children: [
                {
                  type: 'div',
                  props: {
                    children: [
                      {
                        type: 'div',
                        props: {
                          children: 'content',
                        },
                      },
                      {
                        type: 'div',
                        props: {},
                      },
                    ],
                  },                  
                },
                {
                  type: 'div',
                  props: {},
                },
              ],
            }
          },
        ],
      },
    };
    expect(noEmptyChildrenDeep(component)).toStrictEqual(true);
  });
  
  test('Deep => empty', () => {
    const component = {
      type: 'div',
      props: {},
    };
    expect(noEmptyChildrenDeep(component)).toStrictEqual(false);
  });
  test('Deep => empty => complex', () => {
    const component = {
      type: 'div',
      props: {
        children: [
          {
            type: 'div',
            props: {
              children: [
                {
                  type: 'div',
                  props: {},
                },
              ],              
            },
          },
          {
            type: 'div',
            props: {
              children: [
                {
                  type: 'div',
                  props: {
                    children: [
                      {
                        type: 'div',
                        props: {},
                      },
                      {
                        type: 'div',
                        props: {},
                      },
                    ],
                  },                  
                },
                {
                  type: 'div',
                  props: {},
                },
              ],
            }
          },
        ],
      },
    };
    expect(noEmptyChildrenDeep(component)).toStrictEqual(false);
  });

  test('Deep => rejectCustom => empty', () => {
    const component = {
      props: {
        __TYPE: 'CustomComponent',
      },
    };
    expect(noEmptyChildrenDeep(component, { rejectCustom: true })).toStrictEqual(false);
  });
  test('Deep => rejectEmptyCustom => empty', () => {
    const component = {
      props: {
        __TYPE: 'CustomComponent',
      },
    };
    expect(noEmptyChildrenDeep(component, { rejectCustom: false, rejectEmptyCustom: true })).toStrictEqual(false);
  });
  test('Deep => rejectEmptyCustom => empty', () => {
    const component = {
      props: {
        __TYPE: 'CustomComponent',
      },
    };
    expect(noEmptyChildrenDeep(component, { rejectCustom: false })).toStrictEqual(true);
  });

  test('Deep => rejectEmptyCustom => not empty', () => {
    const component = {
      props: {
        __TYPE: 'CustomComponent',
        children: 'content',
      },
    };
    expect(noEmptyChildrenDeep(component, { rejectCustom: false, rejectEmptyCustom: true })).toStrictEqual(true);
  });
  test('Deep => Accept empty custom => empty', () => {
    const component = {
      props: {
        __TYPE: 'CustomComponent',
      },
    };
    expect(noEmptyChildrenDeep(component, { rejectCustom: false })).toStrictEqual(true);
  });

  test('Deep => ignore => not empty', () => {
    const component = {
      props: {
        __TYPE: 'CustomComponent',
        children: 'content',
      },
    };
    expect(noEmptyChildrenDeep(component, { ignore: ['CustomComponent'] })).toStrictEqual(true);
  });
  test('Deep => ignore => not empty => complex', () => {
    const component = {
      type: 'div',
      props: {
        children: [
          {
            type: 'div',
            props: {
              children: {
                props: {
                  __TYPE: 'CustomComponent',
                }
              },
            },
          },
          {
            type: 'div',
            props: {
              children: 'content',
            },
          },
        ],
      },
    };
    expect(noEmptyChildrenDeep(component, { ignore: ['CustomComponent'], rejectEmptyCustom: true })).toStrictEqual(true);
  });
  test('Deep => ignore => empty => complex', () => {
    const component = {
      type: 'div',
      props: {
        children: [
          {
            type: 'div',
            props: {
              children: {
                props: {
                  __TYPE: 'SomeOtherComponent',
                }
              },
            },
          },
          {
            type: 'div',
            props: {},
          },
        ],
      },
    };
    expect(noEmptyChildrenDeep(component, { ignore: ['CustomComponent'], rejectEmptyCustom: true })).toStrictEqual(false);
  });
});