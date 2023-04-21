import { GETALLGAMES,GETALLGENRES,FINDORCREATE,GETGAMEDETAIL,CLEANDETAIL } from "./actionTypes";

const initialState = {
    allGames : [],
    allGenres : [],
    createdGames:[],
    gameIDdetail:null
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
            break

        case GETGAMEDETAIL:
            return{
                ...state,
                gameIDdetail:action.payload
            }

        case CLEANDETAIL:
            return{
                ...state,
                gameIDdetail:null
            }


        default:
            return{
                ...state
            }
    }
}

export default reducer;