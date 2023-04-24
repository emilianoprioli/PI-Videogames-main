import { useEffect } from "react";
import { getGameDetail,CleanDetail } from "../../redux/actionTypes";
import {useDispatch} from "react-redux"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Detail = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {gameIDdetail} = useSelector(state=>state)
    
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

    if (isNaN(id)) {
      const {image,name,plataforms,rating,released,description,id} = gameIDdetail[0].restOfData
      const genres = gameIDdetail[0].genres.join(", ")
      console.log(genres);
      return(
        <div key={id}>
          <h1>{name}</h1>
          {image && <img src={image} alt={name} />}
          <div>
          <h4>Géneros:</h4>
          <h5>{genres}</h5>
          <h4>Descripción</h4>
          <h5>{description}</h5>
          <h4>Released:</h4>
          {released && <h5>{released}</h5>}
          {rating && <h3>Rating: {rating}</h3>}
          {plataforms && <h3>Platforms: {plataforms?.join(", ")}</h3>}
          
          </div>
        </div>
      )
    }
    else{
      return (
        <div key={id}>
          <h2>{name}</h2>
          <h3>{genres?.name.join(", ")}</h3>
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
}

export default Detail;






