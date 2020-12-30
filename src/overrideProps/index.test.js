const React = require('react');
const { overrideProps } = require('../../dist/lib/es5/index');

describe('overrideProps', () => {
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
    expect(overrideProps(component, () => ({ active: true }))).toStrictEqual({
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
    expect(overrideProps(component, () => ({ active: true }), { hello: 'Hola mundo' })).toStrictEqual({
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
    expect(overrideProps(component, child => child.props.title === 'Supervisor' ? ({ active: true }) : {})).toStrictEqual({
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
    expect(overrideProps(null, () => ({ active: true }))).toBe(null);
    expect(overrideProps(null, () => ({ active: true }), { hello: 'Hola mundo' })).toBe(null);
  });
});