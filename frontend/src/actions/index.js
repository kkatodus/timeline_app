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