import Info from '../Info/Info'
import React from 'react'
import axios from 'axios'
import { useCart } from '../../hooks/useCart'
import styles from './SideCard.module.scss'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function SideCard ({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart()
  const [orderId, setOrderId] = React.useState(null)
  const [isOrderComplete, setIsOrderComplete] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post(
        'https://641d9611945125fff3d0da9f.mockapi.io/orders',
        { items: cartItems }
      )
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i]
        await axios.delete(
          'https://641b32c89b82ded29d4cb9c5.mockapi.io/cart/' + item.id
        )
        await delay(1000)
      }
    } catch (error) {
      alert('Не удалось создать заказ')
    }
    setIsLoading(false)
  }
  return (
    <div
      className={`${styles.rightSide} ${opened ? styles.rightSideVisible : ''}`}
    >
      <div
        className={`${styles.rightSideBlock} ${
          opened ? styles.rightSideBlockVisible : ''
        }`}
      >
        <div className={styles.rightSideTop}>
          <div className={styles.rightSideTitle}>Корзина</div>
          <img src='/img/delete.svg' alt='Закрыть' onClick={onClose} />
        </div>
        {items.length > 0 ? (
          <div className={styles.rightSideItems}>
            {items.map(obj => (
              <div className={styles.SideCard} key={obj.id}>
                <img
                  src={obj.imgUrl}
                  alt='sneakers'
                  className={styles.SideSneakers}
                />
                <div>
                  <p>{obj.title}</p>
                  <b>{obj.price} руб.</b>
                </div>
                <img
                  src='/img/delete.svg'
                  alt='delete'
                  className={styles.SideDelete}
                  onClick={() => onRemove(obj.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={isOrderComplete ? '../img/list.png' : '../img/basket.png'}
          />
        )}
        {items.length > 0 ? (
          <div className={styles.rightSideBottom}>
            <div>
              <p>Итого:</p>
              <span></span>
              <b>{totalPrice} руб. </b>
            </div>
            <div>
              <p>Налог 5%: </p>
              <span></span>
              <b>{((totalPrice / 100) * 5).toFixed(0)} руб. </b>
            </div>

            <button
              disabled={isLoading}
              onClick={onClickOrder}
              className={styles.rightSideButton}
            >
              Оформить заказ
              <img src='/img/arrow.svg' alt='arrow' />
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default SideCard
