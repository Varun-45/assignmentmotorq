const mongoose = require("mongoose")

const custmmyModel = mongoose.Schema({
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
    },
    status: {
        type: String
    },
    Date: {
        type: String
    },
    Pic: {
        type: String
    }
}, {
    timeStamps: true,
});

const custmmy = mongoose.model("customer data", custmmyModel);

module.exports = custmmy;