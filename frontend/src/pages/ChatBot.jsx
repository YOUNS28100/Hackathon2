import axios from "axios";
import { useState } from "react";

export default function Chat() {
  const [promptUser, setPromptUser] = useState("");
  const [response, setResponse] = useState("");
  const url = import.meta.env.VITE_BACKEND_URL;
  // const url = "https://api.openai.com/v1/chat/completions";

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/api/chat/`, { promptUser })
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
    <div className="container container-sm p-1 bg-green-200">
      {" "}
      <form className="form mt-28" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="chat">Ask questions</label>
          <input
            name="chat"
            className="shadow-sm"
            type="text"
            placeholder="Enter text"
            value={promptUser}
            onChange={handlePrompt}
          />
        </div>{" "}
        <button className="btn btn-accept w-100" type="submit">
          Go
        </button>
      </form>
      <div className="bg-darkGreen  mt-2 p-1 border-5">
        <p className="text-light">
          {response && response}
          {!response && "Ask me anything..."}
        </p>
      </div>
    </div>
  );
}
