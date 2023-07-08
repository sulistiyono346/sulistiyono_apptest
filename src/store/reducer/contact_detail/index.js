import {SET_CONTACT_DETAIL} from '../../action/contact_detail';

const initialState = {
  contactDetail: {},
};

export const ContactDetailReducer = (state = initialState, {payload, type}) => {
  switch (type) {
    case SET_CONTACT_DETAIL:
      return {
        ...state,
        contactDetail: payload,
      };
    default:
      return state;
  }
};
