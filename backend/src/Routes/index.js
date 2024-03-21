const { Router } = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("../Routes/usersRoutes")
const visitaRouter = require("../Routes/visitasRoutes")
const guardiasRouter = require("../Routes/guardiasRoutes")
const eventsRouter = require('./eventsRouter.js');
const messagesRouter = require('./messagesRouter.js');
const mailRouter = require('./mailRouter.js');

const router = Router()

router.use(morgan("dev"));
router.use(cors());
router.use("/users", userRouter)
router.use("/visitas", visitaRouter)
router.use("/guards", guardiasRouter)
router.use('/events', eventsRouter)
router.use('/messages', messagesRouter);
router.use('/mail', mailRouter);


module.exports = router