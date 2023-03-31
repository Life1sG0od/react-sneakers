
import Card from '../components/Card'
import { AppContext } from '../App';
import React from 'react';

function Favorites() {
  const {favorites, onAddToFavorite} = React.useContext(AppContext)
  return(
    <div className='content'>
        <div className='contentTop'>
          <h1 className='contentTitle'>Мои закладки</h1>

        </div>
        <div className='skeakersCard'>
        {favorites.map((item, index) => (
            <Card
              key={index}
              favorited={true}
              onFavorite={onAddToFavorite}
              {...item}
            />
          ))}
        </div>
      </div>
  )
}
export default Favorites