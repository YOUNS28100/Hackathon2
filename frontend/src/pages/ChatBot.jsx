import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import design from "../assets/pictures/deco.png";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-1">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">Emma</h1>

      <form
        className="w-full max-w-md p-4 items-center"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="chat"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Ask questions :
          </label>
          <input
            name="chat"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter text"
            value={promptUser}
            onChange={handlePrompt}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-black  hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/3"
            type="submit"
          >
            Go
          </button>
        </div>
      </form>
      <div className="bg-gray-700 bg-opacity-50 mt-2 p-4 border-5 rounded w-full max-w-md">
        <p className="text-black">
          {response
            ? response.chat_response || response
            : "Hello, how can i help you ?"}
        </p>
      </div>
      <img src={design} alt="Design" />
    </div>
  );
}
