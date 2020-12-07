/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const bcrypt = require('bcrypt');

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const url = require('url');
const jwt = require('jsonwebtoken');

const moment = require('moment');

const { BUCKET_NAME } = process.env;
const s3Storage = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
require('dotenv').config();

const UserSignup = require('../Models/UserSignup');

const Customer = require('../Models/Customer');

const Reviews = require('../Models/Review');

const Orders = require('../Models/Order');

const Restaurant = require('../Models/Restaurant');

const OrderCart = require('../Models/OrderCart');

/*
const multipleUpload = multer({
  storage: multerS3({
    s3: s3Storage,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // eslint-disable-next-line func-names
    // eslint-disable-next-line object-shorthand
    key: function (req, file, cb) {
      console.log(req.body);
      const folderName = 'yelpPrototype-customer-';
      console.log('Multer Called', folderName);
      cb(null, `${folderName}/${Date.now().toString()}${file.originalname}`);
    },
  }),
}).single('file');

*/
// MongoDB Implemented
const customerSignup = async (customer) => {
  const results = {};
  try {
    const user = await UserSignup.findOne({ Email: customer.Email, Role: 'Customer' }).exec();
    if (user) {
      results.Result = 'Email Already Exists';
    } else {
      const hashedPassword = await bcrypt.hash(customer.Password, 10);
      const newUser = new UserSignup({
        ...customer,
        Role: 'Customer',
        Password: hashedPassword,
      });
      const usernew = await newUser.save();
      // let Location = restaurant.Street.concat(', ');
      // Location = Location.concat(restaurant.Zip);
      // const loc = await geo.find(Location);
      const newCustomer = new Customer({
        ...customer,
        CustomerID: usernew._id,
        JoinDate: moment().format(),
      });
      const res = await newCustomer.save();
      if (res) {
        results.Result = 'Customer Created';
      }
    }
  } catch (error) {
    results.Result = 'Network Error';
  }
  return results;
};

// getCustomer Basic Info // MongoDB Implemented
/*
const getCustomerInfo = async (request, response) => {
  try {
    const { _id } = url.parse(request.url, true).query;

    const customer = await Customer.findOne({ CustomerID: _id }).exec();

    const reviewCount = await Reviews.find({ CustomerID: _id }).countDocuments();
    const results = {
      customer,
      reviewCount,
    };

    response.writeHead(200, {
      'Content-Type': 'application/json',
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

*/

// Update Customer profile // MongoDB Implemented
const updateProfile = async (customer) => {
  const results = {};
  try {
    await Customer.updateOne(
      { CustomerID: customer.CustomerID },
      { ...customer },
      async (error) => {
        if (error) {
          // response.writeHead(500, {
          //   'Content-Type': 'text/plain',
          // });
          results.Result = 'Network Error';
        } else {
          // console.log(data);
          // response.writeHead(204, {
          //   'Content-Type': 'text/plain',
          // });
          results.Result = 'Profile Updated Successfully';
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
/*
const uploadCustomerProfilePic = async (req, res) => {
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
// Update Customer Contact Information //MongoDB Implemented
/*
const updateContactInfo = async (request, response) => {
  const { Password, customerInfo } = request.body;

  try {
    const user = await UserSignup.findOne(
      { _id: customerInfo.CustomerID },
      { Password: 1, Role: 1 }
    ).exec();
    let token;
    if (await bcrypt.compare(Password, user.Password)) {
      if (customerInfo.NewEmail !== customerInfo.Email) {
        const payload = {
          _id: customerInfo.CustomerID,
          userrole: user.Role,
          email: customerInfo.NewEmail,
        };

        token = await jwt.sign(payload, process.env.SESSION_SECRET, {
          expiresIn: 1008000,
        });
        UserSignup.updateOne(
          { _id: customerInfo.CustomerID },
          { Email: customerInfo.NewEmail },
          async (error) => {
            if (error) {
              response.writeHead(500, {
                'Content-Type': 'text/plain',
              });
              response.end('Network Error');
            }
          }
        );
      }
      Customer.updateOne(
        { CustomerID: customerInfo.CustomerID },
        { PhoneNo: customerInfo.PhoneNo, Email: customerInfo.NewEmail },
        async (error) => {
          if (error) {
            response.writeHead(500, {
              'Content-Type': 'text/plain',
            });
            response.end('Network Error');
          } else {
            // console.log(data);
            response.writeHead(200, {
              'Content-Type': 'text/plain',
            });
            response.end(`JWT ${token}`);
          }
        }
      );
    } else {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Incorrect Password');
    }
  } catch (error) {
    response.writeHead(500, {
      'Content-Type': 'text/plain',
    });
    response.end('Network error');
  }
  return response;
};
*/
// Generate Order // MongoDB Implemented
const generateOrder = async (order) => {
  // const { RestroId, Price, foodCart, address, deliveryMode, token, userrole } = request.body;
  const results = {};
  try {
    // console.log(order);
    const newOrder = new Orders({
      ...order.order,
      OrderedDate: new Date(),
    });
    const createdOrder = await newOrder.save();
    const orderCart = [...order.orderedMenu];
    const newOrderCart = [];
    for (const item of orderCart) {
      const newItem = { ...item, OrderID: createdOrder._id };
      // newItem.OrderID = createdOrder._id;
      newOrderCart.push(newItem);
    }
    console.log(newOrderCart);
    await OrderCart.insertMany(newOrderCart);
    results.Result = 'Order Created Successfully';
  } catch (error) {
    results.Result = 'Network error';
  }
  return results;
};

// Submit Review //MongoDB Implemented
const submitReview = async (args) => {
  let results = {};
  try {
    const newReview = new Reviews({
      ...args,
      ReviewDate: new Date(),
    });
    await Restaurant.updateOne(
      { RestaurantID: args.RestaurantID },
      { ReviewCounts: args.ReviewCounts, TotalRating: args.TotalRating }
    ).exec();
    results = await newReview.save();
    results.Result = 'Success';
  } catch (error) {
    response.writeHead(500, {
      'Content-Type': 'text/plain',
    });
    results.Result = 'Network error';
  }
  return results;
};

// fetch events fased on filter //MongoDB Implemented
const getAllOrders = async (args) => {
  let OrderList = [];
  try {
    const { CustomerID, selectedPage, sortOrder, filter1, filter2 } = args;

    // let orderCount = 0;
    if (filter1 !== 'All') {
      OrderList = await Orders.find({ CustomerID, OrderType: filter1, DeliveryStatus: filter2 })
        .sort({ OrderedDate: sortOrder })
        // .skip(selectedPage * 3)
        // .limit(3)
        .exec();
      // orderCount = await Orders.find({
      //   CustomerID,
      //   OrderType: filter1,
      //   DeliveryStatus: filter2,
      // }).countDocuments();
    } else {
      OrderList = await Orders.find({ CustomerID })
        .sort({ OrderedDate: sortOrder })
        // .skip(selectedPage * 3)
        // .limit(3)
        .exec();
      // orderCount = await Orders.find({ CustomerID }).countDocuments();
    }

    // response.writeHead(200, {
    //   'Content-Type': 'text/plain',
    // });
    // console.log(OrderList);
    // const results = {
    //   OrderList,
    //   orderCount,
    // };
    // response.end(JSON.stringify(results));
  } catch (error) {
    // response.writeHead(500, {
    //   'Content-Type': 'text/plain',
    // });
    // response.end('Network error');
  }
  return OrderList;
};

module.exports = {
  customerSignup,
  // getCustomerInfo,
  updateProfile,
  // updateContactInfo,
  // uploadCustomerProfilePic,
  generateOrder,
  submitReview,
  getAllOrders,
};
