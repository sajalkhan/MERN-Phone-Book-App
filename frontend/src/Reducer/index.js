import { combineReducers } from 'redux';

import { GetAllContact, Display_Error} from './ContactReducer';

export default combineReducers({
    GetAllContact,
    Display_Error
});