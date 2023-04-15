import { GETALLGAMES } from "./actionTypes";

const initialState = {
    allGames : [],
}


const reducer = (state = initialState,action) => {
    switch(action.type){
        case GETALLGAMES:
            return{
                ...state,
                allGames:action.payload
            }

        default:
            return{
                ...state
            }
    }
}

export default reducer;