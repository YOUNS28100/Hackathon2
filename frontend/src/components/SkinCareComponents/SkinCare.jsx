import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function SkinCare({ product, user, weather }) {
  const navigate = useNavigate();

  const { current, location } = weather;
  console.info(current, location);

  const filteredProduct1 = product.filter(
    (s) =>
      s.skinId_1 === user.skin_id_1 ||
      s.skinId_2 === user.skin_id_1 ||
      s.skinId_3 === user.skin_id_1
  );

  const filteredProduct2 = product.filter(
    (s) =>
      s.skinId_1 === user.skin_id_2 ||
      s.skinId_2 === user.skin_id_2 ||
      s.skinId_3 === user.skin_id_2
  );

  const filteredProduct3 = product.filter(
    (s) =>
      s.skinId_1 === user.skin_id_3 ||
      s.skinId_2 === user.skin_id_3 ||
      s.skinId_3 === user.skin_id_3
  );

  return (
    <div>
      {user && <h1 className="text-2xl">Welcome {user.firstname}</h1>}
      {filteredProduct1 &&
        filteredProduct1.map((s) => (
          <div>
            <h3 className="text-2xl" key={s.id}>
              {" "}
              {s.name}
            </h3>
            <img src={s.imagebis} className="w-screen h-auto" alt={s.name} />
            <button type="button" onClick={() => navigate(`/product/${s.id}`)}>
              More details
            </button>
          </div>
        ))}
      {filteredProduct2 &&
        filteredProduct2.map((s) => (
          <div>
            <h3 className="text-2xl" key={s.id}>
              {" "}
              {s.name}
            </h3>
            <img src={s.imagebis} className="w-screen h-auto" alt={s.name} />
            <button type="button" onClick={() => navigate(`/product/${s.id}`)}>
              More details
            </button>
          </div>
        ))}
      {filteredProduct3 &&
        filteredProduct3.map((s) => (
          <div>
            <h3 key={s.id}> {s.name}</h3>
            <img src={s.imagebis} className="w-screen h-auto" alt={s.name} />
            <button type="button" onClick={() => navigate(`/product/${s.id}`)}>
              More details
            </button>
          </div>
        ))}
    </div>
  );
}
SkinCare.propTypes = {
  product: PropTypes.arrayOf(PropTypes.shape).isRequired,
  user: PropTypes.shape().isRequired,
  weather: PropTypes.shape().isRequired,
};
