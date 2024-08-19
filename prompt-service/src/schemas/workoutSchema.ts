import Joi from 'joi';

export const workoutPlanSchema = Joi.object({
  age: Joi.number().integer().min(1).max(120),
  weight: Joi.number().min(1).max(500),
  height: Joi.number().min(50).max(250).default(175),
  gender: Joi.string().valid('Male', 'Female', 'Other'),
  activityLevel: Joi.string().valid('Beginner', 'Intermediate', 'Advanced'),
  targetWeight: Joi.number().min(1).max(500),
  goals: Joi.array().items(
    Joi.string().valid('Lose weight', 'Maintain weight', 'Gain muscle', 'Build muscle')
  ),
  workoutDurationInMinutes: Joi.number().min(30).max(180),
}).unknown(true);
