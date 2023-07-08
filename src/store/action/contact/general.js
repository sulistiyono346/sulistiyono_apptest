export const SET_CONTACT_LIST_MASTER = 'contact/SET_CONTACT_LIST_MASTER';
export const SET_CONTACT_LIST = 'contact/SET_CONTACT_LIST';

export const setContactListMaster = payload => dispatch =>
  dispatch({type: SET_CONTACT_LIST_MASTER, payload});
export const setContactList = payload => dispatch =>
  dispatch({type: SET_CONTACT_LIST, payload});
