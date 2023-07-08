import {addContact} from '../../../api';

import {handleGetContactList} from './getContactList';

export const handleAddContact = (payload, toast) => (dispatch, getState) => {
  console.log('addContact');
  addContact(payload)
    .then(response => {
      dispatch(handleGetContactList());
      toast.show({
        type: 'success',
        text1: 'Success to add new contact, :)',
      });
    })
    .catch(error => {
      console.log(error.response);
      toast.show({
        type: 'error',
        text1: 'Failed to add new contact, please try again!',
      });
    });
};
