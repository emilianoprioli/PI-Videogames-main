//! va a tener que traer el get /videogames
//! maquetar todos los juegos en cada card (HACER LA CARD)
//! HACER DETAIL DE CADA JUEGO
import {useDispatch,useSelector} from 'react-redux';
import { getAllGames,getByName } from "../../redux/actionTypes";
import Card from '../Card/Card';
import { useEffect, useState } from 'react';
import style from "./Home.module.css"
import scrollToTop from '../../function/ScrollToMain';
let inputValue,indice

const HomePage = () => {
    const dispatch  = useDispatch();
    const {allGames,gettedByName} = useSelector(state => state);
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        indice = 0
        dispatch(getAllGames(setLoading))
    },[])

    const pag = (event) => {
        scrollToTop()
        let id = event.target.id;
        if(indice > 0 && id === "previus" ){
            indice--
            dispatch(getAllGames(setLoading))
        }
        if(indice < allGames.length -1 && id === "next" ){
            indice++
            dispatch(getAllGames(setLoading))
        }
    }
    
    //! modificar para que busque por name

    const enterSearch = (event) =>{
        if(event.key === "Enter"){
            dispatch(getByName(inputValue));
        }
    }

    const inputHandler = (event) => {
        inputValue = event.target.value
    }

    return(
        <main className={style.main}>
            <section>
                <input onChange={inputHandler} onKeyDown={enterSearch} type="text" placeholder="Inserte el name"/>
                <button onClick={()=>dispatch(getByName(inputValue))}>Click here to search</button>
            </section>
            <section className={style.games}>
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


