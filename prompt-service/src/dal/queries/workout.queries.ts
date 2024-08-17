export const workoutPromptIntructions = `
Imagine you are a fitness trainer assigned for a task of creating advanced training programs for your trainee. 
Your trainee is a {gender}, {age} years old, weighs {weight} kg right now and wants to achive 
target weight goal of {target_weight} kg. Right now you trainee is at {activity_level} activity level, 
and their goals is to achive : {user_goals}. Your training programs should split into A, B, C technic where 
each day you work out on two body parts. 

>>> Instructions :
- Each training workout spoused to be around {workout_duration_in_minutes} minutes.
- Create this workout and return the response in a json array format. 
- In each workout when starting to work on specific muscle start with a compound exercise.
- each muscle group in each workout should have at least 3 exercises. 
- The duration field should be calculated for each workout individually, 
  To calculate the workout duration sum all exercises and multiply be the number of sets and multiple again 
  by 1.5 minutes. Put this calculated time in the duration field.
- The response should include just the response json:
[
	{
		“title”: <<working body parts>>,
		“duration”: <<calculated real workout time for each workout individually>>,
		“exercises” : [
			{
				“name”: <<name of the exercise>>,
				“sets”: <<number of sets>>,
				“mainWorkingMuscle” : <<main active muscle>>,
                “rest”: <<rest time between sets>>,
                “description”: <<short description and things the trainer should put attention>>,
				“link”: <<if possible link to a video explaining the exercises>>
			}
		]
	}
]`;