import React from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Header from './components/header/Header'
import SideCard from './components/sideCard'

import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'

export const AppContext = React.createContext({})

// const arr = [
//   {
//     "id": "1",
//     "title": "Мужчские Кроссовки Nike Blazer Mid Suede",
//     "price": "12999",
//     "imgUrl": "/img/sneakers/1.jpg"
//   },
//   {
//     "id": "2",
//     "title": "Мужские Кроссовки Nike Air Max 270",
//     "price": "12299",
//     "imgUrl": "/img/sneakers/2.jpg"
//   },
//   {
//     "id": "3",
//     "title": "Мужские Кроссовки Nike Blazer Mid Suede",
//     "price": "8499",
//     "imgUrl": "/img/sneakers/3.jpg"
//   },
//   {
//     "id": "4",
//     "title": "Кроссовки Puma X Aka Boku Future Rider",
//     "price": "8999",
//     "imgUrl": "/img/sneakers/4.jpg"
//   },
//   {
//     "id": "5",
//     "title": "Мужские Кроссовки Under Armour Curry 8",
//     "price": "15199",
//     "imgUrl": "/img/sneakers/5.jpg"
//   },
//   {
//     "id": "6",
//     "title": "Мужские Кроссовки Nike Kyrie 7",
//     "price": "11299",
//     "imgUrl": "/img/sneakers/6.jpg"
//   },
//   {
//     "id": "7",
//     "title": "Мужские Кроссовки Jordan Air Jordan 11",
//     "price": "10799",
//     "imgUrl": "/img/sneakers/7.jpg"
//   },
//   {
//     "id": "8",
//     "title": "Мужские Кроссовки Nike LeBron XVIII",
//     "price": "16499",
//     "imgUrl": "/img/sneakers/8.jpg"
//   },
//   {
//     "id": "9",
//     "title": "Мужские Кроссовки Nike Lebron XVIII Low",
//     "price": "13999",
//     "imgUrl": "/img/sneakers/9.jpg"
//   },
//   {
//     "id": "10",
//     "title": "Мужские Кроссовки Nike Blazer Mid Suede",
//     "price": "8499",
//     "imgUrl": "/img/sneakers/1.jpg"
//   },
//   {
//     "id": "11",
//     "title": "Кроссовки Puma X Aka Boku Future Rider",
//     "price": "8499",
//     "imgUrl": "/img/sneakers/10.jpg"
//   },
//   {
//     "id": "12",
//     "title": "Мужские Кроссовки Nike Kyrie Flytrap IV",
//     "price": "3499",
//     "imgUrl": "/img/sneakers/11.jpg"
//   }
// ]

function App () {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorite] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Один из способов доставать данные с бэка
    //   fetch('https://641b32c89b82ded29d4cb9c5.mockapi.io/items').then((res) => {
    //   return res.json()
    // }).then((json) => {
    //   setItems(json);

    // })

    // Второй способос доставать данные с бэка при помощи AXIOS
    async function fetchData () {
      try {
        // Один из вариантов
        // const cartResponse = await axios.get(
        //   'https://641b32c89b82ded29d4cb9c5.mockapi.io/cart'
        // )
        // const favoritesResponse = await axios.get(
        //   'https://641d9611945125fff3d0da9f.mockapi.io/favorite'
        // )
        // const itemsResponse = await axios.get(
        //   'https://641b32c89b82ded29d4cb9c5.mockapi.io/items'
        // )
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get('https://641b32c89b82ded29d4cb9c5.mockapi.io/cart'),
            axios.get('https://641d9611945125fff3d0da9f.mockapi.io/favorite'),
            axios.get('https://641b32c89b82ded29d4cb9c5.mockapi.io/items')
          ])

        setIsLoading(false)
        setCartItems(cartResponse.data)
        setFavorite(favoritesResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        console.log('Ошибка при запросе данных')
      }
    }
    fetchData()
  }, [])
  const handleSidebarToggle = () => {
    setCartOpened(!cartOpened)
  }
  // Добавляем стили к body, если сайдбар открыт
  if (cartOpened) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
  const onAddToCart = async obj => {
    try {
      const findItem = cartItems.find(
        item => Number(item.parentId) === Number(obj.id)
      )
      if (findItem) {
        setCartItems(prev =>
          prev.filter(item => Number(item.parentId) !== Number(obj.id))
        )
        await axios.delete(
          `https://641b32c89b82ded29d4cb9c5.mockapi.io/cart/${findItem.id}`
        )
      } else {
        setCartItems(prev => [...prev, obj])
        const { data } = await axios.post(
          'https://641b32c89b82ded29d4cb9c5.mockapi.io/cart',
          obj
        )
        setCartItems(prev =>
          prev.map(item => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id
              }
            }
            return item
          })
        )
      }
    } catch (error) {
      console.log('Не получилось добавить в корзину ')
    }
  }
  const onRemoveToCart = id => {
    try {
      axios.delete(`https://641b32c89b82ded29d4cb9c5.mockapi.io/cart/${id}`)
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)))
    } catch (error) {
      console.log('Ошибка при удалении из корзины')
    }
  }
  const onAddToFavorite = async obj => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://641d9611945125fff3d0da9f.mockapi.io/favorite/${obj.id}`
        )
        setFavorite(prev =>
          prev.filter(item => Number(item.id) !== Number(obj.id))
        )
      } else {
        const { data } = await axios.post(
          'https://641d9611945125fff3d0da9f.mockapi.io/favorite',
          obj
        )
        setFavorite(prev => [...prev, data])
      }
    } catch (error) {
      console.log('Не удалось добавить в Избранное')
    }
  }
  const onChangeSearchInput = event => {
    setSearchValue(event.target.value)
  }
  const isItemAdded = id => {
    //Пробегает по массиву карзины, вытаскивает parentId  и сравнивает с ИД карточек
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems
      }}
    >
      <div className='wrapper'>
        <SideCard
          item={items}
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveToCart}
          opened={cartOpened}
        />
        <Header
          onClickCart={() => setCartOpened(true)}
          handleSidebarToggle={handleSidebarToggle}
        />
        <Routes>
          <Route
            path='/'
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                // onRemoveToCart={onRemoveToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App
