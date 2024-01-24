import React from "react";
import { useBasket } from "../context/BasketCount";

import cartIcon from "../assets/panier.png";

function BasketComponent() {
  const { basketItems, setBasketItems } = useBasket();
  const calculateTotal = () => {
    const total = basketItems.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
    const roundedTotal = (Math.round(total * 100) / 100).toFixed(2);
    return roundedTotal;
  };

  const updateBasket = (updatedItems) => {
    setBasketItems(updatedItems);
  };

  const handleIncrement = (itemId) => {
    const updatedItems = basketItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: (item.quantity || 0) + 1 }
        : item
    );
    updateBasket(updatedItems);
  };

  const handleDecrement = (itemId) => {
    const updatedItems = basketItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max((item.quantity || 0) - 1, 1) }
        : item
    );
    updateBasket(updatedItems);
  };

  return (
    <div className="h-screen pt-32">
      <h2 className="text-4xl text-center">Your Cart</h2>
      {basketItems.length !== 0 ? (
        <div className="text-xl text-center">
          <p>
            Total quantity :{" "}
            {basketItems.reduce(
              (total, item) => total + (item.quantity || 0),
              0
            )}
          </p>
          <p>Total price: {calculateTotal()} €</p>
        </div>
      ) : null}
      <div className="m-12 border-2 p-12 bg-white">
        {basketItems.length === 0 ? (
          <div className="flex flex-col items-center gap-6">
            <img width="52" height="52" src={cartIcon} alt="cart" />
            <p className="text-center">Your cart is empty</p>
          </div>
        ) : (
          <>
            {basketItems.map((item) => (
              <div key={item.id} className="flex flex-row ">
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-auto h-auto mb-8 mt-6"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-l mt-6"> {item.name}</p>
                  <p className="text-l"> {item.price} €</p>
                  <div className="flex flex-row mt-7 gap-2">
                    <button
                      type="button"
                      className="bg-black p-1 pl-2 pr-2 text-white"
                      onClick={() => handleDecrement(item.id)}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      type="button"
                      className="bg-black p-1 pl-2 pr-2 text-white"
                      onClick={() => handleIncrement(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default BasketComponent;
