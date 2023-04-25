import { Filters } from "../../redux/actionTypes"
import { useDispatch,useSelector } from "react-redux"
import { useState } from "react"

const set = new Set();
const Filter = () => {
    const [selectedGenres, setSelectedGenres] = useState([]);

    function valueCatcher(event) {
        let value = event.target.value;
        let target = event.target.options[event.target.selectedIndex];
    
        console.log("value",value);
        console.log("target",target);
    if (target) { // Verificar si target es undefined
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
}

    return(
        <div>
           <select name="select" id="select" multiple size={4} value={selectedGenres} onChange={valueCatcher}>
                <option value="az">Sort AZ</option>
                <option value="za">Sort ZA</option>
                <option value="DB">Only DB</option>
                <option value="API">Only API</option>
            </select>
        </div>
    )
}

export default Filter

