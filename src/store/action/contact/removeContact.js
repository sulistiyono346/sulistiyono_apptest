import {deleteContact, getContactList} from '../../../api';

export const handleDeleteContact =
  (params, nav, toast) => (dispatch, getState) => {
    deleteContact(params)
      .then(({data}) => {
        nav();
        toast.show({
          type: 'success',
          text1: 'Success to remove spesific contact :)',
        });
        dispatch(getContactList());
      })
      .catch(error => {
        toast.show({
          type: 'error',
          text1: 'Failed to remove spesific contact, please try again!',
        });
      });
  };
