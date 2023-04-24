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
export const setHome = new Set()
const HomePage = () => {
    const dispatch  = useDispatch();
    const {allGames,gettedByName} = useSelector(state => state);
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        indice = 0
        dispatch(getAllGames(setLoading,setHome))
    },[setHome])


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
            dispatch(getByName(inputValue));
        }
    }

    const inputHandler = (event) => {
        inputValue = event.target.value
    }

    function valueCatcher(event) {
        let value = event.target.value;
        let target = event.target.options[value];
      
        if (target.getAttribute("data-selected") === "true") {
            setHome.delete(event.target.value)
          console.log(setHome);
          target.style.backgroundColor = "";
          target.setAttribute("data-selected", "false");
        } else {
            setHome.add(event.target.value)
          console.log(setHome);
          target.style.backgroundColor = "green";
          target.setAttribute("data-selected", "true");
        }
      }

    return(
        <main className={style.main}>
            <section>
                <input onChange={inputHandler} onKeyDown={enterSearch} type="text" placeholder="Inserte el name"/>
                <button onClick={()=>dispatch(getByName(inputValue))}>Click here to search</button>
                <select multiple onChange={valueCatcher} size={2} name="filtros" id="filtros">
                    <option value="db">db</option>
                    <option value="api">api</option>

                </select>
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


