import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllGenres,findOrCreate } from '../../redux/actionTypes';
import style from "./Form.module.css";
const set = new Set();

const Form = () => {
    const dispatch = useDispatch();
    const { allGenres,findedOrCreated } = useSelector(state => state);
    const [genresLoaded, setGenresLoaded] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [ratingValue, setRatingValue] = useState('');
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
        const name = event.target.querySelector('input[name="name"]').value;
        const img = event.target.querySelector('input[name="img"]').value;
        const description = event.target.querySelector('input[name="description"]').value;
        const plataforms = event.target.querySelector('input[name="plataforms"]').value;
        const released = event.target.querySelector('input[name="released"]').value;
        const rating = event.target.querySelector('input[name="rating"]').value;
    
        if (!name || !img || !description || !plataforms || !released || !rating) {
            // Si alguno de los campos está vacío, se muestra un mensaje de error
            alert('Todos los campos son obligatorios');
            return;
        }
    
        const formData = {
            name,
            img,
            description,
            plataforms,
            released,
            rating,
            genres: Array.from(set),
            createdInDB: true, // Convertir el set en un array
        };
        console.log(formData);
        dispatch(findOrCreate(formData)); // Enviar el objeto a través del dispatch
    };

    const rangeValue = (event) => {
        setRatingValue(event.target.value);
    }

    const validate = (event) => {
        const regex = /^[a-zA-Z0-9\s._-]+$/;
            const input = event.target.value;
            if (!regex.test(input)) {
                event.target.setCustomValidity("El nombre del juego solo puede contener letras, números y espacios");
            } else {
                event.target.setCustomValidity("");
            }
    }


    return (
        <div>
            <div hidden={!hidden}>
        <form className={style.formContainer} onSubmit={onSubmit}>
        <label htmlFor="name">Game name:</label>
        <input type="text" name="name" onInput={validate} />

            <label htmlFor="img">Game img:</label>
            <input type="url"  name="img" />

            <label htmlFor="description">Game description:</label>
            <input type="text"  name="description" />

            <label htmlFor="plataforms">Game plataforms:</label>
            <input type="text"  name="plataforms" />

            <label htmlFor="released">Game released:</label>
            <input type="date"  name="released" />

            <label htmlFor="rating">Game rating:</label>
            <input onInput={rangeValue} type="range" name="rating" min="0" max="5" step="0.1" />
            { ratingValue && <p>{ratingValue}</p>}

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

            <div id='div'>
                {findedOrCreated ? <p>Juego: {findedOrCreated?.data?.name}</p> : <p></p> }
                <p>Estado: {findedOrCreated?.statusText}</p>
            </div>
 


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

