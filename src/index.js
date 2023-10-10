require('dotenv').config()
const express = require('express')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const attendanceRoute = require('./routes/attendance')
const middlewareLogs = require('./middleware/middleware')
const cors = require('cors');
const app = express()
const port = process.env.PORT

app.use(cors());

app.use(express.json())
app.use(middlewareLogs)

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/attendance", attendanceRoute);

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})