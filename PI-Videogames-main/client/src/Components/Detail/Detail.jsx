import { useEffect } from "react";
import { getGameDetail,CleanDetail } from "../../redux/actionTypes";
import {useDispatch} from "react-redux"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Detail = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {gameIDdetail} = useSelector(state=>state)
    console.log(gameIDdetail);
    
    useEffect(()=>{
        console.log("id detail",id);
        dispatch(getGameDetail(id))
        return () => {
            dispatch(CleanDetail())
        }
    },[])

    if (!gameIDdetail) {
      return <div>Loading...</div>;
    }

    const {name, genres, platforms,released, rating,dominant_color,description_raw,background_image } =  gameIDdetail

    return (
        <div key={id}>
          <h2>{name}</h2>
          <h3>{genres?.map((genre) => genre.name).join(", ")}</h3>
          {description_raw && <p>{description_raw}</p>}
          {background_image && <img src={background_image} alt={name} />}
          {released && <h3>Released: {released}</h3>}
          {rating && <h3>Rating: {rating}</h3>}
          {platforms && (
            <h3>Platforms: {platforms?.map((el) => el.platform.name).join(", ")}</h3>
          )}
          {id && <h3>ID: {id}</h3>}
        </div>
      );
}

export default Detail;






