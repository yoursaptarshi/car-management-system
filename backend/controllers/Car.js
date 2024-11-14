const Car = require('../models/Car');
const cloudinary = require('cloudinary');
const fs = require('fs').promises;
const path = require("path");
exports.createCar = async (req, res) => {
  try {
    const { id,title, description, tags, car_type, company, dealer } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required to create a car.',
      });
    }

    // Ensure images are uploaded
    if (!req.files || !req.files.images) {
      return res.status(400).json({
        success: false,
        message: 'At least one image is required to create a car.',
      });
    }

    // Handle single and multiple images
    const imageFiles = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
    
    // Limit to 10 images
    if (imageFiles.length > 10) {
      return res.status(400).json({
        success: false,
        message: 'You can only upload a maximum of 10 images.',
      });
    }

    // Array to store uploaded images
    const uploadedImages = [];

    // Upload each image to Cloudinary
    for (const image of imageFiles) {
      const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
        folder: 'cars',
      });
      uploadedImages.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    // Create a new car record
    const car = await Car.create({
      id,
      title,
      description,
      images: uploadedImages,
      tags,
      car_type,
      company,
      dealer,
      user: req.user._id, // Assuming req.user is populated by auth middleware
    });
    const tempDir = path.resolve(__dirname, '../tmp');
    await fs.rm(tempDir, { recursive: true, force: true });
    res.status(201).json({
      success: true,
      message: 'Car created successfully',
      car,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteCar = async (req, res) => {
  try {
    const {id} = req.body;  // Take car ID from request body

    // Validate that the ID is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Car ID is required.',
      });
    }

    // Find the car by ID
    const car = await Car.findOne({id});

    // Check if the car exists
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found.',
      });
    }

    // Delete images from Cloudinary
    
    for (const image of car.images) {
      await cloudinary.v2.uploader.destroy(image.public_id);
    }

    // Delete the car from the database
    await car.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Car deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.listCars = async (req, res) => {
  try {
    // Fetch all cars from the database
    const cars = await Car.find();

    // Map over the cars to format the data (only one image, title, and short description)
    const formattedCars = cars.map(car => {
      // Get the first image from the images array
      const image = car.images.length > 0 ? car.images[0].url : null;

      // Shorten the description to 20 words or less
      const shortDescription = car.description
        ? car.description.split(' ').slice(0, 20).join(' ') + (car.description.split(' ').length > 20 ? '...' : '')
        : '';

      return {
        image,
        title: car.title,
        shortDescription,
      };
    });

    // Respond with the formatted list of cars
    res.status(200).json({
      success: true,
      cars: formattedCars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCar = async (req, res) => {
  try {
    const { id } = req.body;  // Get car ID from request body

    // Find the car by ID in the database
    const car = await Car.findOne({id});

    // Check if the car exists
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found.',
      });
    }

    // Respond with the car details
    res.status(200).json({
      success: true,
      car: {
        title: car.title,
        description: car.description,
        images: car.images,  // Includes images with public_id and url
        tags: car.tags,
        car_type: car.car_type,
        company: car.company,
        dealer: car.dealer,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { id, title, description, car_type, company, dealer, tags, images } = req.body;

    // Find the car by ID
    const car = await Car.findOne({id});

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found.',
      });
    }

    // If new images are uploaded, upload them to Cloudinary and update the images array
    let updatedImages = car.images;  // Keep existing images if no new ones are uploaded

    if (images && images.length > 0) {
      // Handle image uploads
      updatedImages = [];
      
      // Limit to a maximum of 10 images
      if (images.length > 10) {
        return res.status(400).json({
          success: false,
          message: 'You can only upload a maximum of 10 images.',
        });
      }

      // Upload each image to Cloudinary
      for (let image of images) {
        const uploadResponse = await cloudinary.v2.uploader.upload(image, {
          folder: 'car_images',
        });

        updatedImages.push({
          public_id: uploadResponse.public_id,
          url: uploadResponse.secure_url,
        });
      }
    }

    // Update the car with the new information
    car.title = title || car.title;
    car.description = description || car.description;
    car.car_type = car_type || car.car_type;
    car.company = company || car.company;
    car.dealer = dealer || car.dealer;
    car.tags = tags || car.tags;
    car.images = updatedImages;

    // Save the updated car details
    await car.save();

    res.status(200).json({
      success: true,
      message: 'Car updated successfully.',
      car: {
        title: car.title,
        description: car.description,
        images: car.images,
        tags: car.tags,
        car_type: car.car_type,
        company: car.company,
        dealer: car.dealer,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};