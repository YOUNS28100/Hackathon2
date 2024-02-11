import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import sendIcon from "../assets/icons8-send-24.png";

export default function Chat() {
  const { auth } = useOutletContext();
  const [weatherData, setWeatherData] = useState();
  const [promptUser, setPromptUser] = useState("");
  const [response, setResponse] = useState("");
  const { VITE_BACKEND_URL, VITE_WEATHER, VITE_WEATHER_KEY } = import.meta.env;

  useEffect(() => {
    if (!weatherData) {
      axios
        .get(`${VITE_WEATHER}${VITE_WEATHER_KEY}&aqi=yes&q=Stockholm`)
        .then((res) => setWeatherData(res.data));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${VITE_BACKEND_URL}/api/chat/`, {
        prompt: promptUser,
        id: auth.id,
        weather: weatherData,
      })
      .then((res) => {
        setResponse(res.data);
        console.info("chatbot", promptUser);
      })
      .catch((error) => {
        console.info(error);
      });

    setPromptUser("");
  };

  const handlePrompt = (e) => {
    setPromptUser(e.target.value);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen p-1">
      <div className="flex flex-col">
        <h1 className="text-5xl mt-28 text-gray-800 mb-8">Emma.</h1>
        <div className="mt-2 p-4 rounded w-full flex flex-col h-[20rem] overflow-auto shadow-[inset_0px_-11px_10px_-8px_rgba(0,0,0,0.20)]">
          <p className="text-black text-pretty text-lg">
            {response
              ? response.chat_response || response
              : "Hello, how can I help you?"}
          </p>
        </div>
      </div>
      <form
        className="w-full max-w-md p-4 items-center"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 absolute bg-white bottom-6 w-11/12">
          <label
            htmlFor="chat"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Ask questions :
          </label>
          <input
            name="chat"
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter text"
            value={promptUser}
            onChange={handlePrompt}
          />
        </div>
        <button
          className="font-bold rounded focus:outline-none focus:shadow-outline absolute bottom-12 right-5"
          type="submit"
        >
          <img src={sendIcon} width={30} alt="send icon" />
        </button>
      </form>
    </div>
  );
}
