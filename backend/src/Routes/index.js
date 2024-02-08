const { Router } = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("../Routes/usersRoutes")
const visitaRouter = require("../Routes/visitasRoutes")

const router = Router()

router.use(morgan("dev"));
router.use(cors());
router.use("/users", userRouter)
router.use("/visitas", visitaRouter)


module.exports = router