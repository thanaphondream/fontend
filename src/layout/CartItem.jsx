import React from 'react';

const CartItem = ({ item, removeFromCart }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="item-details">
        <span className="name">{item.name}</span>
        <span className="price">{item.price} บาท</span>
      </div>
      <button className="remove-button" onClick={() => removeFromCart(item.id)}>ลบ</button>
    </div>
  );
};

export default CartItem