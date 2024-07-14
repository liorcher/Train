const express = require('express');
const routes = require('./routes/routes'); // Update the path to the routes file

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.use('/', routes);