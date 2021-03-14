import {BasketItem} from './BasketItem'

function BasketList (props){
    const {
        order = [],
        handleBasket = Function.prototype,
        removeFromBasket = Function.prototype,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype
    } = props;

    const totalPrice = order.reduce((sum, curEl) => {
        return sum + curEl.price * curEl.quantity
    }, 0);

    return <ul className="collection basket-list">
        <li className="collection-item active">Корзина</li>
        {
            order.length ? order.map(item => (
                <BasketItem key={item.id} {...item}
                            removeFromBasket={removeFromBasket}
                            incQuantity={incQuantity}
                            decQuantity={decQuantity}/>
            )) : <li className="collection-item ">Корзина пустая</li>
        }
        <li className="collection-item active">
            Общая стоимость: {totalPrice} грн.
            <button className="secondary-content btn btn-small">Оформить</button>
        </li>
        <i className="material-icons basket-close" onClick={handleBasket}>close</i>
    </ul>
}
export {BasketList}
