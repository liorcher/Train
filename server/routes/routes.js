const express = require('express');
const router = express.Router();
const pool = require('../dal/data_access');

router.get('/users', (request, response) => {
    pool.query('SELECT * FROM "trAIn".users ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log(error);
            throw error;
        }
        response.status(200).json(results.rows);
    });
});

router.get('/newUser', (req, res) => {

    console.log('hi');
    res.send('New user added');
});

router.get('/updateUserData', (req, res) => {
    res.send('User data updated');
});

router.get('/getPersonalizedTrainingSchedule', (req, res) => {
    res.send('Personalized training schedule');
});

router.get('/refreshNewSchedule', (req, res) => {
    res.send('New schedule refreshed');
});

router.get('/reportActivity', (req, res) => {
    res.send('Activity reported');
});

router.get('/updateUserPreferences', (req, res) => {
    const { gender, age, weight, targetWeight, height, activityLevel, goals, days, workouts, durationInMinutes } = req.query;

    res.send('User preferences updated');
});

module.exports = router;
