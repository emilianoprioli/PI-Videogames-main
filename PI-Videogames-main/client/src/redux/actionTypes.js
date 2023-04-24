import axios from 'axios';

export const GETALLGAMES = "GETALLGAMES";
export const GETALLGENRES = "GETALLGENRES";
export const FINDORCREATE = "FINDORCREATE";
export const GETGAMEDETAIL = "GETGAMEDETAIL";
export const CLEANDETAIL = "CLEANDETAIL";
export const GETTEDBYNAME = "GETTEDBYNAME";

export const getAllGames =  (evento) => {
        return async function(dispatch){
            evento(true)
            axios.get(`http://localhost:3001/videogames/home?`)
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

export const getByName = (name) => {
    console.log("action",typeof name);
    return async function(dispatch){
      const response = await axios.get(`http://localhost:3001/videogames/name?name=counter`)
      console.log(response.data);
        dispatch({type:GETTEDBYNAME ,payload:response.data})
    }
}

export const CleanDetail = () => {
    return function(dispatch){
        dispatch({type:CLEANDETAIL})
    }   
}
