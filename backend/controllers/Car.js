const Car = require('../models/Car');
const cloudinary = require('cloudinary');
const fs = require('fs').promises;
const path = require("path");
exports.createCar = async (req, res) => {
  try {
    

    const { title, description, tags, car_type, company, dealer } = req.body;
    const id = Math.ceil(Math.random()*100000000);
    
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required to create a car.',
      });
    }

    

    if (!req.files || !req.files.images) {
      return res.status(400).json({
        success: false,
        message: 'At least one image is required to create a car.',
      });
    }

    
    const imageFiles = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
    
    
    if (imageFiles.length > 10) {
      return res.status(400).json({
        success: false,
        message: 'You can only upload a maximum of 10 images.',
      });
    }

    
    const uploadedImages = [];

   
    for (const image of imageFiles) {
      const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
        folder: 'cars',
      });
      uploadedImages.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    
    const car = await Car.create({
      id,
      title,
      description,
      images: uploadedImages,
      tags,
      car_type,
      company,
      dealer,
      user: req.user._id
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
    const {id} = req.body;  

    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Car ID is required.',
      });
    }

   
    const car = await Car.findOne({id});

   
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found.',
      });
    }

    
    
    for (const image of car.images) {
      await cloudinary.v2.uploader.destroy(image.public_id);
    }

    
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
    
    const cars = await Car.find();

    
    const formattedCars = cars.map(car => {
     
      const image = car.images.length > 0 ? car.images[0].url : null;

      
      const shortDescription = car.description
        ? car.description.split(' ').slice(0, 20).join(' ') + (car.description.split(' ').length > 20 ? '...' : '')
        : '';

      return {
        id:car.id,
        image,
        title: car.title,
        shortDescription,
      };
    });

    
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
    
    const { id } = req.body;  

    
    const car = await Car.findOne({id});

    
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

exports.updateCar = async (req, res) => {
  try {
    const { id, title, description, car_type, company, dealer, tags, images } = req.body;

    
    const car = await Car.findOne({id});

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found.',
      });
    }

    
    let updatedImages = car.images;  

    if (images && images.length > 0) {
      
      updatedImages = [];
      
      
      if (images.length > 10) {
        return res.status(400).json({
          success: false,
          message: 'You can only upload a maximum of 10 images.',
        });
      }

      
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

    
    car.title = title || car.title;
    car.description = description || car.description;
    car.car_type = car_type || car.car_type;
    car.company = company || car.company;
    car.dealer = dealer || car.dealer;
    car.tags = tags || car.tags;
    car.images = updatedImages;

    
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