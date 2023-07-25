import React from 'react';
import {render} from '@testing-library/react-native';
import H1 from '../../src/components/H1';

describe('H1 Component', () => {
  it('renders the correct text', () => {
    const {getByText} = render(<H1>Hello, World!</H1>);

    // Assert that the correct text is rendered
    expect(getByText('Hello, World!')).toBeTruthy();
  });

  it('renders with default props', () => {
    const {getByText} = render(<H1>Default Text</H1>);

    // Assert that the text is rendered with default color and fontWeight
    const textElement = getByText('Default Text');
    expect(textElement.props.style).toEqual({
      color: '#1B2124',
      fontWeight: 600,
      fontSize: 18,
    });
  });

  it('renders with custom props', () => {
    const customColor = '#FF0000';
    const customFontWeight = 700;
    const {getByText} = render(
      <H1 color={customColor} fontWeight={customFontWeight}>
        Custom Text
      </H1>,
    );

    // Assert that the text is rendered with custom color and fontWeight
    const textElement = getByText('Custom Text');
    expect(textElement.props.style).toEqual({
      color: customColor,
      fontWeight: customFontWeight,
      fontSize: 18,
    });
  });
});
