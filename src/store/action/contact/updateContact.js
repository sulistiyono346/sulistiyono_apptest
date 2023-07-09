import {updateContact} from '../../../api';

export const handleUpdateContact =
  (payload, updateMasterData, resetToDataMaster, toast) =>
  (dispatch, getState) => {
    updateContact(payload)
      .then(({data}) => {
        dispatch(getContactList());
        toast.show({
          type: 'success',
          text1: 'Success update new contact :)',
        });
        updateMasterData();
      })
      .catch(error => {
        console.log(error.response);
        resetToDataMaster();
        toast.show({
          type: 'error',
          text1: 'Failed update contact, please try again!',
        });
      });
  };
