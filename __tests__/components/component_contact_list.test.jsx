/**
 * @format
 */

import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {describe, expect, jest, it} from '@jest/globals';

import {MockResponseServiceGetContactList} from '../../src/assets/mockData';
import {ContactList} from '../../src/components';

describe('ContactList Component', () => {
  const contacts = MockResponseServiceGetContactList.map(el => ({
    ...el,
    search: el.firstName + el.lastName,
    uniqKey: el.firstName[0] || el.lastName[0],
  }));
  it('renders headers and contact list items correctly', () => {
    const handleActionMock = jest.fn();
    const {getByText, getAllByTestId} = render(
      <ContactList data={contacts} handleAction={handleActionMock} />,
    );

    // Assert that headers are rendered correctly
    expect(getByText('A')).toBeTruthy();
    expect(getByText('B')).toBeTruthy();

    // Assert that contact items are rendered correctly
    expect(getByText('Aest test')).toBeTruthy();
    expect(getByText('Age 20')).toBeTruthy();
    expect(getByText('Btest rem')).toBeTruthy();
    expect(getByText('Age 25')).toBeTruthy();

    // Assert the number of contact items rendered
    const contactItems = getAllByTestId('contact-item');
    expect(contactItems).toHaveLength(2);
  });

  it('calls handleAction when a contact item is pressed', () => {
    const handleActionMock = jest.fn();
    const {getAllByTestId} = render(
      <ContactList data={contacts} handleAction={handleActionMock} />,
    );

    // Simulate a press event on the first contact item
    const contactItem = getAllByTestId('contact-item')[0];
    fireEvent.press(contactItem);

    // Assert that handleActionMock is called with the correct ID
    expect(handleActionMock).toHaveBeenCalledWith(
      '0258a8f0-1e17-11ee-8a46-b9ba2d1a3e1b',
    );
  });

  it('renders "Maaf Data Kosong" when data is empty', () => {
    const {getByText} = render(<ContactList data={[]} />);

    // Assert that "Maaf Data Kosong" is rendered when data is empty
    expect(getByText('Maaf Data Kosong')).toBeTruthy();
  });
});
