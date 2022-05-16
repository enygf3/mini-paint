import {SIGN_IN, SIGN_IN_FAILED} from "../actions/actions";

const initialState = {
    isLoggedIn: false,
    user: null
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SIGN_IN:
            console.trace()
            return {...state, user: action.payload, isLoggedIn: true};
        case SIGN_IN_FAILED:
            console.log("failed to login");
            return 0;
        default:
            return state;
    }
}

export default  authReducer