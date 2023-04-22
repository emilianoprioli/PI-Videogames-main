import { GETALLGAMES,GETALLGENRES,FINDORCREATE,GETGAMEDETAIL,CLEANDETAIL,GETTEDBYNAME } from "./actionTypes";

const initialState = {
    allGames : [],
    allGenres : [],
    createdGames:[],
    gettedByName:[],
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

        case FINDORCREATE:
            return{
                ...state,
                findedOrCreated:action.payload
            }

        case GETGAMEDETAIL:
            return{
                ...state,
                gameIDdetail:action.payload
            }

        case GETTEDBYNAME:
            return{
                ...state,
                gettedByName:[action.payload]
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