import {combineReducers} from 'redux';

import {ContactReducer} from './contact';
import {ContactDetailReducer} from './contact_detail';
const reducer = combineReducers({
  ContactReducer,
  ContactDetailReducer,
});

export default reducer;
