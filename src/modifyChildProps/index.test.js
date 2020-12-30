const React = require('react');
const { modifyChildProps } = require('../../dist/lib/es5/index');

describe('modifyChildProps', () => {
  React.Children.toArray = x => (x && Array.isArray(x) ? x : [x]).filter(z => z != undefined);
  React.cloneElement = (x, props) => ({ ...x, props: { ...x.props, ...props }});
  
  const component = {
    props: {
      children: [
        { props: { active: false, title: 'Supervisor' }},
        { props: { active: false, title: 'Employee' }},
        { props: { active: false, title: 'Employee' }},
        { props: { active: false, title: 'Supervisor' }},
      ],
      hello: 'Hello world',
    },
  };

  test('Basic', () => {    
    expect(modifyChildProps(component, () => ({ active: true }))).toStrictEqual({
      props: {
        children: [
          { props: { active: true, title: 'Supervisor' }},
          { props: { active: true, title: 'Employee' }},
          { props: { active: true, title: 'Employee' }},
          { props: { active: true, title: 'Supervisor' }},
        ],
        hello: 'Hello world',
      },
    });
  });

  test('Basic => updating self prop', () => {    
    expect(modifyChildProps(component, () => ({ active: true }), { hello: 'Hola mundo' })).toStrictEqual({
      props: {
        children: [
          { props: { active: true, title: 'Supervisor' }},
          { props: { active: true, title: 'Employee' }},
          { props: { active: true, title: 'Employee' }},
          { props: { active: true, title: 'Supervisor' }},
        ],
        hello: 'Hola mundo',
      },
    });
  });

  test('conditional on child prop value', () => {    
    expect(modifyChildProps(component, child => child.props.title === 'Supervisor' ? ({ active: true }) : {})).toStrictEqual({
      props: {
        children: [
          { props: { active: true, title: 'Supervisor' }},
          { props: { active: false, title: 'Employee' }},
          { props: { active: false, title: 'Employee' }},
          { props: { active: true, title: 'Supervisor' }},
        ],
        hello: 'Hello world',
      },
    });
  });

  test('nothing', () => {
    expect(modifyChildProps(null, () => ({ active: true }))).toBe(null);
    expect(modifyChildProps(null, () => ({ active: true }), { hello: 'Hola mundo' })).toBe(null);
  });
});