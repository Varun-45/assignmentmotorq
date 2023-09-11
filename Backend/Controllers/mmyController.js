const asyncHandler = require("express-async-handler")
const Mmy = require("../models/mmyModel")
const custData = require("../models/customermmyModel")
const addmmy = asyncHandler(async (req, res) => {
    const { make, model, year, vin } = req.body;
    if (!make || !model || !year || !vin) {
        res.status(400);
        throw new Error('Please provide all the details')
    }
    const vincheck = vin.substring(0, 8);
    const mmyExists = await Mmy.findOne({ make, model, year, vin })
    if (mmyExists) {
        res.status(401)
        throw new Error("MMY already exits")

    }
    const mmy = await Mmy.create({
        make, model, year, vin
    })
    if (mmy) {
        res.status(201).json({
            _id: mmy._id,
            make: mmy.make,
            model: mmy.model,
            year: mmy.year,
            vin: mmy.vin
        })
    }
    else {
        res.status(400);
        throw new Error("Problem adding User");
    }
})
const getmmy = asyncHandler(async (req, res) => {
    const data = await Mmy.find({});
    res.send(data);
}
)
const addcustomerdata = asyncHandler(async (req, res) => {

    const { make, model, year, vin, status, pic } = req.body;
    console.log(pic)
    if (!make || !model || !year || !vin || !status) {
        res.status(400);
        throw new Error('Please provide all the details')
    }
    const dataexists = await custData.findOne({ vin })
    if (dataexists && dataexists.status !== "rejected") {
        res.status(401)
        throw new Error("VIN already exits")
    }
    const date = new Date();

    let currentDay = String(date.getDate()).padStart(2, '0');

    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");

    let currentYear = date.getFullYear();

    // we will display the date as DD-MM-YYYY 

    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
    console.log(currentDate)
    const custdata = await custData.create({
        make, model, year, vin, status, Date: currentDate, Pic: pic
    })

    if (custdata) {
        res.status(201).json({
            _id: custdata._id,
            make: custdata.make,
            model: custdata.model,
            year: custdata.year,
            vin: custdata.vin,
            date: currentDate,
            status: custData.status,
            pic: custData.pic
        })
    }
    else {
        res.status(400);
        throw new Error("Problem adding User");
    }
})

const getcustomermmy = asyncHandler(async (req, res) => {
    const data = await custData.find({});
    res.send(data);
}
)

const vehichleStatus = asyncHandler(async (req, res) => {
    const { _id, status } = req.body;
    const updatedStatus = await custData.findByIdAndUpdate(
        _id,
        {
            status: status
        },
        {
            new: true
        }
    )
    if (!updatedStatus) {
        res.status(404);
        throw new Error("Chat not found");
    }
    else {
        res.json(updatedStatus)
    }

})

// const replycomment = () =>{
//     const { _id, comment } = req.body;
// }
module.exports = { addmmy, getmmy, addcustomerdata, getcustomermmy, vehichleStatus }