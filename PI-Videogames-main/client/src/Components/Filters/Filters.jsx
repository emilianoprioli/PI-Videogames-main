import { useDispatch,useSelector } from "react-redux"
import { useState,useEffect } from "react"
import style from "./Filters.module.css"
import { GetAllGenres,DBHandler,APIHandler,AZHandler,ZAHandler,RATINGASHandler,RATINGDESHandler } from "../../redux/actionTypes"

const setGenres = new Set();
const setFilters = new Set();

const Filter = () => {
    const dispatch = useDispatch();
    const {allGenres,filters} = useSelector(state=>state)
    const [genresLoaded, setGenresLoaded] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);

    useEffect(() => {
        dispatch(GetAllGenres());
        setGenresLoaded(true);
    }, [dispatch]);

    useEffect(()=>{
    },[setFilters])

    function valueCatcherFilters(event) {
    let target = event.target.options[event.target.selectedIndex];
    if (target) {
        if (target.getAttribute("data-selected") === "true") {
            setFilters.delete(event.target.value)
            switch (event.target.value) {
                case "za":
                    dispatch(ZAHandler())
                break;
                case "az":
                    dispatch(AZHandler())
                break;
                case "API":
                    dispatch(APIHandler())
                break;
                case "DB":
                    dispatch(DBHandler())
                break;
                case "RATINGAS":
                    dispatch(RATINGASHandler())
                break;
                case "RATINGDES":
                dispatch(RATINGDESHandler())
                break
                default:
                    break;
            }
        target.style.backgroundColor = "";
        target.setAttribute("data-selected", "false");
        console.log(event.target.value);
        } else {
            setFilters.add(event.target.value)
            switch (event.target.value) {
                case "za":
                    dispatch(ZAHandler())
                break;
                case "az":
                    dispatch(AZHandler())
                break;
                case "API":
                    dispatch(APIHandler())
                break;
                case "DB":
                    dispatch(DBHandler())
                break;
                case "RATINGAS":
                    dispatch(RATINGASHandler())
                break;
                case "RATINGDES":
                dispatch(RATINGDESHandler())
                break
                default:
                    break;
            }
        target.style.backgroundColor = "green";
        target.setAttribute("data-selected", "true");
        console.log(event.target.value);
        }
    }
}

function valueCatcher(event) {
    let target = event.target.options[event.target.selectedIndex];
  
    if (target.getAttribute("data-selected") === "true") {
        setGenres.delete(event.target.value)
      console.log(setGenres);
      target.style.backgroundColor = "";
      target.setAttribute("data-selected", "false");
    } else {
        setGenres.add(event.target.value)
      console.log(setGenres);
      target.style.backgroundColor = "green";
      target.setAttribute("data-selected", "true");
    }
  }

    function MySelect(allgenres) {
        return (
            <select multiple size={5} onChange={valueCatcher}  value={selectedFilters}>
                {allgenres.map((option) => (
                    <option key={option} id={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    }

    return(
        <div>
           <select name="select" id="select" multiple size={6} value={selectedGenres} onChange={valueCatcherFilters}>
                <option value="az">Sort AZ</option>
                <option value="za">Sort ZA</option>
                <option value="DB">Only DB</option>
                <option value="API">Only API</option>
                <option value="RATINGAS">RATINGAS</option>
                <option value="RATINGDES">RATINGDES</option>
            </select>
            {/* {genresLoaded && (
                <div className={style.divGenres}>
                    <label htmlFor="genres">Game genres:</label>
                    {MySelect(allGenres)}
                </div> */}
            {/* )} */}
        </div>
    )
}

export default Filter

