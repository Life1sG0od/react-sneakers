
import Card from '../components/Card'
import axios from 'axios'

import React from 'react';


function Orders() {
  const [orders, setOrders] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    //Самовызывающаяся функция 
    (async () => {
      try {
        const {data} = await axios.get('https://641d9611945125fff3d0da9f.mockapi.io/orders')
        // console.log(data.map((obj) => obj.items).flat());
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false)
      } catch (error) {
        console.log('Не удалось отобразить в избранных');
      }
    })()
  }, [orders])


  return(
    <div className='content'>
        <div className='contentTop'>
          <h1 className='contentTitle'>Мои заказы</h1>

        </div>
        <div className='skeakersCard'>
        {(isLoading ? [...Array(10)] : orders).map((item, index) => (
            <Card
            key={index}
            loading={isLoading}
            {...item}
            />
          ))}
        </div>
      </div>
  )
}
export default Orders