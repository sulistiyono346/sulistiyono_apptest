import {getContactList} from '../../../api';
import {setContactList, setContactListMaster} from './general';

export const handleGetContactList = () => (dispatch, getState) => {
  getContactList()
    .then(({data}) => {
      const contacts = data?.data.map(el => ({
        ...el,
        search: el.firstName + el.lastName,
        uniqKey: el.firstName[0] || el.lastName[0],
      }));

      dispatch(setContactList(contacts));
      dispatch(setContactListMaster(contacts));
    })
    .catch(error => {
      console.log(error);
    });
};
