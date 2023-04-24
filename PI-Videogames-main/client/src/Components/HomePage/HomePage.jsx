//! va a tener que traer el get /videogames
//! maquetar todos los juegos en cada card (HACER LA CARD)
//! HACER DETAIL DE CADA JUEGO
import {useDispatch,useSelector} from 'react-redux';
import { getAllGames,getByName } from "../../redux/actionTypes";
import Card from '../Card/Card';
import { useEffect, useState } from 'react';
import style from "./Home.module.css"
import scrollToTop from '../../function/ScrollToMain';

let value = 0;
let inputValue

const HomePage = () => {
    const dispatch  = useDispatch();
    const {allGames,gettedByName} = useSelector(state => state);
    const [loading,setLoading] = useState(false)

    
    useEffect(()=>{
        value = 0;
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
            dispatch(getByName(inputValue));
        }
    }

    const inputHandler = (event) => {
        inputValue = event.target.value
        console.log(inputValue);
    }

    const Render = () => {
        if (gettedByName) {
            return(
                <Card gettedByName={gettedByName}/>
            )
        }
        else{
            return(
                <Card allGames={allGames}/>
            )
        }
     }
    
    return(
        <main className={style.main}>
            <section>
                <input onChange={inputHandler} onKeyDown={enterSearch} type="text" placeholder="Inserte el name"/>
                <button onClick={()=>dispatch(getByName(inputValue))}>Click here to search</button>
            </section>
            <section className={style.games}>
                {loading?<h3 className={style.loading}>Loading...</h3>:<Card allGames={allGames}/>}
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