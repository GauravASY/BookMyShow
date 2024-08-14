import mongoose, { trusted } from "mongoose";
import PlaceModel from "./PlaceModel.js";
import {Users} from "./userModel.js";

const bookingSchema = new mongoose.Schema({
    place : {
        type : mongoose.Schema.Types.ObjectId,
        ref : PlaceModel
    },

    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : Users
    },

    checkIn : {
        type : String,
        required : true
    },
    checkOut : {
        type : String,
        required : true
    },
    guests : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    contact : {
        type : String, 
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    photo : String,
    address : String
})

const BookingModel = mongoose.model('Booking', bookingSchema);

export default BookingModel;