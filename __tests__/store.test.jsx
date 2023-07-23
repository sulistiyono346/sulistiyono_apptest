/**
 * @format
 */

import 'react-native';

import {it, describe, expect} from '@jest/globals';
import store from '../src/store/stores';

import {MockResponseServiceGetContactList} from '../src/assets/mockData';
import {
  setContactList,
  setContactListMaster,
} from '../src/store/action/contact';
import {
  SET_CONTACT_DETAIL,
  setContactDetail,
} from '../src/store/action/contact_detail';

describe('Store Test', () => {
  it('[Set Contact List Master] function given 2 data , setContactListMaster should return 2 length of data', () => {
    const contacts = MockResponseServiceGetContactList.map(el => ({
      ...el,
      search: el.firstName + el.lastName,
      uniqKey: el.firstName[0] || el.lastName[0],
    }));
    store.dispatch(setContactListMaster(contacts));
    let result = store.getState().ContactReducer.contactListMaster;
    expect(contacts).toBe(result);
  });
  it('[Set Contact List] function given 2 data , setContactList should return 2 length of data', () => {
    const contacts = MockResponseServiceGetContactList.map(el => ({
      ...el,
      search: el.firstName + el.lastName,
      uniqKey: el.firstName[0] || el.lastName[0],
    }));
    store.dispatch(setContactList(contacts));
    let result = store.getState().ContactReducer.contactList;
    expect(contacts).toBe(result);
  });
});
