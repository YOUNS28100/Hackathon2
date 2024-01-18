import React from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";

export default function SkinCare() {
  const product = useLoaderData();

  return (
    <div className="h-screen bg-silverRust p-4 mt-32">
      <div className="flex flex-row justify-center flex-wrap gap-4">
        {product &&
          product.map((p) => (
            <div
              key={p.id}
              className="text-center w-44 flex flex-row flex-wrap p-4"
            >
              <img src={p.product_url} alt={p.name} />
              <h1 className="text-l font-bold ">{p.name}</h1>
              <NavLink to={`/product/${p.id}`}>Détails produits</NavLink>
            </div>
          ))}
      </div>

      <p className="text-2xl leading-loose mt-20 p-8 ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam rem
        placeat itaque animi! Repellat voluptatum id exercitationem beatae
        aliquid veniam vero adipisci repudiandae, culpa nostrum magni. Nostrum
        quo ad distinctio molestias possimus, velit consequuntur iste ducimus
        magni repellendus aliquid ratione dolorem deserunt id impedit voluptates
        esse dignissimos quaerat veniam doloribus officiis, ab harum voluptate
        modi. Exercitationem rem repellat eum deserunt est! Molestiae error sed
        blanditiis commodi! Quam quis exercitationem reiciendis iusto dicta
        dolorum nesciunt rerum ipsum autem voluptates soluta voluptate quos fuga
        minima, quas officia hic sequi alias eum. Sapiente odit, inventore
        quisquam mollitia, id omnis tempore ipsum magni doloribus modi rem,
        voluptatibus et excepturi sequi ab odio fugit amet voluptas? Sapiente,
        recusandae earum? Natus totam rem sequi at ex facere sed numquam minus
        exercitationem, harum nostrum assumenda. Enim magni, dignissimos
        obcaecati natus nemo fugiat quidem tenetur iste ex ipsum ut nam ad
        quaerat praesentium blanditiis explicabo illum, tempore sunt!
      </p>
    </div>
  );
}

SkinCare.propTypes = {
  products: PropTypes.shape({
    name: PropTypes.string.isRequired,
    product_url: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
