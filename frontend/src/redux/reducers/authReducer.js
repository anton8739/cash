

let inicializationState = {
        auth : {
            id: null,
            username: null,
            phone : null,
            name : null,
            surname : null,
            token : null
        },
        isAuthenticated: false,
}

let authReducer = (state = inicializationState, action) => {
    switch (action.type) {
        case 'AUTH_SET_AUTH':
            return {
                ...state, auth: {
                    ...state.auth,
                    token : action.auth.token,
                    id : action.auth.id
                },
                isAuthenticated: action.isAuthenticated
            };

        default :
            return state;
    }
}

export let setAuth = (auth) => {

    return {
        type: 'AUTH_SET_AUTH',
        auth : auth.auth,
        isAuthenticated: auth.isAuthenticated
    }
}

export default authReducer;