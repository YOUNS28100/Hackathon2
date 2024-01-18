import Registration from "../components/Registration";

export default function RegistrationPage() {
  return (
    <div className="mt-20 h-56 flex flex-col justify-between">
      {/* <h1 className="text-3xl">
        Welcome, please register to use this application
      </h1> */}
      <div>
        <Registration />
      </div>
    </div>
  );
}
