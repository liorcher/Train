import Joi from 'joi';

export const workoutPlanSchema = Joi.object({
  age: Joi.number().integer().min(1).max(120),
  weight: Joi.number().min(1).max(500),
  height: Joi.number().min(0.5).max(2.5).default(1.75),
  gender: Joi.string().valid('male', 'female', 'other'),
  activity_level: Joi.string().valid('sedentary', 'lightly active', 'moderately active', 'very active', 'extra active'),
  target_weight: Joi.number().min(1).max(500),
  user_goals: Joi.array().items(Joi.string().valid('gain muscle', 'be more active', 'loose weight', 'improve flexibility', 'improve endurance')),
  workout_duration_in_minutes: Joi.number().min(30).max(180)
});
