import {SET_CONTACT_LIST, SET_CONTACT_LIST_MASTER} from '../../action/contact';

const initialState = {
  contactListMaster: [],
  contactList: [],
};

export const ContactReducer = (state = initialState, {payload, type}) => {
  switch (type) {
    case SET_CONTACT_LIST_MASTER:
      return {
        ...state,
        contactListMaster: payload,
      };
    case SET_CONTACT_LIST:
      return {
        ...state,
        contactList: payload,
      };
    default:
      return state;
  }
};
