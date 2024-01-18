import React from "react";
import { useBasket } from "../context/BasketCount";

import Basket from "../components/Basket";

function BasketPage() {
  const { basketCount } = useBasket();

  return (
    <div>
      <Basket basketCount={basketCount} />
    </div>
  );
}

export default BasketPage;
