const memoryReducer = (state = false, action)=>{
    switch(action.type){
        case "memory/CREATE":
            return {
                creating:true
            }
        case "memory/UNCREATE":
            return {
                creating:false
            }
        default:
            return state;
    }
}
export default memoryReducer;
