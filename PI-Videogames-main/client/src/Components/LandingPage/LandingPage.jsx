import {Link} from "react-router-dom"
import style from "./LandingPage.module.css"

const LandingPage = () => {

    return(
        <div className={style.container}>
            <div className={style.h1Container}>
            <h1 className={style.h1}>Henry Videogames</h1>
            </div>
            <div className={style.divButtons}>
            <Link  to="/home"><button className={style.button}>Go to home page</button></Link>
            <Link  to="/form"><button className={style.button}>Create</button></Link>
            </div>
        </div>
    )
}

export default LandingPage;