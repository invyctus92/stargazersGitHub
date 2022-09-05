

import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import InputComponent from '../src/components/InputComponent/InputComponent';

test('renders correctly', () => {
  const tree = renderer.create(<InputComponent value="" onChangeText={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

import { render, screen, fireEvent } from '@testing-library/react-native';


test('input does not change its text by writing ', () => {
  const value = '';
  const onChangeTextMock = jest.fn();

  render(<InputComponent value={value} onChangeText={onChangeTextMock}  placeholder={"Write the repo"} />);

  const CHANGE_TEXT = 'content';

 
  fireEvent.changeText(screen.getByPlaceholderText("Write the repo"), CHANGE_TEXT);

  expect(onChangeTextMock).toBeCalledWith(CHANGE_TEXT);
  expect(value).toEqual("")
});


