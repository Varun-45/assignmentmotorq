const mongoose = require("mongoose")

const mmyModel = mongoose.Schema({
    make: {
        type: String
    },
    model: {
        type: String
    },
    year: {
        type: String
    },
    vin: {
        type: String
    }
}, {
    timeStamps: true,
});

const mmy = mongoose.model("mmy", mmyModel);

module.exports = mmy;