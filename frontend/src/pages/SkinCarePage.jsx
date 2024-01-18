import { useLoaderData } from "react-router-dom";
import SkinCare from "../components/SkinCareComponents/SkinCare";

export default function SkinCarePage() {
  const { product, user, weather } = useLoaderData();

  return (
    <section className="mt-20">
      <SkinCare product={product} user={user} weather={weather} />
    </section>
  );
}
