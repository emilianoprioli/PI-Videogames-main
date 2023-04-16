import { GETALLGAMES,GETALLGENRES } from "./actionTypes";

const initialState = {
    allGames : [],
    allGenres : [],
}


const reducer = (state = initialState,action) => {
    switch(action.type){
        case GETALLGAMES:
            return{
                ...state,
                allGames:action.payload
            }

        case GETALLGENRES:
            return{
                ...state,
                allGenres:action.payload
            }

        default:
            return{
                ...state
            }
    }
}

export default reducer;