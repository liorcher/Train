import { sendChatGPTQuery } from "../services/chatgpt.service";
import { mealQuery } from "./queries/nutrition.queries";

export const getMealPlan = async () => {
  try {
    const response = mealQuery;

    return { response };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
