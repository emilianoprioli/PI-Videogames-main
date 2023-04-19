import { GETALLGAMES,GETALLGENRES,FINDORCREATE } from "./actionTypes";

const initialState = {
    allGames : [],
    allGenres : [],
    createdGames:[],
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

            //! darle utilidad a esto
        case FINDORCREATE:


        default:
            return{
                ...state
            }
    }
}

export default reducer;