import {deleteContact, getContactList} from '../../../api';

export const handleDeleteContact =
  (params, nav, toast) => (dispatch, getState) => {
    deleteContact(params)
      .then(({data}) => {
        toast({
          type: 'success',
          text1: 'Success to remove spesific contac :)',
        });
        dispatch(getContactList());
        nav();
        console.log('deleteContact', data);
      })
      .catch(error => {
        toast.show({
          type: 'error',
          text1: 'Failed to remove spesific contact, please try again!',
        });
        console.log(error.response);
      });
  };
