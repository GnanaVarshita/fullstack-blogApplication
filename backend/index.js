const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors())
//define admin if necessary 
const userRouter = require("./routes/user");


app.use(bodyParser.json());

app.use("/user", userRouter)

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
