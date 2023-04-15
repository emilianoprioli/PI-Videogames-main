import axios from 'axios';

export const GETALLGAMES = "GETALLGAMES";

export const getAllGames =  (id) => {
        return function(dispatch){
            axios.get(`http://localhost:3001/videogames`)
            .then(res => res.data)
            .then(data => {
                dispatch({type:GETALLGAMES,payload:data})
            })
        }
}
