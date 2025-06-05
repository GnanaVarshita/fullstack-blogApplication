const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors())
//define admin if necessary 
const authorRouter = require("./routes/author");


app.use(bodyParser.json());

app.use("/author", authorRouter)

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
