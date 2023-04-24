import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllGenres,findOrCreate } from '../../redux/actionTypes';
import style from "./Form.module.css";

const Form = () => {
    const dispatch = useDispatch();
    const set = new Set();
    const { allGenres } = useSelector(state => state);
    const [genresLoaded, setGenresLoaded] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [hidden,SetHidden] = useState(true)

    useEffect(() => {
        dispatch(GetAllGenres());
        setGenresLoaded(true);
    }, [dispatch]);

    function valueCatcher(event) {
      let value = event.target.value;
      let target = event.target.options[value];
    
      if (target.getAttribute("data-selected") === "true") {
        set.delete(event.target.value)
        console.log(set);
        target.style.backgroundColor = "";
        target.setAttribute("data-selected", "false");
      } else {
        set.add(event.target.value)
        console.log(set);
        target.style.backgroundColor = "green";
        target.setAttribute("data-selected", "true");
      }
    }

    function MySelect(allgenres) {
        return (
            <select multiple size={5} onChange={valueCatcher}  value={selectedGenres}>
                {allgenres.map((option) => (
                    <option key={option} id={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    }

    const onSubmit = (event) => {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente
        const formData = {
            name: event.target.querySelector('input[name="name"]').value,
            img: event.target.querySelector('input[name="img"]').value,
            description: event.target.querySelector('input[name="description"]').value,
            plataforms: event.target.querySelector('input[name="plataforms"]').value,
            released: event.target.querySelector('input[name="released"]').value,
            rating: event.target.querySelector('input[name="rating"]').value,
            genres: Array.from(set),
            createdInDB:true // Convertir el set en un array
        };
        console.log(formData);
        dispatch(findOrCreate(formData)); // Enviar el objeto a través del dispatch
    };

    return (
        <div>
            <div hidden={!hidden}>
        <form onSubmit={onSubmit}>
            <label htmlFor="name">Game name:</label>
            <input type="text"  name="name" />

            <label htmlFor="img">Game img:</label>
            <input type="url"  name="img" />

            <label htmlFor="description">Game description:</label>
            <input type="text"  name="description" />

            <label htmlFor="plataforms">Game plataforms:</label>
            <input type="text"  name="plataforms" />

            <label htmlFor="released">Game released:</label>
            <input type="date"  name="released" />

            <label htmlFor="rating">Game rating:</label>
            <input type="range"  name="rating" />

            {genresLoaded && (
                <div className={style.divGenres}>
                    <label htmlFor="genres">Game genres:</label>
                    {MySelect(allGenres)}
                </div>
            )}

            <button type='submit'>Crear Juego</button>
        </form>
        </div>


            <button onClick={(event)=>{
                console.log(event);
               if (hidden) {
                SetHidden(false);
                event.target.textContent = "Crear Juego"
                console.log("tocaste borrar");
               }
               else{
                SetHidden(true);
                event.target.textContent = "Eliminar Juego"
               }
            }}>Eliminar Juego</button>
 


        <div hidden={hidden}>
                <form onSubmit={onSubmit}>
                <label htmlFor="name">Game name:</label>
                <input type="text"  name="name" />
                </form>
            </div>
        </div>
    );
}

export default Form;

