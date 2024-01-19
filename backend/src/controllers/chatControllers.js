const OpenAI = require("openai");
// const { getCurrentLocation, getWeather } = require("../services/Chatbot");
// const { main } = require("../services/Chatbot");

require("dotenv").config();

const openai = new OpenAI({
  apiKey: "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",
});

async function OpenChat(req, res) {
  const message = JSON.stringify(req.body.promptUser);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a personal assistant called Toto and you advise an user to use creams from the famous brand called L'Oréal",
      },
      { role: "user", content: message },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 500,
  });
  res.status(200).json(completion.choices[0].message.content);
  console.info(completion.choices[0].message);
}

module.exports = { OpenChat };

// "How is the weather this week in Paris ?"
// {role: "user",      content: "How's the weather this week?"}
// {role: "assistant", tool_calls: [{type: "function", function: {name: "getCurrentLocation", arguments: "{}"}, id: "123"}
// {role: "tool",      name: "getCurrentLocation", content: "Boston", tool_call_id: "123"}
// {role: "assistant", tool_calls: [{type: "function", function: {name: "getWeather", arguments: '{"location": "Boston"}'}, id: "1234"}]}
// {role: "tool",      name: "getWeather", content: '{"temperature": "50degF", "preciptation": "high"}', tool_call_id: "1234"}
// {role: "assistant", content: "It's looking cold and rainy - you might want to wear a jacket!"}
//
// Final content: "It's looking cold and rainy - you might want to wear a jacket!"
