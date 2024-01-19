async function getCurrentLocation() {
  return "Paris"; // Simulate lookup
}

async function getWeather() {
  return "sunny";
}

async function main(client, message) {
  const runner = client.beta.chat.completions
    .runTools({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      // tools: [
      //   {
      //     type: "function",
      //     function: {
      //       function: getCurrentLocation,
      //       parameters: { type: "object", properties: {} },
      //     },
      //   },
      //   {
      //     type: "function",
      //     function: {
      //       function: getWeather,
      //       parse: JSON.parse,
      //       parameters: {
      //         type: "object",
      //         properties: {
      //           location: { type: "string" },
      //         },
      //       },
      //     },
      //   },
      // ],
    })
    .on("message", (messages) => console.info(messages));

  const finalContent = await runner.finalContent();
  return finalContent;
}

module.exports = {
  getWeather,
  getCurrentLocation,
  main,
};

// {role: "user",      content: "How's the weather this week?"}
// {role: "assistant", tool_calls: [{type: "function", function: {name: "getCurrentLocation", arguments: "{}"}, id: "123"}
// {role: "tool",      name: "getCurrentLocation", content: "Boston", tool_call_id: "123"}
// {role: "assistant", tool_calls: [{type: "function", function: {name: "getWeather", arguments: '{"location": "Boston"}'}, id: "1234"}]}
// {role: "tool",      name: "getWeather", content: '{"temperature": "50degF", "preciptation": "high"}', tool_call_id: "1234"}
// {role: "assistant", content: "It's looking cold and rainy - you might want to wear a jacket!"}
//
// Final content: "It's looking cold and rainy - you might want to wear a jacket!"
