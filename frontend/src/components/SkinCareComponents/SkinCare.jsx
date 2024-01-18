import { useLoaderData } from "react-router-dom";

export default function SkinCare() {
  const { product, user } = useLoaderData();
  const users = [user];

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
      {users && users.map((u) => <h1 key={u.id}>Welcome {u.firstname}</h1>)}
      {filteredProduct1 &&
        filteredProduct1.map((s) => (
          <div>
            <h3 key={s.id}> {s.name}</h3>
            <img src={s.image} alt={s.name} />
          </div>
        ))}
      {filteredProduct2 &&
        filteredProduct2.map((s) => (
          <div>
            <h3 key={s.id}> {s.name}</h3>
            <img src={s.image} alt={s.name} />
          </div>
        ))}
      {filteredProduct3 &&
        filteredProduct3.map((s) => (
          <div>
            <h3 key={s.id}> {s.name}</h3>
            <img src={s.image} alt={s.name} />
          </div>
        ))}
    </div>
  );
}
