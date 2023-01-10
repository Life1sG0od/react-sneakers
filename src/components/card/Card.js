


function Card() {
  return (
    <div className="card">
            <div className="cardFavorite">
            <img src="/img/unliked.svg" alt="unliked"/>
            </div>
            <img src="/img/sneakers/1.jpg" alt="" />
            <p>Мужские Кроссовки Nike Blazer Mid Suede</p>
            <div className="cardPrice">
              <div>
                <p>Цена:</p>
                <span>12 999 руб.</span>
              </div>
                <img src="./img/plus.svg" alt="plus" />
            </div>
    </div>
  );
}



export default Card;