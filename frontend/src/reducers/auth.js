
var initialState = {
    token: "",
    logged:false
}

const authReducer = (state = initialState, action)=>{
    switch(action.type){
        case "auth/LOGIN":
            return {
                logged:action.payload.logged,
                token:action.payload.token
            }
        case "auth/LOGOUT":
            return {
                logged:false,
                token:""
            }
        default:
            return state;
    }
}

export default authReducer;