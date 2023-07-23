import React from 'react';
import {render} from '@testing-library/react-native';
import H3 from '../../src/components/H3';

describe('H3 Component', () => {
  it('renders the correct text', () => {
    const {getByText} = render(<H3>Hello, World!</H3>);

    // Assert that the correct text is rendered
    expect(getByText('Hello, World!')).toBeTruthy();
  });

  it('renders with default props', () => {
    const {getByText} = render(<H3>Default Text</H3>);

    // Assert that the text is rendered with default color and fontWeight
    const textElement = getByText('Default Text');
    expect(textElement.props.style).toEqual({
      color: '#1B2124',
      fontWeight: 600,
      fontSize: 14,
    });
  });

  it('renders with custom props', () => {
    const customColor = '#FF0000';
    const customFontWeight = 700;
    const {getByText} = render(
      <H3 color={customColor} fontWeight={customFontWeight}>
        Custom Text
      </H3>,
    );

    // Assert that the text is rendered with custom color and fontWeight
    const textElement = getByText('Custom Text');
    expect(textElement.props.style).toEqual({
      color: customColor,
      fontWeight: customFontWeight,
      fontSize: 14,
    });
  });
});
