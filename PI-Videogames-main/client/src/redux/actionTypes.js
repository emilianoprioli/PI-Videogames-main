import axios from 'axios';

export const GETALLGAMES = "GETALLGAMES";
export const GETALLGENRES = "GETALLGENRES";
export const FINDORCREATE = "FINDORCREATE";
export const GETGAMEDETAIL = "GETGAMEDETAIL";
export const CLEANDETAIL = "CLEANDETAIL";
export const GETTEDBYNAME = "GETTEDBYNAME";
export const FILTERS = "FILTERS";
export const API = "API";
export const DB = "DB";
export const AZ = "AZ";
export const ZA = "ZA";
export const RATINGAS = "RATINGAS";
export const RATINGDES = "RATINGDES";

export const APIHandler = (event) => {
    return async function(dispatch){
        dispatch({type:API})
    }
}

export const DBHandler = (event) => {
    return async function(dispatch){
        dispatch({type:DB})
    }
}

export const AZHandler = (event) => {
    return async function(dispatch){
        dispatch({type:AZ})
    }
}

export const ZAHandler = (event) => {
    return async function(dispatch){
        dispatch({type:ZA})

    }
}

export const RATINGASHandler = (event) => {
    return async function(dispatch){
        dispatch({type:RATINGAS})

    }
}
export const RATINGDESHandler = (event) => {
    return async function(dispatch){
        dispatch({type:RATINGDES})

    }
}


export const getAllGames =  (evento) => {
        return async function(dispatch){
            evento(true)
            axios.get(`http://localhost:3001/videogames/home`)
            .then(res => res.data)
            .then(data => {
                dispatch({type:GETALLGAMES,payload:data})
                evento(false);
            })
        }
}

export const GetAllGenres = () => {
    return function(dispatch){
        axios.get(`http://localhost:3001/genres`)
        .then(res => res.data)
        .then(data => {
            dispatch({type:GETALLGENRES,payload:data})
        })
    }
}

//name description plataforms image released rating createdInDB

export const findOrCreate = ({name,description,genres,plataforms,img,released,rating,createdInDB}) => {
    try {
        return async function(dispatch){
            const post = await axios.post(`http://localhost:3001/videogames?name=${name}&description=${description}&genres=${genres}&plataforms=${plataforms}&image=${img}&released=${released}&rating=${rating}&createdInDB=${createdInDB}`)
            dispatch({type:FINDORCREATE,payload:post});
        }
    } catch (error) {
        console.log(error.message); 
    }
}

export const getGameDetail = (id) => {
    console.log(id);
    return function(dispatch){
        axios.get(`http://localhost:3001/videogames/detail/${id}`)
        .then(res => res.data)
        .then(data => {
            dispatch({type:GETGAMEDETAIL ,payload:data})
        })
    }   
}

export const getByName = (name,evento) => {
    console.log("action",typeof name);
    return async function(dispatch){
        evento(true)
      const response = await axios.get(`http://localhost:3001/videogames/name?name=${name}`)
        dispatch({type:GETTEDBYNAME ,payload:response.data})
        evento(false)
    }
}

export const CleanDetail = () => {
    return function(dispatch){
        dispatch({type:CLEANDETAIL})
    }   
}
