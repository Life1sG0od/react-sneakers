import Card from '../components/Card'
import React from 'react';
// import { AppContext } from '../App';
function Home({items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  // cartItems,
  isLoading
}
) {
  // const {isItemAdded} = React.useContext(AppContext)

  const renderItems = () => {
    const filteredItems = items.filter((item) => 
    item.title.toLowerCase().includes(searchValue.toLowerCase()))
    return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onPlus={(obj) => onAddToCart(obj)}
        onFavorite={(obj) => onAddToFavorite(obj)}
        loading={isLoading}
        {...item}
      />
    ))
  }
  return(
    <div className='content'>
        <div className='contentTop'>
          <h1 className='contentTitle'>{searchValue ? `Поис по запросу: ${searchValue}`: 'Все кросовки'}</h1>
          <div className='contentSearch'>
            <img src='/img/search.svg' alt='search' />
            <input onChange={onChangeSearchInput} value={searchValue} type='text' placeholder='Поиск....' />
            {searchValue && <img onClick={() => setSearchValue('')} className='clear' src='/img/delete.svg' alt='Закрыть'/>}
          </div>
        </div>
        <div className='skeakersCard'>
          {renderItems()}
        </div>
      </div>
  )
}
export default Home