import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function UserSkinInformation({ user }) {
  const [skinOptions, setSkinOptions] = useState();
  const [skinType1, setSkinType1] = useState(user.skin_type_1);
  const [skinType2, setSkinType2] = useState(user.skin_type_2);
  const [skinType3, setSkinType3] = useState(user.skin_type_3);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  useEffect(() => {
    if (!skinOptions) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/skin`).then((res) => {
        res.data.splice(7, 2);
        setSkinOptions(res.data);
      });
    }
  });

  const editUser = () => {
    const updatedUser = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      city: user.city,
      country: user.country,
      latitude: user.latitude,
      longitude: user.longitude,
      age: user.age,
      skinType1: parseInt(skinType1, 10),
      skinType2: parseInt(skinType2, 10),
      skinType3: parseInt(skinType3, 10),
    };

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${user.id}`,
        updatedUser
      )
      .then((res) => {
        const updatedUserData = res.data;
        setSkinType1(updatedUserData.data.skin_type_1);
        setSkinType2(updatedUserData.data.skin_type_2);
        setSkinType3(updatedUserData.data.skin_type_3);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="border-4 border-solid flex flex-col rounded-2xl m-4 p-4 ">
      <h1 className="font-CamptonBook text-3xl font-bold mb-6 text-center">
        Your Skin information
      </h1>

      <div className="mt-5 text-start"> Type 1 : {skinType1}</div>
      <div className="mt-5"> Type 2 : {skinType2}</div>
      <div className="mt-5"> Type 3 : {skinType3}</div>

      <button
        type="button"
        className="mx-28 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-black hover:bg-gray-300 focus:outline-none focus:ring focus:ring-opacity-50 mt-10"
        onClick={openModal}
      >
        Update
      </button>
      <Modal
        isOpen={isModalVisible}
        onRequestClose={closeModal}
        contentLabel="Edit Skin Types"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        className="bg-gray-300 rounded-lg p-6 max-w-md mx-auto"
      >
        <div className="text-gray-600 space-y-4">
          <div className="mb-1">
            Type 1:
            <select
              value={skinType1}
              onChange={(e) => setSkinType1(e.target.value)}
            >
              {skinOptions &&
                skinOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.type}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-1">
            Type 2:
            <select
              value={skinType2}
              onChange={(e) => setSkinType2(e.target.value)}
            >
              {skinOptions &&
                skinOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.type}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-1">
            Type 3:
            <select
              value={skinType3}
              onChange={(e) => setSkinType3(e.target.value)}
            >
              {skinOptions &&
                skinOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.type}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col space-y-4 mt-4">
          <button
            type="button"
            className="border-black border-2 bg-black text-white w-fit p-3 pl-7 pr-6"
            onClick={editUser}
          >
            Update
          </button>
          <button
            type="button"
            className="border-black border-2 bg-black text-white w-fit p-3 pl-7 pr-7"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

UserSkinInformation.propTypes = {
  user: PropTypes.shape.isRequired,
};
