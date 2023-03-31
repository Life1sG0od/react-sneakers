import cardStyles from './Card.module.scss'
import ContentLoader from 'react-content-loader'
import React from 'react'
import { AppContext } from '../../App'
function Card ({
  id,
  title,
  imgUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  // added = false,
  loading = false
}) {
  const { isItemAdded } = React.useContext(AppContext)

  // const [isAdded, setIsAdded] = React.useState(added)
  const [isFavorite, setIsFavorite] = React.useState(favorited)
  const itemObj = { id, parentId: id, imgUrl, title, price }

  const onClickPlus = () => {
    onPlus(itemObj)
    // setIsAdded(!isAdded)
  }

  const onClickFavorite = () => {
    onFavorite(itemObj)
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={cardStyles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={147}
          height={187}
          viewBox='0 0 150 187'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='0' y='0' rx='10' ry='10' width='147' height='91' />
          <rect x='179' y='22' rx='10' ry='10' width='147' height='91' />
          <rect x='0' y='126' rx='3' ry='3' width='93' height='15' />
          <rect x='4' y='163' rx='8' ry='8' width='80' height='24' />
          <rect x='118' y='155' rx='8' ry='8' width='32' height='32' />
          <rect x='0' y='107' rx='3' ry='3' width='147' height='15' />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={cardStyles.cardFavorite} onClick={onFavorite}>
              <img
                src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'}
                alt='unliked'
                onClick={onClickFavorite}
              />
            </div>
          )}
          <img src={imgUrl} alt='' />
          <p>{title}</p>
          <div className={cardStyles.cardPrice}>
            <div>
              <p>Цена:</p>
              <span>{price} руб.</span>
            </div>
            {onPlus && (
              <img
                src={isItemAdded(id) ? '/img/cheked.svg' : '/img/plus.svg'}
                alt='plus'
                onClick={onClickPlus}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Card
