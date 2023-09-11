const mongoose = require('mongoose')
const db = "mongodb+srv://varun:varunmalpani@cluster0.8vpxvx6.mongodb.net/"
mongoose.set("strictQuery", false);

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connected');
}).catch((err) => console.log(err));




