import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Favorite} from '../../src/components';
import {MockResponseServiceGetContactList} from '../../src/assets/mockData';

describe('Favorite Component', () => {
  it('renders favorite list when data is provided', () => {
    const handleActionMock = jest.fn();
    const {getByText, getByTestId} = render(
      <Favorite
        data={MockResponseServiceGetContactList}
        label="Favorites"
        handleAction={handleActionMock}
      />,
    );

    // Assert that the label is rendered correctly
    expect(getByText('Favorites')).toBeTruthy();

    // Assert that the items are rendered correctly
    MockResponseServiceGetContactList.forEach(item => {
      const itemImage = getByTestId(`item-image-${item.id}`);
      expect(itemImage).toBeTruthy();
    });
  });

  it('renders "Favorite list is empty" message when data is empty', () => {
    const {getByText} = render(<Favorite data={[]} label="Favorites" />);

    // Assert that the "Favorite list is empty" message is rendered when data is empty
    expect(getByText('Favorite list is empty')).toBeTruthy();
  });

  it('calls handleAction when an item is pressed', () => {
    const handleActionMock = jest.fn();
    const {getByTestId} = render(
      <Favorite
        data={MockResponseServiceGetContactList}
        label="Favorites"
        handleAction={handleActionMock}
      />,
    );

    //   // Simulate a press event on the first item
    const firstItem = getByTestId(
      `item-image-${MockResponseServiceGetContactList[0].id}`,
    );
    fireEvent.press(firstItem);

    // Assert that handleActionMock is called with the correct ID
    expect(handleActionMock).toHaveBeenCalledWith(
      MockResponseServiceGetContactList[0].id,
    );
  });
});
