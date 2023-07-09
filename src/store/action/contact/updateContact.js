import {updateContact} from '../../../api';

export const handleUpdateContact =
  (payload, toast, updateMasterData) => (dispatch, getState) => {
    const {firstName, lastName, age, photo} = payload;
    updateContact({
      firstName,
      lastName,
      age,
      photo,
    })
      .then(({data}) => {
        dispatch(getContactList());
        toast.show({
          type: 'success',
          text1: 'Success update new contact :)',
        });
        updateMasterData();
      })
      .catch(error => {
        console.log('error.response');
        toast.show({
          type: 'error',
          text1: 'Failed update contact, please try again!',
        });
      });
  };
