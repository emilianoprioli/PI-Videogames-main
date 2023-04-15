import style from "./Card.module.css"

const Card =  (props) => {
    const { allGames } = props;
     return (
        <>
        {allGames?.map((element) => {
            const { id, name, background_image } = element;
            return (

                <div className={style.container}>

                    <div className={style.divInfo} key={id}>
                        <h3>{name}</h3>
                    </div>


                    <div className={style.divImg}>
                        <img className={style.Img} src={background_image} alt="Game img" />
                    </div>

                </div>
          );
        })}
      </>
    );
};

export default Card;