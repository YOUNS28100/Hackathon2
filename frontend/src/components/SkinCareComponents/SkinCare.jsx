import { useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function SkinCare({ product, user, weather }) {
  const navigate = useNavigate();

  const { current, location } = weather;
  console.info(current, location);
  console.info(current.air_quality);

  const [message, setMessage] = useState("");
  console.info(message);
  useEffect(() => {
    if (current.air_quality.pm2_5 < 50 && current.air_quality.pm10 < 50) {
      setMessage("Air quality is good");
    }
    if (
      (current.air_quality.pm2_5 > 50 && current.air_quality.pm2_5 < 80) ||
      (current.air_quality.pm10 > 50 && current.air_quality.pm10 < 80)
    ) {
      setMessage("Air quality is moderate");
    }
    if (current.air_quality.pm2_5 > 80 && current.air_quality.pm10 > 80) {
      setMessage("Air particules are dangerously high today");
    }
  }, []);

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
      <div className=" flex flex-col justify-center gap-3 align-middle text-lg mt-52 mx-2">
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.5 }}
        >
          {user && <h1 className="text-5xl">Hello {user.firstname},</h1>}{" "}
        </m.div>

        <m.div
          className="mt-20 text-end text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 1 }}
        >
          {" "}
          Today, in{" "}
          <b>
            {" "}
            {location.name},{location.country}
          </b>{" "}
          <br />
          The weather is: <b>{current.condition.text}</b> <br /> {message} with{" "}
          {current.humidity}% humidity{" "}
        </m.div>
      </div>
      <m.div
        className="mt-28 text-center text-pretty text-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut", delay: 1.5 }}
      >
        Here's our suggestions.
      </m.div>

      {filteredProduct1 &&
        filteredProduct1.map((s) => (
          <div key={s.id} className="mt-20">
            <button type="button" onClick={() => navigate(`/product/${s.id}`)}>
              <h3 className="text-2xl">{s.name}</h3>
              <img src={s.imagebis} className="w-screen h-auto" alt={s.name} />
            </button>
          </div>
        ))}
      {filteredProduct2 &&
        filteredProduct2.map((s) => (
          <div key={s.id}>
            <button
              type="button"
              className="relative"
              onClick={() => navigate(`/product/${s.id}`)}
            >
              <h3 className="text-2xl absolute">{s.name}</h3>
              <img src={s.imagebis} className="w-screen h-auto" alt={s.name} />
            </button>
          </div>
        ))}
      {filteredProduct3 &&
        filteredProduct3.map((s) => (
          <div key={s.id}>
            <button type="button" onClick={() => navigate(`/product/${s.id}`)}>
              <h3> {s.name}</h3>
              <img src={s.imagebis} className="w-screen h-auto" alt={s.name} />
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
