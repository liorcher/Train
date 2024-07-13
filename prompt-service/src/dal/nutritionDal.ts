import { sendChatGPTQuery } from "../services/chatgptService";
import { mealQuery } from "./queries/nutritionQueries";

export const getMealPlan = async () => {
  try {
    const response = await sendChatGPTQuery(mealQuery);
    return { response };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
