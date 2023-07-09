import {addContact} from '../../../api';

import {handleGetContactList} from './getContactList';

export const handleAddContact =
  (payload, nav, toast) => (dispatch, getState) => {
    addContact(payload)
      .then(response => {
        dispatch(handleGetContactList());
        toast.show({
          type: 'success',
          text1: 'Success to add new contact :)',
        });
        nav();
      })
      .catch(error => {
        toast.show({
          type: 'error',
          text1: 'Failed to add new contact, please try again!',
        });
      });
  };
