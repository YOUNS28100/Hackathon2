import { useLoaderData } from "react-router-dom";
import UserInformation from "../components/UserComponents/UserInformation";
import UserSkinInformation from "../components/UserComponents/UserSkinInformation";

export default function UserPage() {
  const user = useLoaderData();
  return (
    <>
      <UserInformation />
      <UserSkinInformation user={user} />
    </>
  );
}
