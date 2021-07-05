export const loginAction = (logged=false, token="")=>dispatch=>{
    dispatch({
        type:"auth/LOGIN",
        payload:{token:token,logged:logged}
    })
}

export const logoutAction = () => dispatch=>{
    dispatch({
        type:"auth/LOGOUT"
    })
}

export const showCreatingFormAction = () => dispatch => {
    dispatch({
        type:"memory/CREATE"
    })
}

export const hideCreatingFormAction = () => dispatch => {
    dispatch({
        type:"memory/UNCREATE"
    })
}