import {
  Messages,
  openai,
  sendChatGPTQuery,
} from "../services/chatgpt.service";
import { workoutPromptIntructions } from "./queries/workout.queries";
import {
  Workout,
  workoutFunctions,
  workoutFunctionsCalls,
} from "../models/workout.model";

export const getWorkoutPlan = async (userRequests: string) => {
  try {
    const messages: Messages = [
      {
        role: "system",
        content: workoutPromptIntructions,
      },
      {
        role: "user",
        content: userRequests,
      },
    ];

    const response = await sendChatGPTQuery({
      messages,
      function_call: "auto",
      functions: workoutFunctions,
    });

    const functionCall = response.choices[0].message.function_call;
    const json = <Workout[]>JSON.parse(functionCall?.arguments as string);

    return { json };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
