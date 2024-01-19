import React, { useState } from "react";
import Login from "../components/Login/Login";
import Registration from "../components/Registration";

function LoginPage() {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <div>
      {isLogged ? (
        <Login setIsLogged={setIsLogged} />
      ) : (
        <Registration setIsLogged={setIsLogged} />
      )}
    </div>
  );
}

export default LoginPage;
