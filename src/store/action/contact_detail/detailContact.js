import {contactDetail} from '../../../api';
import {setContactDetail} from './general';

export const handleContactDetail = id => async (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    contactDetail(id)
      .then(({data}) => {
        resolve(data);
        // dispatch(setContactDetail());
        console.log('contactDetail', data);
      })
      .catch(error => {
        reject(error);
        console.log(error);
      });
  });
