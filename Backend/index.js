const express = require("express");
const mmyroute = require("./Routes/mmyRoute")
const cors = require("cors")
require("./db")
const app = express()
app.use(cors())
app.get('/', (req, res) => {
    res.send("200", console.log("hi"))
})
app.use(express.json());
app.use('/api/addmmy', mmyroute)
const Port = 5000;
const server = app.listen(Port, console.log(`server started on port number ${Port}`))