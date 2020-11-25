/* eslint-disable no-unreachable */
/* eslint-disable no-else-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

const bcrypt = require('bcrypt');

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const url = require('url');
const geocoder = require('google-geocoder');
// const { getUserIdFromToken } = require('../common/loginLogout');

const mysqlConnection = require('../mysqlConnection');
const UserSignup = require('../Models/UserSignup');

const Restaurant = require('../Models/Restaurant');
// const Reviews = require('../Models/Review');
// const Event = require('../Models/Event');

const Orders = require('../Models/Order');

const Appetizer = require('../Models/Appetizer');
const Beverage = require('../Models/Beverage');
const Dessert = require('../Models/Dessert');
const MainCourse = require('../Models/MainCourse');
const Salad = require('../Models/Salad');
const Customer = require('../Models/Customer');
const { key } = require('./config');

const geo = geocoder({
  key,
});

const { BUCKET_NAME } = process.env;
const s3Storage = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
require('dotenv').config();

const multipleUpload = multer({
  storage: multerS3({
    s3: s3Storage,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // eslint-disable-next-line func-names
    // eslint-disable-next-line object-shorthand
    key: function (req, file, cb) {
      const folderName = 'yelpPrototype-restaurant-';
      cb(null, `${folderName}/${Date.now().toString()}${file.originalname}`);
    },
  }),
}).single('file');

// Function to create new restaurant // mongoDbAdded
const signup = async (restaurant) => {
  const results = {};
  try {
    const user = await UserSignup.findOne({ Email: restaurant.Email, Role: 'Restaurant' }).exec();
    if (user) {
      results.Result = 'Email Already Exists';
    } else {
      const hashedPassword = await bcrypt.hash(restaurant.Password, 10);
      const newUser = new UserSignup({
        ...restaurant,
        Role: 'Restaurant',
        Password: hashedPassword,
      });
      const usernew = await newUser.save();
      // let Location = restaurant.Street.concat(', ');
      // Location = Location.concat(restaurant.Zip);
      // const loc = await geo.find(Location);
      const newRestaurant = new Restaurant({
        ...restaurant,
        RestaurantID: usernew._id,
        // Latitude: loc[0].location.lat,
        // Longitude: loc[0].location.lng,
      });
      const res = await newRestaurant.save();
      if (res) {
        results.Result = 'Restaurant Created';
      }
    }
  } catch (e) {
    // response.writeHead(500, {
    //   'Content-Type': 'text/plain',
    // });
    results.Result = 'Network Error';
  }
  return results;
};

// Get Complete Restaurant, // mongoDbAdded
// const getRestaurantInfo = async (RestaurantID) => {
//   let results = {};
//   try {
//     const restaurant = await Restaurant.findOne({ RestaurantID }).exec();

//     // const reviewCount = await Reviews.find({ RestaurantID }).countDocuments();
//     results = restaurant;
//   } catch (error) {
//     results.ErrorResult = 'Networ Error';
//   }
//   return results;
// };

// Update Restaurant Profile // mongoDbAdded
const updateRestaurantProfile = async (restaurant) => {
  const results = {};
  try {
    await Restaurant.updateOne({ RestaurantID: restaurant.RestaurantID }, { ...restaurant });
    results.Result = 'Profile Updated Successfully';
    // Restaurant.updateOne(
    //   { RestaurantID: restaurant.RestaurantID },
    //   { ...restaurant },
    //   async (error) => {
    //     if (error) {
    //       // response.writeHead(500, {
    //       //   'Content-Type': 'text/plain',
    //       // });
    //       results.Result = 'Network Error';
    //     } else {
    //       // response.writeHead(200, {
    //       //   'Content-Type': 'text/plain',
    //       // });
    //       results.Result = 'Profile Updated Successfully';
    //     }
    //   }
    // );
  } catch (error) {
    // response.writeHead(401, {
    //   'Content-Type': 'text/plain',
    // });
    results.Result = 'Network Error';
  }
  return results;
};

/*
// upload restaurant profile to s3 bucket // mongoDbAdded
const uploadRestaurantProfilePic = async (req, res) => {
  try {
    multipleUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.json({ status: 400, error: err.message });
      } else if (err) {
        res.json({ status: 400, error: err.message });
      } else {
        Restaurant.updateOne(
          { RestaurantID: req.body },
          { ImageURL: req.file.location },
          async (error) => {
            if (error) {
              res.writeHead(500, {
                'Content-Type': 'text/plain',
              });
              res.end('Network Error');
            } else {
              res.writeHead(200, {
                'Content-Type': 'text/plain',
              });
              res.end(req.file.location);
            }
          }
        );
      }
    });
  } catch (error) {
    res.writeHead(401, {
      'Content-Type': 'text/plain',
    });
    res.end('Network Error');
  }
  return res;
};

// upload restaurant profile to only s3 bucket // mongoDbAdded
const uploadPicToMulter = async (req, res) => {
  try {
    // console.log(req.body);
    multipleUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.json({ status: 400, error: err.message });
      } else if (err) {
        res.json({ status: 400, error: err.message });
      } else {
        // console.log(req.file.location);
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        // console.log('data:', data);
        res.end(req.file.location);
      }
    });
  } catch (error) {
    res.writeHead(401, {
      'Content-Type': 'text/plain',
    });
    res.end('Network Error');
  }
  return res;
};

*/
// MongoDb Implemented
/*
const fetchMenu = async (request, response) => {
  const { RestaurantID, selectedPage, category } = url.parse(request.url, true).query;
  try {
    let Food = null;
    switch (category) {
      case 'APPETIZERS':
        Food = Appetizer;
        break;
      case 'SALADS':
        Food = Salad;
        break;
      case 'MAIN_COURSE':
        Food = MainCourse;
        break;
      case 'BEVERAGES':
        Food = Beverage;
        break;
      case 'DESSERTS':
        Food = Dessert;
        break;
      default:
        break;
    }
    const allFood = await Food.find({ RestaurantID })
      .limit(2)
      .skip(selectedPage * 2)
      .exec();
    const foodCount = await Food.find({ RestaurantID }).countDocuments();
    const results = {
      allFoods: allFood,
      foodCount,
    };

    response.writeHead(200, {
      'Content-Type': 'application/json',
    });
    response.end(JSON.stringify(results));
    // console.log(results);
    //   }
    // });
  } catch (error) {
    response.writeHead(500, {
      'Content-Type': 'text/plain',
    });
    response.end('Cuisine Data Fetch Failed');
  }
  return response;
};
*/
// MongoDb Implemented
/*
const uploadFoodImage = async (req, res) => {
  try {
    multipleUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.json({ status: 400, error: err.message });
      } else if (err) {
        res.json({ status: 400, error: err.message });
      } else {
        // console.log(req.file.location);

        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.end(req.file.location);
      }
    });
  } catch (error) {
    res.writeHead(401, {
      'Content-Type': 'text/plain',
    });
    res.end('Network Error');
  }
  return res;
};

*/
// MongoDb Implemented
const insertFood = async (food) => {
  const results = {};
  try {
    let newFood = null;
    switch (food.Category) {
      case 'APPETIZERS':
        newFood = new Appetizer({
          ...food,
        });
        break;
      case 'SALADS':
        newFood = new Salad({
          ...food,
        });
        break;
      case 'MAIN_COURSE':
        newFood = new MainCourse({
          ...food,
        });
        break;
      case 'BEVERAGES':
        newFood = new Beverage({
          ...food,
        });
        break;
      case 'DESSERTS':
        newFood = new Dessert({
          ...food,
        });
        break;
      default:
        break;
    }
    const nfood = await newFood.save();
    if (nfood) {
      results.Result = 'Food Item Created Successfully!!!';
    }
  } catch (error) {
    // response.writeHead(500, {
    //   'Content-Type': 'text/plain',
    // });
    results.Result = 'Network Error';
  }
  return results;
};

// MongoDb Implemented
const deleteFoodItem = async (food) => {
  const { _id } = food;
  const results = {};
  try {
    let FoodCategory = null;
    switch (food.Category) {
      case 'APPETIZERS':
        FoodCategory = Appetizer;
        break;
      case 'SALADS':
        FoodCategory = Salad;
        break;
      case 'MAIN_COURSE':
        FoodCategory = MainCourse;
        break;
      case 'BEVERAGES':
        FoodCategory = Beverage;
        break;
      case 'DESSERTS':
        FoodCategory = Dessert;
        break;
      default:
        break;
    }
    await FoodCategory.findByIdAndDelete({ _id }, (error) => {
      if (error) {
        // response.writeHead(500, {
        //   'Content-Type': 'text/plain',
        // });
        results.Result = error.message;
      } else {
        // response.writeHead(200, {
        //   'Content-Type': 'text/plain',
        // });
        results.Result = 'Delete Successfull!!!';
      }
    });
  } catch (error) {
    // response.writeHead(500, {
    //   'Content-Type': 'text/plain',
    // });
    results.Result = 'Network Error';
  }
  return results;
};

// Update FoodItem // MongoDb Implemented
const updateFoodItem = async (food) => {
  const results = {};
  try {
    let FoodCategory = null;
    switch (food.Category) {
      case 'APPETIZERS':
        FoodCategory = Appetizer;
        break;
      case 'SALADS':
        FoodCategory = Salad;
        break;
      case 'MAIN_COURSE':
        FoodCategory = MainCourse;
        break;
      case 'BEVERAGES':
        FoodCategory = Beverage;
        break;
      case 'DESSERTS':
        FoodCategory = Dessert;
        break;
      default:
        break;
    }
    await FoodCategory.updateOne({ _id: food._id }, { ...food }, async (error) => {
      if (error) {
        // response.writeHead(500, {
        //   'Content-Type': 'text/plain',
        // });
        results.Result = 'Network Error';
      } else {
        // console.log(data);
        // response.writeHead(200, {
        //   'Content-Type': 'text/plain',
        // });
        results.Result = 'Food Item Updated Successfully';
      }
    });
  } catch (error) {
    // response.writeHead(401, {
    //   'Content-Type': 'text/plain',
    // });
    results.Result = 'Network Error';
  }
  return results;
};

// fetch Reviews // MongoDb Implemented
/*
const fetchReviews = async (request, response) => {
  const { RestaurantID, selectedPage } = url.parse(request.url, true).query;
  try {
    const ReviewsList = await Reviews.find({ RestaurantID })
      .limit(4)
      .skip(selectedPage * 4)
      .exec();
    const reviewCount = await Reviews.find({ RestaurantID }).countDocuments();
    const results = {
      ReviewsList,
      reviewCount,
    };

    response.writeHead(200, {
      'Content-Type': 'application/json',
    });
    response.end(JSON.stringify(results));
  } catch (error) {
    response.writeHead(500, {
      'Content-Type': 'text/plain',
    });
    response.end('Review Fetch Failed');
  }
  return response;
};
*/
// fetch order depending on filter value // MongoDb Implemented

const getOrderDetails = async (args) => {
  const { RestaurantID, selectedPage, sortValue } = args;
  let result = {};
  try {
    let filterArray = [];
    switch (sortValue) {
      case 'New':
        filterArray = [
          { DeliveryStatus: 'Order Received' },
          { DeliveryStatus: 'Preparing' },
          { DeliveryStatus: 'On the way' },
          { DeliveryStatus: 'Pick up Ready' },
        ];
        break;
      case 'Delivered':
        filterArray = [{ DeliveryStatus: 'Delivered' }, { DeliveryStatus: 'Picked up' }];
        break;
      case 'Canceled':
        filterArray = [{ DeliveryStatus: 'Canceled' }];
        break;
      default:
        filterArray = [
          { DeliveryStatus: 'Order Received' },
          { DeliveryStatus: 'Preparing' },
          { DeliveryStatus: 'On the way' },
          { DeliveryStatus: 'Pick up Ready' },
          { DeliveryStatus: 'Delivered' },
          { DeliveryStatus: 'Canceled' },
        ];
        break;
    }
    result = await Orders.find({ $and: [{ RestaurantID }, { $or: filterArray }] })
      // .limit(3)
      // .skip(selectedPage * 3)
      .exec();
    // const orderCount = await Orders.find({
    //   $and: [{ RestaurantID }, { $or: filterArray }],
    // }).countDocuments();
    // const results = {
    //   OrderList,
    //   orderCount,
    // };

    // response.writeHead(200, {
    //   'Content-Type': 'application/json',
    // });
    // response.end(JSON.stringify(results));
  } catch (error) {
    // response.writeHead(500, {
    //   'Content-Type': 'text/plain',
    // });
    result.Result = 'Review Fetch Failed';
  }
  return result;
};

// Update Deliver Status // MongoDb Implemented
const updateDeliveryStatus = async (order) => {
  const results = {};
  try {
    await Orders.updateOne(
      { $and: [{ _id: order._id }, { RestaurantID: order.RestaurantID }] },
      { ...order },
      async (error) => {
        if (error) {
          // response.writeHead(500, {
          //   'Content-Type': 'text/plain',
          // });
          results.Result = 'Network Error';
        } else {
          // console.log(data);
          // response.writeHead(200, {
          //   'Content-Type': 'text/plain',
          // });
          results.Result = ('Order statuse succesfully updated to', order.DeliveryStatus);
        }
      }
    );
  } catch (error) {
    // response.writeHead(401, {
    //   'Content-Type': 'text/plain',
    // });
    results.Result = 'Network Error';
  }
  return results;
};

// Get Contact Information
const getCustomerCompleteProfileForRestaurant = async (request, response) => {
  const { CustomerID } = url.parse(request.url, true).query;
  try {
    const customer = await Customer.findOne(
      { CustomerID },
      { RegisteredEvents: 0, ReviewCount: 0 }
    );
    const results = {
      customer,
    };
    response.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    response.end(JSON.stringify(results));
  } catch (error) {
    response.writeHead(401, {
      'Content-Type': 'text/plain',
    });
    response.end('Network Error');
  }
  return response;
};

module.exports = {
  signup,
  // getRestaurantInfo,
  updateRestaurantProfile,
  // fetchMenu,
  insertFood,
  deleteFoodItem,
  updateFoodItem,
  // fetchReviews,
  getOrderDetails,
  updateDeliveryStatus,
  // uploadRestaurantProfilePic,
  // uploadPicToMulter,
  // uploadFoodImage,
  getCustomerCompleteProfileForRestaurant,
};
