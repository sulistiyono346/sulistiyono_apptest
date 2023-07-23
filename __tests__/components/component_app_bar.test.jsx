/**
 * @format
 */

import 'react-native';
import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {describe, expect, jest, it} from '@jest/globals';

import {View} from 'react-native';
import {AppBar} from '../../src/components';

describe('Component AppBar Test', () => {
  it('renders AppBar component with title', () => {
    const title = 'Test Title';
    const {getByText} = render(<AppBar title={title} />);

    // Assert that the title is rendered correctly
    const appBarTitle = getByText(title);
    expect(appBarTitle).toBeTruthy();
  });

  it('calls leftAction when left button is touched', async () => {
    const leftActionMock = jest.fn();
    const {getByTestId} = render(
      <AppBar
        leftAction={() => leftActionMock()}
        leftIcon={<View testID="left-button">Left Icon</View>}
      />,
    );

    // Simulate a press event on the left button
    const leftButton = getByTestId('left-button');
    fireEvent.press(leftButton);

    // Assert that leftActionMock is called
    expect(leftActionMock).toHaveBeenCalled();
  });
  it('calls right Action when right button is touched', async () => {
    const rightActionMock = jest.fn();
    const {getByTestId} = render(
      <AppBar
        rightAction={() => rightActionMock()}
        rightIcon={<View testID="right-button">Right Icon</View>}
      />,
    );

    // Simulate a press event on the  right button
    const rightButton = getByTestId('right-button');
    fireEvent.press(rightButton);

    // Assert that  rightActionMock is called
    expect(rightActionMock).toHaveBeenCalled();
  });
});
