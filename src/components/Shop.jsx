import {useState, useEffect} from 'react';
import { API_URL} from '../config';
import {Loading} from './Loading';
import {GoodsList} from "./GoodsList";
import {Cart} from './Cart';
import {BasketList} from './BasketList';
import {Alert} from './Alert';
import {UseLocalStorage} from '../hooks/LocalStorage';

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = UseLocalStorage([], "order");
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    const addToBasket = (goodsItem) => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === goodsItem.id);
        if(itemIndex < 0) {
            const newGood = {
                ...goodsItem,
                quantity: 1,
            }
            setOrder([...order, newGood]);
        } else {
           const newOrder = order.map((orderItem, index) => {
               if(index === itemIndex) {
                   return  {
                       ...orderItem,
                       quantity: orderItem.quantity + 1
                   }
               } else {
                   return orderItem;
               }
           })
            setOrder(newOrder)
        }
        setAlertName(goodsItem.name);
    };

    const closeAlert = () => {
        setAlertName('');
    }

    const handleBasket = () => {
        setBasketShow(!isBasketShow);
    };

    const removeFromBasket = (itemId) => {
        setOrder(order.filter((item) => {
            return item.id !== itemId;
        }));
    };

    const incQuantity = (itemId) => {
        const newOrder = order.map((orderItem) => {
            if (orderItem.id === itemId) {
                return {
                    ...orderItem,
                    quantity: orderItem.quantity + 1
                }} else {
                return orderItem;
            }
        });
        setOrder(newOrder);
    };
    const decQuantity = (itemId) => {
        const newOrder = order.map((orderItem) => {
            if (orderItem.id === itemId) {
                return {
                    ...orderItem,
                    quantity: orderItem.quantity >= 2 ?  (orderItem.quantity - 1) : 1
                }} else {
                return orderItem;
            }
        });
        setOrder(newOrder);
    };


    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                'Authorization': '0bd6dbc3-c25a53f8-cfd1a5a7-0634e377',
            }
        })
            .then(response => response.json())
            .then(data => {
                data.featured && setGoods(data.featured);
                setLoading(false)
            })
    }, [])

    return <main className='container content'>

        <Cart quantity={order.length} handleBasket={handleBasket}/>
        {loading ? <Loading /> : <GoodsList goods={goods} addToBasket={addToBasket} />}
        {isBasketShow && <BasketList order={order}
                                     handleBasket={handleBasket}
                                     removeFromBasket={removeFromBasket}
                                     incQuantity={incQuantity}
                                     decQuantity={decQuantity}/>}
        { alertName && <Alert name={alertName} closeAlert={closeAlert}/>}

    </main>

}
export {Shop}
