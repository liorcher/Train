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
import { userPreferences } from "../models/userPreferences.model";
import { formatString } from "../utils/strings.util";

export const getWorkoutPlan = async (userRequests: userPreferences) => {
  const variables =  {
    "age": userRequests.age, 
    "weight": userRequests.weight,
    "gender": userRequests.gender,
    "activity_level": userRequests.activity_level,
    "target_weight": userRequests.target_weight,
    "user_goals": userRequests.user_goals.join(', '),
    "workout_duration_in_minutes": userRequests.workout_duration_in_minutes,
  }

  try {
    const messages: Messages = [
      {
        role: "system",
        content: formatString(workoutPromptIntructions, variables),
      }
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
