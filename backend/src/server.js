const express =  require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const router = require("./Routes")

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(router)


module.exports = app