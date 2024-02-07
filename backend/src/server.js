const express =  require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const mainRouter = require("./routes/mainRouter.js");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(mainRouter);


module.exports = app