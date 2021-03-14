function BasketItem(props) {
    const {
        id,
        name,
        price,
        quantity,
        removeFromBasket = Function.prototype,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype
    } = props;
    return <li className="collection-item ">
                {name} <i className="material-icons basket-quantity" onClick={() => {decQuantity(id)}}>remove</i>
                <span>x{quantity}{' '}</span>
                <i className="material-icons basket-quantity" onClick={() => {incQuantity(id)}}>add</i>
                <span>= {price * quantity} грн </span>
                <span className="secondary-content">
                    <i className="material-icons basket-delete" onClick={() => removeFromBasket(id)}>delete</i>
                </span>
            </li>

}
export {BasketItem}


