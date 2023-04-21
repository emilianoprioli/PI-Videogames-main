//! va a tener que traer el get /videogames
//! maquetar todos los juegos en cada card (HACER LA CARD)
//! HACER DETAIL DE CADA JUEGO
import {useDispatch,useSelector} from 'react-redux';
import { getAllGames } from "../../redux/actionTypes";
import Card from '../Card/Card';
import { useEffect, useState } from 'react';
import style from "./Home.module.css"
import scrollToTop from '../../function/ScrollToMain';

let value = 0;

const HomePage = () => {
    const dispatch  = useDispatch();
    const {allGames} = useSelector(state => state);
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        dispatch(getAllGames(value,setLoading))
    },[])

    const pag = (event) => {
        scrollToTop()
        let id = event.target.id;
        if(value >0 && id === "previus" ){
            value--
            dispatch(getAllGames(value,setLoading))
            console.log(value);
        }
        if(value < 4 && id === "next" ){
            value++
            dispatch(getAllGames(value,setLoading))
            console.log(value);
        }
    }




    //! modificar para que busque por name

    const enterSearch = (event) =>{
        if(event.key === "Enter"){
            dispatch(getAllGames(value,setLoading));
        }
    }
    
    return(
        <main>
            <section>
                <input onKeyDown={enterSearch} type="text" placeholder="Inserte el id"/>
                <button onClick={()=>{getAllGames(value,setLoading)}}>Click here to search</button>
            </section>
            <section className={style.games}>
                {loading?<h3>Loading...</h3>:<Card allGames={allGames}/>}
            </section>
            <div>
                <button onClick={pag} id='previus'>←Previus</button>
                <div>{value == 0 ?"Inicio":value}</div>
                <button onClick={pag} id='next'>Next→</button>
            </div>
        </main>
    )
}

export default HomePage;


// export const getAllGames = (pag) => {
//     return function(dispatch){
//         // Agregar acción SET_LOADING
//         dispatch({type: SET_LOADING});

//         axios.get(`http://localhost:3001/videogames/pag?pag=${pag}`)
//         .then(res => res.data)
//         .then(data => {
//             // Ejecutar acción GET_ALL_GAMES para actualizar el estado de los juegos
//             dispatch({type: GET_ALL_GAMES, payload: data});
//             // Ejecutar acción SET_LOADING para ocultar el cartel de carga
//             dispatch({type: SET_LOADING});
//         })
//     }
// }