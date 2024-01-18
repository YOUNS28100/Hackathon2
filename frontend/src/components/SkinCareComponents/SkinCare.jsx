
import React from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";

export default function SkinCare() {
  const product = useLoaderData();

  const navigate = useNavigate();

  const { product, user } = useLoaderData();
  const products = [product];
  const users = [user];

  const filteredProduct1 = products[0].filter(
    (s) => s.skinId_1 === user.skin_id_1
  );

  const filteredProduct2 = products[0].filter(
    (s) => s.skinId_2 === user.skin_id_2
  );

  const filteredProduct3 = products[0].filter(
    (s) => s.skinId_3 === user.skin_id_3
  );

  return (
    <div className="h-screen bg-silverRust p-4 mt-32">
      <div className="flex flex-row justify-center flex-wrap gap-4">
        {product.map((p) => (
          <div
            key={p.id}
            className="text-center w-44 flex flex-row flex-wrap p-4"
          >
            <img src={p.product_url} alt={p.name} />
            <h1 className="text-l font-bold ">{p.name}</h1>
            <button type="button" onClick={() => navigate(`/product/${p.id}`)}>
              Détails produits
            </button>
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


export default function SkinCare() {
  const { product, user } = useLoaderData();
  const products = [product];
  const users = [user];

  const filteredProduct1 = products[0].filter(
    (s) => s.skinId_1 === user.skin_id_1
  );

  const filteredProduct2 = products[0].filter(
    (s) => s.skinId_2 === user.skin_id_2
  );

  const filteredProduct3 = products[0].filter(
    (s) => s.skinId_3 === user.skin_id_3
  );

  return (
    <div>
      {users && users.map((u) => <h1 key={u.id}>Welcome {u.firstname}</h1>)}
      {filteredProduct1 &&
        filteredProduct1.map((s) => (
          <div>
            <h3 key={s.id}> {s.name}</h3>
            <img src={s.image} alt={s.name} />
          </div>
        ))}
      {filteredProduct2 &&
        filteredProduct2.map((s) => <h3 key={s.id}> {s.name}</h3>)}
      {filteredProduct3 &&
        filteredProduct3.map((s) => <h3 key={s.id}> {s.name}</h3>)}

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
