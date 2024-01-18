import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const BasketContext = createContext();

export default function BasketContextProvider({ children }) {
  const [basketCount, setBasketCount] = useState(0);

  const BasketContextValue = useMemo(
    () => ({
      basketCount,
      setBasketCount,
    }),
    [basketCount, setBasketCount]
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
