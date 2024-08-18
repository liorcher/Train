import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not defined");
}

export const openai = new OpenAI({
  organization: "org-DgGuQGI2UtqOGDiKgpdESQiX",
  project: "proj_phCb3niOaf2sozls0YAHwLyF",
  apiKey: process.env.OPENAI_API_KEY,
});

export type Messages = Parameters<
  typeof openai.chat.completions.create
>[0]["messages"];
export type Functions = Parameters<
  typeof openai.chat.completions.create
>[0]["functions"];
export type FunctionCall = Parameters<
  typeof openai.chat.completions.create
>[0]["function_call"];

export const sendChatGPTQuery = async ({
  messages,
  function_call,
  functions,
}: {
  messages: Messages;
  function_call: FunctionCall;
  functions: Functions;
}) => {
  try {
    return openai.chat.completions.create({
      model: "gpt-4o-mini",
      function_call,
      functions,
      messages,
      response_format: { type: "json_object" },
    });
  } catch (gpt4PreviewError) {
    console.error(
      new Error("Continuing to gpt4 base, Error with gpt preview model")
    );

    try {
      return openai.chat.completions.create({
        model: "gpt-4",
        function_call,
        functions,
        messages,
      });
    } catch (gpt4err) {
      console.error(new Error("Error with gpt-4 model"));
      throw gpt4err;
    }
  }
};
