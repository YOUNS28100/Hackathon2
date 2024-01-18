// BasketContextProvider.js
import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const BasketContext = createContext();

export default function BasketContextProvider({ children }) {
  const [basketItems, setBasketItems] = useState([]);

  const addToBasket = (item) => {
    const existingItem = basketItems.find(
      (basketItem) => basketItem.id === item.id
    );

    if (existingItem) {
      const updatedItems = basketItems.map((basketItem) =>
        basketItem.id === item.id
          ? { ...basketItem, quantity: basketItem.quantity + 1 }
          : basketItem
      );
      setBasketItems(updatedItems);
    } else {
      setBasketItems([...basketItems, { ...item, quantity: 1 }]);
    }
  };

  const BasketContextValue = useMemo(
    () => ({
      basketItems,
      setBasketItems,
      addToBasket,
    }),
    [basketItems, setBasketItems, addToBasket]
  );

  return (
    <BasketContext.Provider value={BasketContextValue}>
      {children}
    </BasketContext.Provider>
  );
}

export const useBasket = () => useContext(BasketContext);

BasketContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
