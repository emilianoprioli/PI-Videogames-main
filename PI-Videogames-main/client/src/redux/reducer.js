import { GETALLGAMES,GETALLGENRES,FINDORCREATE,GETGAMEDETAIL,CLEANDETAIL,GETTEDBYNAME,API,DB,AZ,ZA,RATINGAS,RATINGDES } from "./actionTypes";

const initialState = {
    allGames : [],
    allGenres : [],
    createdGames:[],
    gettedByName:[],
    findedOrCreated:[],
    gameIDdetail:null,
    filters:{
        DB_FILTER:false,
        API_FILTER:false,
        AZC:false,
        ZAC:false,
        RATINGASC:false,
        RATINGDESC:false,
    }
}


const reducer = (state = initialState, action) => {
    switch(action.type){

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
                gettedByName:action.payload
            }

        case CLEANDETAIL:
            return{
                ...state,
                gameIDdetail:null
            }
        
        case API:    
            return{
                ...state,
                filters:{
                    ...state.filters,
                    API_FILTER: !state.filters.API_FILTER
                }
            }
            
        case DB:
            return{
                ...state,
                filters:{
                    ...state.filters,
                    DB_FILTER: !state.filters.DB_FILTER
                }
            }
        
        case AZ:
            return{
                ...state,
                filters:{
                    ...state.filters,
                    AZC: !state.filters.AZC
                }
            }
        
        case ZA:
            return{
                ...state,
                filters:{
                    ...state.filters,
                    ZAC: !state.filters.ZAC
                }
            }
        
        case RATINGAS:
            return{
                ...state,
                filters:{
                    ...state.filters,
                    RATINGASC: !state.filters.RATINGASC
                }
            }
        
        case RATINGDES:
            return{
                ...state,
                filters:{
                    ...state.filters,
                    RATINGDESC: !state.filters.RATINGDESC
                }
            }
        
        case GETALLGAMES:
            const {DB_FILTER,API_FILTER,RATINGASC,RATINGDESC,AZC,ZAC} = state.filters
            console.log(state.filters);
            console.log(DB_FILTER,API_FILTER,RATINGASC,RATINGDESC,AZC,ZAC);
            if(DB_FILTER || API_FILTER  || RATINGASC || RATINGDESC || AZC || ZAC){
                if (DB_FILTER) {
                    return {
                        ...state,
                        allGames: action.payload.map((array15) => {
                        return array15.filter((game) => game.restOfData);
                        })
                }
            }
                else if(API_FILTER){
                    return {
                        ...state,
                        allGames: state.allGames.map((array15) => {
                        return array15.filter((game) => !game.restOfData);
                        })
                }
                }else if (RATINGASC) {
                    return {
                      ...state,
                      allGames: state.allGames.map((array15) => {
                        return array15.map((game) => game).sort((gameA, gameB) => {
                            if (gameA.restOfData && gameB.restOfData) {
                                return gameA.restOfData.rating - gameB.restOfData.rating;
                            }
                            else{
                                return gameA.rating - gameB.rating;
                            }
                        });
                      })
                    };
                  }
                  else if (RATINGDESC) {
                    const arrayAux = [];
                    state.allGames.map((array15) => {
                    return array15.map((game) => arrayAux.push(game))
                      })
                    return {
                        ...state,
                        allGames: arrayAux.sort((gameA, gameB) => {
                            if (gameA.restOfData && gameB.restOfData) {
                                return gameB.restOfData.rating - gameA.restOfData.rating;
                            }
                            else{
                                return gameB.rating - gameA.rating;
                            }
                        })
                      };
                    }

                  else if(AZC){
                    return action.payload.map((game)=>{

                    })
                }else if(ZAC){
                    return action.payload.map((game)=>{
                        
                    })
                }
            }else return {
                ...state,
                allGames: action.payload
            }

            

        default:
            return{
                ...state
            }
    }
}

export default reducer;



