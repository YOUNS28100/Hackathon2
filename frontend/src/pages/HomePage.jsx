import Registration from "../components/Registration";

export default function HomePage() {
  return (
    <div className="h-screen bg-silverRust p-4">
      <h1 className="text-6xl text-center font-cblight">L'Oréal</h1>
      <p className="text-2xl leading-loose p-8 ">
        Lorem ipsum dolor sit amet consectetur adipisicin
      </p>
      <Registration />
    </div>
  );
}
