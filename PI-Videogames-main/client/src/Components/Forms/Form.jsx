import {useDispatch,useSelector} from 'react-redux';
import { GetAllGenres } from '../../redux/actionTypes';

const Form = () => {
    const dispatch  = useDispatch();
    const {allGenres} = useSelector(state => state);

    const onClick = () => {
        console.log("se despacho");
        dispatch(GetAllGenres());
    }

    console.log(allGenres);

    function MySelect(allgenres) {
        return (
          <select>
            {allgenres.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      }


    return(
        <div>

            <label htmlFor="name">Game name:</label>
            <input type="text"  name="name" />

            <label htmlFor="img"></label>
            <input type="url"  name="img" />
            
            <label htmlFor="description"></label>
            <input type="text"  name="description" />
            
            <label htmlFor="plataforms"></label>
            <input type="text"  name="plataforms" />

            <label htmlFor="released"></label>
            <input type="date"  name="released" />

            <label htmlFor="rating"></label>
            <input type="range"  name="rating" />

            {MySelect(allGenres)}

            <button onClick={onClick}>Enviar formulario</button>

        </div>
        
    )
}

export default Form;