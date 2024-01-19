const { ChatOpenAI } = require("@langchain/openai");

const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

const OpenAI = require("openai");
const tables = require("../tables");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function OpenChat(req, res) {
  const systemContent = `You are a personal assistant called Emma and you advise an user for his skincare thanks to the famous brand called L'Oréal. You love every l'Oréal's products `;
  const userId = req.body.id;
  const message = JSON.stringify(req.body.prompt);
  const weatherData = req.body.weather;
  const userData = await tables.user.read(userId);

  const moderation = await openai.moderations
    .create({ input: message })
    .then((response) => response.results[0].flagged);
  if (moderation) {
    res
      .status(200)
      .json("Sorry, your sentence was moderate, please try again.");
  } else if (message.includes("city" && "weather")) {
    const completion = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-3.5-turbo",
      temperature: 1,
      maxTokens: 100,
      maxRetries: 5,
    });
    const result = await completion.invoke(
      [new SystemMessage(systemContent), new HumanMessage(message)],
      {
        functions: [
          {
            name: "getCityAndCountry",
            description:
              "Get the city and country from the user with the weather.",
            parameters: {
              type: "object",
              properties: {
                city: {
                  type: "string",
                  description: "This is the user's city.",
                  enum: [`${userData.city}`, `${userData.city}`],
                },
                country: {
                  type: "string",
                  description: "This is the user's country.",
                  enum: [`${userData.country}`, `${userData.country}`],
                },
                weather: {
                  type: "string",
                  description: "The weather like in the user's city.",
                  enum: [
                    `${weatherData.current.condition.text}`,
                    `${weatherData.current.condition.text}`,
                  ],
                },
                chat_response: {
                  type: "string",
                  description:
                    "You tell the user the weather in his city and tell him skincare for the day with L'Oreal products.",
                },
              },
              required: ["city", "country", "chat_response", "weather"],
            },
          },
        ],
        function_call: { name: "getCityAndCountry" },
      }
    );

    const data = JSON.parse(result.additional_kwargs.function_call.arguments);

    res.status(200).json(data);
  } else {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemContent,
        },
        {
          role: "user",
          name: `${userData.name}`,
          content: message,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 1,
      max_tokens: 100,
    });

    if (moderation) {
      res
        .status(200)
        .json("Sorry, your sentence was moderate, please try again.");
    } else {
      res.status(200).json(completion.choices[0].message.content);
      console.info("answer chat", completion.choices[0].message);
    }
  }
}

module.exports = { OpenChat };
