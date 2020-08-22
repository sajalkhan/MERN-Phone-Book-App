import { 
    ADD_NEW_CONTACT, 
    DELETE_CONTACT, 
    ERROR_MESSAGE,
    REMOVE_MESSAGE, 
    GET_ALL_CONTACT } from '../Action/type';

const initialState = [];

export const GetAllContact = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case GET_ALL_CONTACT:
            return payload;
        case ADD_NEW_CONTACT:
            return [...state, payload];
        case DELETE_CONTACT:
            return state.filter(contact => contact._id!==payload);
        default:
            return state;
    }
}

export const Display_Error = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case ERROR_MESSAGE:
            return payload;
        case REMOVE_MESSAGE:
            return payload;
        default:
            return state;
    }
}