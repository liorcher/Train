export const getMockData = () => {
  const options = [
    { caloriesBurned: 70, weightLoss: 60 },
    { caloriesBurned: 50, weightLoss: 50 },
    { caloriesBurned: 30, weightLoss: 20 },
    { caloriesBurned: 20, weightLoss: 10 },
    { caloriesBurned: 0, weightLoss: 0 },
  ]

  const randomIndex = Math.floor(Math.random() * options.length)
  return options[randomIndex]
}
