/**
 * @format
 */

import 'react-native';

// Note: import explicitly to use the types shiped with jest.
import {it, describe, expect} from '@jest/globals';

// Note: test renderer must be required after react-native.
import store from '../src/store/stores';

import {MockResponseServiceGetContactList} from '../src/assets/mockData';
import {
  setContactList,
  setContactListMaster,
} from '../src/store/action/contact';
import {colors} from '../src/theme/colors';

describe('Colors Test', () => {
  it('[Color BLACK] function given Color BLACK ,should return #1B2124', () => {
    expect(colors.BLACK).toBe('#1B2124');
  });
  it('[Color BLUE_PRIMARY] function given Color BLUE_PRIMARY ,should return #4680FF', () => {
    expect(colors.BLUE_PRIMARY).toBe('#4680FF');
  });
  it('[Color GREEN_SUCCESS] function given Color GREEN_SUCCESS ,should return #27AE60', () => {
    expect(colors.GREEN_SUCCESS).toBe('#27AE60');
  });
  it('[Color GREEN] function given Color GREEN ,should return #34EAB9', () => {
    expect(colors.GREEN).toBe('#34EAB9');
  });
  it('[Color GREY] function given Color GREY ,should return #D9DBE9', () => {
    expect(colors.GREY).toBe('#D9DBE9');
  });
  it('[Color GREY50] function given Color GREY50 ,should return #A0A3BD', () => {
    expect(colors.GREY50).toBe('#A0A3BD');
  });
  it('[Color WHITE] function given Color WHITE ,should return #FFFFFF', () => {
    expect(colors.WHITE).toBe('#FFFFFF');
  });
  it('[Color RED_PRIMARY] function given Color RED_PRIMARY ,should return #F55858', () => {
    expect(colors.RED_PRIMARY).toBe('#F55858');
  });
});
