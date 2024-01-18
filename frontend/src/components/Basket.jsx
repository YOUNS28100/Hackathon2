import React from "react";
import { useBasket } from "../context/BasketCount";

function BasketComponent() {
  const { basketCount } = useBasket();

  return (
    <div className="mt-32">
      <h2 className="text-center ">Your Basket</h2>
      <p>Number of items in the basket: {basketCount}</p>
    </div>
  );
}

export default BasketComponent;
