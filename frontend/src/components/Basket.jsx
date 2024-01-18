import React from "react";
import { useBasket } from "../context/BasketCount";

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
    <div>
      <h2 className="text-4xl mt-40 text-center">Your Basket</h2>{" "}
      <div className="text-xl text-center">
        <p>
          Total quantity:{" "}
          {basketItems.reduce((total, item) => total + (item.quantity || 0), 0)}
        </p>
        <p>Total price: {calculateTotal()} €</p>
      </div>
      <div className="m-12 border-2 p-4">
        {basketItems.length === 0 ? (
          <div className="flex flex-col">
            <img
              width="52"
              height="52"
              src="https://img.icons8.com/color/48/lipstick.png"
              alt="lipstick"
              className="m-12 ml-24"
            />
            <p className="text-center">Your basket is empty at the moment</p>
          </div>
        ) : (
          <>
            {basketItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-row justify-between gap-4"
              >
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 mb-8 mt-6"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-l mt-6"> {item.name}</p>
                  <p className="text-l"> {item.price} €</p>
                  <div className="flex flex-row gap-2">
                    <button
                      type="button"
                      className="bg-black p-1 pl-2 pr-2 text-white"
                      onClick={() => handleIncrement(item.id)}
                    >
                      +
                    </button>
                    {item.quantity}
                    <button
                      type="button"
                      className="bg-black p-1 pl-2 pr-2 text-white"
                      onClick={() => handleDecrement(item.id)}
                    >
                      -
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
