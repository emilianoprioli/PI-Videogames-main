import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { getByName } from "../../redux/actionTypes";
import Card from '../Card/Card';
import style from "./SearchByName.module.css"
import scrollToTop from "../../function/ScrollToMain";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";

let indice = 0
const SearchByName = () => {
    const dispatch = useDispatch()
    const {search} = useLocation()
    let forSearch = search.split("=")[1]

    const [loading,setLoading] = useState(false)
    const {gettedByName} = useSelector(state => state);

    useEffect(()=>{
        indice = 0;
        dispatch(getByName(forSearch,setLoading));
    },[search])

    const pag = (event) => {
        scrollToTop()
        let id = event.target.id;
        if(indice > 0 && id === "previus" ){
            indice--
             dispatch(getByName(forSearch,setLoading));
        }
        if(indice < gettedByName.length -1 && id === "next" ){
            indice++
            dispatch(getByName(forSearch,setLoading));
    }
    }

    return(
        <main className={style.main}>
            <SearchBar></SearchBar>
            <section className={style.games}>
            <Filters></Filters>
                {loading?<h3 className={style.loading}>Loading...</h3>:<Card gettedByName={gettedByName[indice]}/>}
            </section>
            <div>
                <div>
                <button onClick={pag} id='previus'>←Previus</button>
                <div>{indice == 0 ?"Inicio":indice}</div>
                <button onClick={pag} id='next'>Next→</button>
                </div>
            </div>
        </main>
    )
}

export default SearchByName