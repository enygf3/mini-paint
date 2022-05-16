import { SIGN_IN } from "../actions/actions";

const authReducer = (state = {}, action: any) => {
    switch (action.type) {
        case SIGN_IN:
            return {...state, user: action.payload};
        default:
            return state;
    }
}

export default  authReducer