import mongoose from 'mongoose';
import { Users } from './userModel.js';

const placeSchema = new mongoose.Schema({
    owner : {
        type :mongoose.Schema.Types.ObjectId,
        ref : Users,
    },
    title : String,
    address : String, 
    photos : [String],
    description : String,
    perks : [String],
    extraInfo : String, 
    checkIn : Number,
    checkOut : Number,
    maxGuest : Number,
    price : Number,
});

const PlaceModel = mongoose.model('Places', placeSchema);

export default PlaceModel;