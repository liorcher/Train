const pool = require('./dal/data_access')
const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.get('/users', (request, response) => {
    pool.query('SELECT * FROM "trAIn".users ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log(error);
            throw error
        }
        response.status(200).json(results.rows)
    })
});
