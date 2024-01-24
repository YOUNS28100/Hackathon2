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
