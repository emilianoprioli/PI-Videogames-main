import style from "./Card.module.css"

const Card =  (props) => {
    const { allGames } = props;
     return (
        <>
        {allGames?.map((element) => {
            const { id, name, background_image } = element;
            return (

                <div key={id} className={style.container}>
                    <h3>{name}</h3>
                    <img className={style.Img} src={background_image} alt="Game img" />
                </div>
          );
        })}
      </>
    );
};

export default Card;