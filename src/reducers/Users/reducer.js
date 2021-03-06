const user = JSON.parse(localStorage.getItem("user"))
const token = JSON.parse(localStorage.getItem("token"))
const initialState= {
    user: user ? user : {},
    token: token ? token : undefined,

}

const userReducer= (state=initialState , {type,payload})=>{

    switch (type) {

        case "ADD_USERS":
            localStorage.setItem("user",JSON.stringify(payload))
            return{
                user:payload,
                token:state.token
            }
        case "ADD_TOKEN":
            localStorage.setItem("token",JSON.stringify(payload))
            return{
                user:state.user,
                token:payload
            }
        case "REMOVE_USERS":
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            return{
                user:{},
                token:undefined
            }
        default:
            return state;
    }
    
}


export default userReducer;