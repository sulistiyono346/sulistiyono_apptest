import React from 'react';
import {render} from '@testing-library/react-native';
import Paragraf from '../../src/components/Paragraf';

describe('Paragraf Component', () => {
  it('renders the correct text', () => {
    const {getByText} = render(<Paragraf>Hello, World!</Paragraf>);

    // Assert that the correct text is rendered
    expect(getByText('Hello, World!')).toBeTruthy();
  });

  it('renders with default props', () => {
    const {getByText} = render(<Paragraf>Default Text</Paragraf>);

    // Assert that the text is rendered with default color and fontWeight
    const textElement = getByText('Default Text');
    expect(textElement.props.style).toEqual({
      color: '#1B2124',
      fontWeight: 400,
      fontSize: 12,
    });
  });

  it('renders with custom props', () => {
    const customColor = '#FF0000';
    const customFontWeight = 700;
    const {getByText} = render(
      <Paragraf color={customColor} fontWeight={customFontWeight}>
        Custom Text
      </Paragraf>,
    );

    // Assert that the text is rendered with custom color and fontWeight
    const textElement = getByText('Custom Text');
    expect(textElement.props.style).toEqual({
      color: customColor,
      fontWeight: customFontWeight,
      fontSize: 12,
    });
  });
});
