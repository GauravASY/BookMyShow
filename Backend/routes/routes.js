import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { Users } from "../Models/userModel.js";
import download from 'image-downloader';
export const router = express.Router();
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import multer from "multer";
import fs from 'fs';
import PlaceModel from "../Models/PlaceModel.js";
import BookingModel from "../Models/BookingModel.js";

const uploadingPhotos = multer({dest : "Uploads/"});


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.post(
  "/register",
  body("username", "username too small").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password", "password too weak").isLength({ min: 5 }),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.json({ status: false, msg: result.errors[0].msg });
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await Users.create({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });

        return res.json({ status: true, user });
      }
    } catch (error) {
      return res.json({ status: false, msg: error });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ status: false, msg: "User not Registered" });
    } else {
      const passCheck = await bcrypt.compare(req.body.password, user.password);
      if (passCheck) {
        return res.json({ status: true, user });
      } else {
        return res.json({ status: false, msg: "Incorrect Password" });
      }
    }
  } catch (error) {
    console.log("in catch");
    return res.json({ status: false, msg: error[0] });
  }
});


router.post("/upload", async (req,res)=>{
  const {link} = req.body;
  const newName = Date.now() + '.jpg';
  const location = path.join(__dirname , '..' , 'Uploads');
   await download.image({
    url : link,
    dest : location+'/'+newName
  })
  res.json(newName);
})

router.post("/uploadViaStorage",uploadingPhotos.array('photos', 100) ,(req,res)=>{
    const files = req.files;
    const uploadedFiles = [];
    for(let i = 0; i< files.length; i++){
      const {originalname, path} = files[i];
      let data = originalname.split('.');
      const ext = data[data.length -1];
      const newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace(`Uploads\\`, ''));
    }
     res.json(uploadedFiles);
})


router.post("/saveForm",async (req,res)=>{

 const placeDoc =  await PlaceModel.create({
    owner : req.body.userData._id,
    title : req.body.data.title,
    address : req.body.data.address,
    photos : req.body.data.addedPhotos,
    description : req.body.data.description,
    perks : req.body.data.perks,
    extraInfo : req.body.data.extraInfo,
    checkIn : req.body.data.checkIn,
    checkOut : req.body.data.checkOut,
    maxGuest : req.body.data.maxGuest,
    price: req.body.data.price
  })

  res.json({success : true, doc : placeDoc});
})

router.put("/updateForm", async(req, res)=>{
  const placeDoc = await PlaceModel.findById(req.body.placeID.id);

  if(placeDoc.owner.toString() === req.body.userData._id){
    placeDoc.set({
      title: req.body.data.title,
      address: req.body.data.address,
      photos: req.body.data.addedPhotos,
      description: req.body.data.description,
      perks: req.body.data.perks,
      extraInfo: req.body.data.extraInfo,
      checkIn: req.body.data.checkIn,
      checkOut: req.body.data.checkOut,
      maxGuest: req.body.data.maxGuest,
      price: req.body.data.price
    })
    await placeDoc.save();
  }
  res.json({success : true});
})

router.post("/places", async (req,res)=>{
  const places = await PlaceModel.find({owner : req.body.id});
  res.json(places);
})

router.post("/placeEdit", async(req, res)=>{
  const places = await PlaceModel.findById( req.body.id.id);
  res.json(places);
})

router.get("/allPlaces", async (req, res)=>{
  const placesDoc = await PlaceModel.find();
  res.json(placesDoc);
})

router.post("/currentPlace", async(req, res)=>{
  const placeDoc = await PlaceModel.findById(req.body.id);
  res.json(placeDoc);
})

router.post("/makeBooking", async(req,res)=>{
  const placeDoc = await BookingModel.create({
    place : req.body.place,
    owner : req.body.owner,
    checkIn : req.body.checkIn,
    checkOut :req.body.checkOut,
    guests : req.body.guests,
    name: req.body.name,
    contact : req.body.contact, 
    price : req.body.price,
    photo : req.body.photo,
    address : req.body.address
  })
  res.json(placeDoc)
})

router.post("/getBookings", async (req, res)=>{
  const bookingDoc = await BookingModel.find({owner : req.body.owner});
  res.json(bookingDoc);
})