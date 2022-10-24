/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { overrideProps, overridePropsDeep } = require('../../dist/lib/es5/index');

describe('overrideProps', () => {
  React.Children.toArray = x => (x && Array.isArray(x) ? x : [x]);
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

  test('Basic => single', () => {
    const component = {
      props: {
        children: { props: { active: false, title: 'Supervisor' }},
        hello: 'Hello world',
      },
    };

    expect(overrideProps(component, () => ({ active: true }))).toStrictEqual({
      props: {
        children: { props: { active: true, title: 'Supervisor' }},
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

  test('Basic => updating self prop => null self', () => {    
    expect(overrideProps(component, () => ({ active: true }), null)).toStrictEqual({
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
    expect(overrideProps({ props: {}}, () => ({ active: true }))).toStrictEqual({ props: {}});
    expect(overrideProps({}, () => ({ active: true }))).toStrictEqual({});
  });
});

describe('overridePropsDeep', () => {
  React.Children.toArray = x => (x && Array.isArray(x) ? x : [x]);
  React.cloneElement = (x, props) => ({ ...x, props: { ...x.props, ...props }});
  
  const children = {
    props: {
      children: [
        { props: { active: false, title: 'Supervisor' }},
        { props: { 
          active: false, title: 'Employee',
          children: [
            { props: { active: false, title: 'Supervisor' }},
            { props: { active: false, title: 'Employee' }},
            { props: { active: false, title: 'Employee' }},
            { props: { active: false, title: 'Supervisor' }},
          ],
        }},
        { props: { active: false, title: 'Employee' }},
        { props: { active: false, title: 'Supervisor' }},
      ],
      hello: 'Hello world',
    },
  };

  test('Basic', () => {
    expect(overridePropsDeep(children, () => ({ active: true }))).toStrictEqual([{
      props: {
        active: true,
        children: [
          { props: { active: true, title: 'Supervisor' }},
          { props: { 
            active: true, title: 'Employee',
            children: [
              { props: { active: true, title: 'Supervisor' }},
              { props: { active: true, title: 'Employee' }},
              { props: { active: true, title: 'Employee' }},
              { props: { active: true, title: 'Supervisor' }},
            ],
          }},
          { props: { active: true, title: 'Employee' }},
          { props: { active: true, title: 'Supervisor' }},
        ],
        hello: 'Hello world',
      },
    }]);
  });

  test('Basic => single', () => {
    const children = {
      props: {
        children: { props: { active: false, title: 'Supervisor' }},
        hello: 'Hello world',
      },
    };

    expect(overridePropsDeep(children, () => ({ active: true }))).toStrictEqual([{
      props: {
        active: true,
        children: [{ props: { active: true, title: 'Supervisor' }}],
        hello: 'Hello world',
      },
    }]);
  });

  test('conditional on child prop value', () => {    
    expect(overridePropsDeep(children, child => child.props.title === 'Supervisor' ? ({ active: true }) : {})).toStrictEqual([{
      props: {
        children: [
          { props: { active: true, title: 'Supervisor' }},
          { props: { 
            active: false, title: 'Employee',
            children: [
              { props: { active: true, title: 'Supervisor' }},
              { props: { active: false, title: 'Employee' }},
              { props: { active: false, title: 'Employee' }},
              { props: { active: true, title: 'Supervisor' }},
            ],
          }},
          { props: { active: false, title: 'Employee' }},
          { props: { active: true, title: 'Supervisor' }},
        ],
        hello: 'Hello world',
      },
    }]);
  });

  test('nothing', () => {
    expect(overridePropsDeep(null, () => ({ active: true }))).toStrictEqual([]);
    expect(overridePropsDeep({ props: {}}, () => ({ active: true }))).toStrictEqual([{ props: { active: true } }]);
    expect(overridePropsDeep({}, () => ({ active: true }))).toStrictEqual([{}]);
  });
});