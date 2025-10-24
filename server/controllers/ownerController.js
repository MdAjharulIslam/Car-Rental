import imagekit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs";

// api to change role
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now you can list cars" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to list car

export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);

    const imageFie = req.file;
    //upload image to imagekit

    const fileBuffer = fs.readFileSync(imageFie.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFie.originalname,
      folder: "/cars",
    });
    //otpimized though imagekit  url transformation

    var optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" }, //width resize
        { quality: "auto" }, //auto compression
        { format: "webp" }, // convert to modern formet
      ],
    });

    const image = optimizedImageUrl;
    await Car.create({ ...car, owner: _id, image });
    res.json({ success: true, message: "Car Added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// APi to list owner car

export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//api to car toggle availability

export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById( carId );

    //chacking is car belong access

    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    car.isAvalible = !car.isAvalible;
    await car.save();

    res.json({ success: true, message: "Availability Toggled" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//api to delete a car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId );

    //chacking is car belong access

    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    car.owner = null;
    car.isAvalible = false;
    await car.save();

    res.json({ success: true, message: "Car Removed" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//api to get dashboard data

export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.json({ success: false, message: "unauthorized" });
    }
    const cars = await Car.find({ owner: _id });
    const bookings = await Booking.find({ owner: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    const pendingBookings = await Booking.find({
      owner: _id,
      status: "pending",
    });
    const completeBookings = await Booking.find({
      owner: _id,
      status: "confirmed",
    });

    //calculate monthly revinew from bookings where status confirmed

    const monthlyRevenue = bookings
      .slice()
      .filter((booking) => booking.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);

      const dashboardData = {
        totalCars:cars.length,
        totalBookings: bookings.length,
        pendingBookings: pendingBookings.length,
        completeBookings: completeBookings.length,
        recentBookings: bookings.slice(0,3),
        monthlyRevenue
      }

      res.json({success: true, dashboardData})


  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};



export const updateUserImage = async (req, res)=>{
  try {
    const {_id} = req.user;

    const imageFie = req.file;
    //upload image to imagekit

    const fileBuffer = fs.readFileSync(imageFie.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFie.originalname,
      folder: "/users",
    });
    //otpimized though imagekit  url transformation

    var optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "400" }, //width resize
        { quality: "auto" }, //auto compression
        { format: "webp" }, // convert to modern formet
      ],
    });

    const image = optimizedImageUrl;

    await User.findByIdAndUpdate(_id, {image})
    res.json({success:true, message:"image Updated"})
  } catch (error) {
      console.log(error.message);
    res.json({ success: false, message: error.message })
  }
}