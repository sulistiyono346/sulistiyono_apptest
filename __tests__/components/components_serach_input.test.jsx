import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Search from '../../src/components/SearchInput';

describe('Search Component', () => {
  it('renders with default value and calls onChangeText', () => {
    const onChangeTextMock = jest.fn();
    const {getByPlaceholderText} = render(
      <Search value="" onChangeText={onChangeTextMock} />,
    );

    // Assert that the input field is rendered with the correct placeholder
    const inputElement = getByPlaceholderText('Search');
    expect(inputElement).toBeTruthy();

    // Simulate typing in the input field
    fireEvent.changeText(inputElement, 'Test Text');

    // Assert that onChangeTextMock is called with the typed text
    expect(onChangeTextMock).toHaveBeenCalledWith('Test Text');
  });

  it('renders with provided value', () => {
    const value = 'Hello';
    const {getByDisplayValue} = render(<Search value={value} />);

    // Assert that the input field is rendered with the provided value
    const inputElement = getByDisplayValue(value);
    expect(inputElement).toBeTruthy();
  });
});
