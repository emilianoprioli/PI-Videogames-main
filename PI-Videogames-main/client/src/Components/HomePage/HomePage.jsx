//! va a tener que traer el get /videogames
//! maquetar todos los juegos en cada card (HACER LA CARD)
//! HACER DETAIL DE CADA JUEGO
import {useDispatch,useSelector} from 'react-redux';
import { getAllGames } from "../../redux/actionTypes";
import Card from '../Card/Card';

const HomePage = () => {
    let value
    const dispatch  = useDispatch();
    const {allGames} = useSelector(state => state);
    const HandlerChange = (event) => {
        value = event.target.value;
    }

    const enterSearch = (event) =>{
        if(event.key === "Enter"){
            dispatch(getAllGames(value));
        }
    }
    
    return(
        <main>
            <section>
                <input onChange={HandlerChange} onKeyDown={enterSearch} type="text" placeholder="Inserte el id"/>
                <button onClick={()=>{getAllGames(value)}}>Click here to search</button>
            </section>
            <section>
                <Card allGames={allGames}/>
            </section>
        </main>
    )
}

export default HomePage;