export var api_base_url = "http://localhost:8000"


export var unknown_error_alert = "some unknown error occured"

export const mapState2Props = state => ({
    login_token:state.auth.token,
    is_logged:state.auth.logged,
})