import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";
import { FunctionCall, Functions, openai } from "../services/chatgpt.service";

export type Exercise = {
  name: string;
  sets: number;
  mainWorkingMuscle: string;
  rest: string;
  description: string;
  link: string;
};

export type Workout = {
  title: string;
  duration: number;
  exercises: Exercise[];
};

export const workoutFunctionsCalls: FunctionCall = {
  name: "getWorkoutArrayObject",
};

export const workoutFunctions: Functions = [
  {
    name: "getWorkoutArrayObject",
    parameters: {
      type: "object",
      properties: {
        workouts: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
              },
              duration: {
                type: "number",
              },
              exercises: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    sets: {
                      type: "number",
                    },
                    mainWorkingMuscle: {
                      type: "string",
                    },
                    rest: {
                      type: "string",
                    },
                    description: {
                      type: "string",
                    },
                    link: {
                      type: "string",
                      format: "uri",
                    },
                  },
                  required: [
                    "name",
                    "sets",
                    "mainWorkingMuscle",
                    "rest",
                    "description",
                    "link",
                  ],
                },
              },
            },
            required: ["title", "duration", "exercises"],
          },
        },
      },
    },
  },
];
