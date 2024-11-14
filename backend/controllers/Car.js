const Car = require('../models/Car');
const cloudinary = require('cloudinary');

exports.createCar = async (req, res) => {
  try {
    const { title, description, tags, car_type, company, dealer } = req.body;

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
      title,
      description,
      images: uploadedImages,
      tags,
      car_type,
      company,
      dealer,
      user: req.user._id, // Assuming req.user is populated by auth middleware
    });

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
