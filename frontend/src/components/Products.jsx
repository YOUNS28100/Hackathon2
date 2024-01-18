import React from "react";
import PropTypes from "prop-types";
import { useBasket } from "../context/BasketCount";

function Products({ product }) {
  const { basketCount, setBasketCount } = useBasket();

  const handleAddToBasket = () => {
    setBasketCount(basketCount + 1);
  };

  return (
    <div className="m-8">
      <img src={product.image} alt={product.name} />
      <h1 className="text-3xl font-bold font-CamptonBook mb-6 mt-10">
        {product.name}
      </h1>
      <p className="text-mineShaft text-l mb-10">{product.category}</p>

      <p className="font-bold mb-10 text-xl">{product.price} €</p>
      <button
        type="button"
        className="flex flex-row justify-center bg-black text-white text-l p-3 pl-5 pr-5 m-16 ml-20"
        onClick={handleAddToBasket}
      >
        ADD TO BASKET
      </button>
      <p className="text-l mb-6">{product.description}</p>
      <p>Learn more: {product.product_url}</p>
    </div>
  );
}

export default Products;

Products.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    product_url: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
