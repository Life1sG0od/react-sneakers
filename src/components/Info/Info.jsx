import React from 'react'
import { AppContext } from './../../App';
import styles from '../sideCard/SideCard.module.scss'

const Info = ({title, image, description}) => {
  const { setCartOpened } = React.useContext(AppContext)
  return (
    <div className={styles.rightSideItems}>
      <div className={styles.emptyBasket}>
        <img src={image} alt="" />
        <h4>{title}</h4>
        <p>{description}</p>
        <button onClick={() => setCartOpened(false)}> 
        <img src="../img/arrow-2.svg" alt="arrow" />
        Вернуться назад</button>
      </div>
    </div>
  )
}

export default Info
