require('dotenv').config()
const express = require('express')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const leaveRoute = require('./routes/leave')
const attendanceRoute = require('./routes/attendance')
const authCheckRoute = require('./routes/authcheck')
const middlewareLogs = require('./middleware/middleware')
const cors = require('cors');
const app = express()
const port = process.env.PORT

app.use(cors());

app.use(express.json())
app.use(middlewareLogs)

app.use("/check", authCheckRoute);
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/attendance", attendanceRoute);
app.use("/leave", leaveRoute);

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})