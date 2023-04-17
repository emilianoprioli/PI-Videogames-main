import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllGenres } from '../../redux/actionTypes';
import style from "./Form.module.css";

const Form = () => {
    const dispatch = useDispatch();
    const set = new Set();
    const { allGenres } = useSelector(state => state);
    const [genresLoaded, setGenresLoaded] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);

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

    return (
        <form>
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

            <button>Enviar formulario</button>
        </form>
    );
}

export default Form;