//! va a tener que traer el get /videogames
//! maquetar todos los juegos en cada card (HACER LA CARD)
//! HACER DETAIL DE CADA JUEGO
import {useDispatch,useSelector} from 'react-redux';
import { getAllGames } from "../../redux/actionTypes";
import Card from '../Card/Card';
import { useEffect, useState } from 'react';
import style from "./Home.module.css"
import scrollToTop from '../../function/ScrollToMain';
import { useNavigate } from "react-router-dom";
import Filters from '../Filters/Filters';


let inputValue,indice
const setHome = new Set()


const HomePage = () => {
    const dispatch  = useDispatch();
    const navigate = useNavigate()
    const {allGames,filters} = useSelector(state => state);
    const [loading,setLoading] = useState(false)

    console.log(allGames);
    useEffect(()=>{
        indice = 0
        dispatch(getAllGames(setLoading,setHome))
        console.log(filters);
    },[filters])

    const pag = (event) => {
        scrollToTop()
        let id = event.target.id;
        if(indice > 0 && id === "previus" ){
            indice--
            dispatch(getAllGames(setLoading,setHome))
        }
        if(indice < allGames.length -1 && id === "next" ){
            indice++
            dispatch(getAllGames(setLoading,setHome))
        }
    }
    
    //! modificar para que busque por name

    const enterSearch = (event) =>{
        if(event.key === "Enter"){
            navigate(`/name?name=${inputValue}`)
        }
    }

    const inputHandler = (event) => {
        inputValue = event.target.value
    }

    return(
        <main className={style.main}>
            <section>
                <input onChange={inputHandler} onKeyDown={enterSearch} type="text" placeholder="Inserte el name"/>
                <button onClick={enterSearch}>Click here to search</button>
            </section>
            <section className={style.games}>
                <Filters></Filters>
                {loading?<h3 className={style.loading}>Loading...</h3>:<Card allGames={allGames[indice]}/>}
            </section>
            <div>
                <button onClick={pag} id='previus'>←Previus</button>
                <div>{indice == 0 ?"Inicio":indice}</div>
                <button onClick={pag} id='next'>Next→</button>
            </div>
        </main>
    )
}

export default HomePage;


