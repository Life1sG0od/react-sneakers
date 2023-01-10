function SideCard() {
  return(
    <div className="rightSide">
    <div className="rightSideBlock">
      <div className="rightSideTitle">
        Корзина
      </div>
      <div className="rightSideItems">
        <div className="SideCard">
          <img src="/img/sneakers/1.jpg" alt="sneakers" className="SideSneakers" />
          <div>
            <p>Мужские Кроссовки Nike Air Max 270</p>
            <b>12 999 руб.</b>
          </div>
          <img src="/img/delete.svg" alt="delete" className="SideDelete" />
        </div>
      </div>
      <div className="rightSideBottom">

        <div>
            <p>Итого:</p>
            <span></span>
            <b>21 498 руб. </b>
          </div>
          <div>
            <p>Налог 5%: </p>
            <span></span>
            <b>1074 руб. </b>
          </div>
          
        <button className="rightSideButton">
          Оформить заказ
          <img src="/img/arrow.svg" alt="arrow" />
        </button>
      </div>
    </div>
  </div>
  );
}

export default SideCard;