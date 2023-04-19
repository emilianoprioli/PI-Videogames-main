import {Link} from "react-router-dom"

const LandingPage = () => {

    return(
        <div>
            <Link to="/home"><button>Go to home page</button></Link>
            <Link to="/form"><button>Create</button></Link>
           
            
        </div>
    )
}

export default LandingPage;