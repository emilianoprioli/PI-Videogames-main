import axios from 'axios';

export const GETALLGAMES = "GETALLGAMES";
export const GETALLGENRES = "GETALLGENRES";
export const FINDORCREATE = "FINDORCREATE"

export const getAllGames =  (pag,evento) => {
        return async function(dispatch){
            evento(true)
            axios.get(`http://localhost:3001/videogames/pag?pag=${pag}`)
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
    return async function(dispatch){
        const post = await axios.post(`http://localhost:3001/videogames?name=${name}&description=${description}&genres=${genres}&plataforms=${plataforms}&image=${img}&released=${released}&rating=${rating}&createdInDB=${createdInDB}`)
        console.log(post);
        dispatch({type:FINDORCREATE});
    }
}
