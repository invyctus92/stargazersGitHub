

import React from 'react';
import renderer from 'react-test-renderer';
import ListStargazers from '../src/components/ListStargazers/ListStargazers';

test('renders correctly', () => {
  const tree = renderer.create(<ListStargazers stargazers={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});

