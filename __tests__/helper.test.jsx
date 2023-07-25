/**
 * @format
 */

import 'react-native';
import {it, describe, expect} from '@jest/globals';
import {
  checkIsFavorite,
  generateInitialName,
  isValidUrlImage,
  transformData,
} from '../src/helper';
import {
  MockResponseServiceGetContactList,
  MockResultTransformData,
} from '../src/assets/mockData';

describe('Helper Test', () => {
  it('[Generate Initial Name] function given 2 string data , generateInitialName should return 2 length of data', () => {
    expect(generateInitialName('John', 'Do')).toBe('JD');
  });
  it('[Generate Initial Name] function given 1 string data , generateInitialName should return 1 length of data', () => {
    expect(generateInitialName('John', '')).toBe('J');
  });
  it('[Generate Initial Name] function given empty string data , generateInitialName should return 0 length of data', () => {
    expect(generateInitialName('', '')).toBe('');
  });
  it('[Valid Url Image] function given ul image data , isValidUrlImage should return true ', () => {
    expect(
      isValidUrlImage(
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
      ),
    ).toBe(true);
  });
  it('[Valid Url Image] function given url image data , isValidUrlImage should return true ', () => {
    expect(
      isValidUrlImage(
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
      ),
    ).toBe(true);
  });
  it('[Valid Url Image] function given invalid url image data , isValidUrlImage should return false ', () => {
    expect(
      isValidUrlImage(
        'htt://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
      ),
    ).toBe(false);
  });
  it('[Check Is Favorite]function given data favorite and id stored favorite , checkIsFavorite should return true ', () => {
    expect(
      checkIsFavorite(
        MockResponseServiceGetContactList,
        '0258a8f0-1e17-11ee-8a46-b9ba2d1a3e1b',
      ),
    ).toBe(true);
  });
  it('[Transform Data]function given data favorite and id not stored favorite , checkIsFavorite should return false ', () => {
    expect(
      checkIsFavorite(
        MockResponseServiceGetContactList,
        '0258a8f0-1e17-11ee-8a46-b9ba2d1a3e1',
      ),
    ).toBe(false);
  });
  it('[Transform Data]function given data from response , must return the data accordingly MockResultTransformData', () => {
    const contacts = MockResponseServiceGetContactList.map(el => ({
      ...el,
      search: el.firstName + el.lastName,
      uniqKey: el.firstName[0] || el.lastName[0],
    }));
    expect(transformData(contacts)).toEqual(MockResultTransformData);
  });
  it('[Transform Data]function given data from response , must return empty arrays ', () => {
    expect(transformData([])).toEqual([]);
  });
});
