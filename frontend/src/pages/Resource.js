import * as BsIcons from "react-icons/bs"
import * as ImIcons from "react-icons/im"
import * as BiIcons from "react-icons/bi"
export var api_base_url = "http://localhost:8000"
//export var api_base_url = "https://manami-bday.herokuapp.com"
export var unknown_error_alert = "some unknown error occured"

export const mapState2Props = state => ({
    login_token:state.auth.token,
    is_logged:state.auth.logged,
    creating:state.memory.creating
})


export const sideNavData = [
    {
        title:"Memories",
        link:"/",
        icon:<BsIcons.BsClock/>,
    },
    {
        title:"Todo",
        link:"/todo",
        icon:<ImIcons.ImList/>,
    },
    {
        title:"Letter",
        link:"/letter",
        icon:<BiIcons.BiHeart/>,
    },

]