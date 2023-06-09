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
            <input onChange={inputHandler} onKeyDown={enterSearch} type="text" placeholder="Inserte el name"/>
            <button onClick={enterSearch}>Click here to search</button>
            <button onClick={goToHome}>Go to Home</button>
        </section>
    )

}

export default SearchBar;