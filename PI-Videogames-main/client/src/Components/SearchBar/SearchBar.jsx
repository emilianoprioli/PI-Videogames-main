import { useNavigate } from "react-router-dom";


const SearchBar = (props) => {
    let inputValue
    const navigate = useNavigate()


    const goToHome = () => {
        navigate(`/home`)
    }

    const enterSearch = (event) =>{
        if(event.key === "Enter"){
            navigate(`/name?name=${inputValue}`)
        }
    }

    const inputHandler = (event) => {
        inputValue = event.target.value
    }

    return(
        <section>
            <select multiple  size={2} name="filtros" id="filtros">
                <option value="db">db</option>
                <option value="api">api</option>
            </select>
            <input onChange={inputHandler} onKeyDown={enterSearch} type="text" placeholder="Inserte el name"/>
            <button onClick={enterSearch}>Click here to search</button>
            <button onClick={goToHome}>Go to Home</button>
        </section>
    )

}

export default SearchBar;