/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
const graphql = require('graphql');

const { GraphQLError } = require('graphql');
const bcrypt = require('bcrypt');
const GraphQLLong = require('graphql-type-long');
const restaurant = require('../Models/Restaurant');

const customer = require('../Models/Customer');

const order = require('../Models/Order');

const review = require('../Models/Review');
const appetizer = require('../Models/Appetizer');
const beverage = require('../Models/Beverage');
const dessert = require('../Models/Dessert');
const mainCourse = require('../Models/MainCourse');
const salad = require('../Models/Salad');
const orderCart = require('../Models/OrderCart');
const country = require('../Models/Country');
const {
  getSignupMasterData,
  getSearchStrings,
  fetchRestaurantResults,
  fetchRestaurantProfileForCustomer,
} = require('../staticTables/staticTableFetch');

const {
  signup,
  updateRestaurantProfile,
  insertFood,
  deleteFoodItem,
  updateFoodItem,
  updateDeliveryStatus,
  getOrderDetails,
} = require('../restaurant/restaurantProfile');

const {
  customerSignup,
  updateProfile,
  generateOrder,
  submitReview,
  getAllOrders,
} = require('../customer/customerProfile');

const { login } = require('../common/loginLogout');

const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLFloat,
} = graphql;

const UserSignupType = new GraphQLObjectType({
  name: 'UserSignupType',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    Email: {
      type: GraphQLString,
    },
    Password: {
      type: GraphQLString,
    },
    Role: {
      type: GraphQLString,
    },
    restaurant: {
      type: RestaurantType,
      resolve(parent, args) {
        return restaurant.findOne({ RestaurantID: parent._id }).exec();
      },
    },
    customer: {
      type: CustomerType,
      resolve(parent, args) {
        return customer.findOne({ CustomerID: parent._id }).exec();
      },
    },
    Result: {
      type: GraphQLString,
    },
  }),
});

const CustomerType = new GraphQLObjectType({
  name: 'CustomerType',
  fields: () => ({
    CustomerID: {
      type: GraphQLID,
    },
    FirstName: {
      type: GraphQLString,
    },
    LastName: {
      type: GraphQLString,
    },
    Gender: {
      type: GraphQLString,
    },
    NickName: {
      type: GraphQLString,
    },
    DOB: {
      type: GraphQLString,
    },
    Email: {
      type: GraphQLString,
    },
    CountryName: {
      type: GraphQLString,
    },
    StateName: {
      type: GraphQLString,
    },
    City: {
      type: GraphQLString,
    },
    Zip: {
      type: GraphQLInt,
    },
    Street: {
      type: GraphQLString,
    },
    PhoneNo: {
      type: GraphQLLong,
    },
    CountryCode: {
      type: GraphQLInt,
    },
    Headline: {
      type: GraphQLString,
    },
    ILove: {
      type: GraphQLString,
    },
    ImageURL: {
      type: GraphQLString,
    },
    FindMeIn: {
      type: GraphQLString,
    },
    Website: {
      type: GraphQLString,
    },
    JoinDate: {
      type: GraphQLString,
    },
    ReviewCount: {
      type: GraphQLInt,
    },
    Order: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return order.find({ CustomerID: parent.CustomerID }).exec();
      },
    },
    Review: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return review.find({ CustomerID: parent.CustomerID }).exec();
      },
    },
  }),
});

const RestaurantType = new GraphQLObjectType({
  name: 'RestaurantType',
  fields: () => ({
    RestaurantID: {
      type: GraphQLID,
    },
    Name: {
      type: GraphQLString,
    },
    Email: {
      type: GraphQLString,
    },
    CountryName: {
      type: GraphQLString,
    },
    StateName: {
      type: GraphQLString,
    },
    City: {
      type: GraphQLString,
    },
    Zip: {
      type: GraphQLInt,
    },
    Street: {
      type: GraphQLString,
    },
    PhoneNo: {
      type: GraphQLLong,
    },
    CountryCode: {
      type: GraphQLInt,
    },
    OpeningTime: {
      type: GraphQLString,
    },
    ClosingTime: {
      type: GraphQLString,
    },
    ImageURL: {
      type: GraphQLString,
    },
    CurbsidePickup: {
      type: GraphQLBoolean,
    },
    DineIn: {
      type: GraphQLBoolean,
    },
    YelpDelivery: {
      type: GraphQLBoolean,
    },
    Latitude: {
      type: GraphQLString,
    },
    Longitude: {
      type: GraphQLString,
    },
    ReviewCounts: {
      type: GraphQLInt,
    },
    TotalRating: {
      type: GraphQLInt,
    },
    Appetizer: {
      type: new GraphQLList(AppetizerType),
      resolve(parent, args) {
        return appetizer.find({ RestaurantID: parent.RestaurantID }).exec();
      },
    },
    Beverage: {
      type: new GraphQLList(BeverageType),
      resolve(parent, args) {
        return beverage.find({ RestaurantID: parent.RestaurantID }).exec();
      },
    },
    Dessert: {
      type: new GraphQLList(DessertType),
      resolve(parent, args) {
        return dessert.find({ RestaurantID: parent.RestaurantID }).exec();
      },
    },
    MainCourse: {
      type: new GraphQLList(MainCourseType),
      resolve(parent, args) {
        return mainCourse.find({ RestaurantID: parent.RestaurantID }).exec();
      },
    },
    Salad: {
      type: new GraphQLList(SaladType),
      resolve(parent, args) {
        return salad.find({ RestaurantID: parent.RestaurantID }).exec();
      },
    },
    Order: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return order.find({ RestaurantID: parent.RestaurantID }).exec();
      },
    },
    Review: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return review.find({ RestaurantID: parent.RestaurantID }).exec();
      },
    },
    ErrorResult: {
      type: GraphQLString,
    },
  }),
});

const AppetizerType = new GraphQLObjectType({
  name: 'AppetizerType',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    RestaurantID: {
      type: GraphQLString,
    },
    FoodName: {
      type: GraphQLString,
    },
    MainIngredients: {
      type: GraphQLString,
    },
    Cuisine: {
      type: GraphQLString,
    },
    Description: {
      type: GraphQLString,
    },
    ImageUrl: {
      type: GraphQLString,
    },
    Price: {
      type: GraphQLFloat,
    },
  }),
});

const BeverageType = new GraphQLObjectType({
  name: 'BeverageType',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    RestaurantID: {
      type: GraphQLString,
    },
    FoodName: {
      type: GraphQLString,
    },
    MainIngredients: {
      type: GraphQLString,
    },
    Cuisine: {
      type: GraphQLString,
    },
    Description: {
      type: GraphQLString,
    },
    ImageUrl: {
      type: GraphQLString,
    },
    Price: {
      type: GraphQLFloat,
    },
  }),
});

const DessertType = new GraphQLObjectType({
  name: 'DessertType',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    RestaurantID: {
      type: GraphQLString,
    },
    FoodName: {
      type: GraphQLString,
    },
    MainIngredients: {
      type: GraphQLString,
    },
    Cuisine: {
      type: GraphQLString,
    },
    Description: {
      type: GraphQLString,
    },
    ImageUrl: {
      type: GraphQLString,
    },
    Price: {
      type: GraphQLFloat,
    },
  }),
});

const MainCourseType = new GraphQLObjectType({
  name: 'MainCourseType',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    RestaurantID: {
      type: GraphQLString,
    },
    FoodName: {
      type: GraphQLString,
    },
    MainIngredients: {
      type: GraphQLString,
    },
    Cuisine: {
      type: GraphQLString,
    },
    Description: {
      type: GraphQLString,
    },
    ImageUrl: {
      type: GraphQLString,
    },
    Price: {
      type: GraphQLFloat,
    },
  }),
});

const SaladType = new GraphQLObjectType({
  name: 'SaladType',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    RestaurantID: {
      type: GraphQLString,
    },
    FoodName: {
      type: GraphQLString,
    },
    MainIngredients: {
      type: GraphQLString,
    },
    Cuisine: {
      type: GraphQLString,
    },
    Description: {
      type: GraphQLString,
    },
    ImageUrl: {
      type: GraphQLString,
    },
    Price: {
      type: GraphQLFloat,
    },
  }),
});

const OrderType = new GraphQLObjectType({
  name: 'OrderType',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    CustomerID: {
      type: GraphQLString,
    },
    Address: {
      type: GraphQLString,
    },
    CustomerName: {
      type: GraphQLString,
    },
    CustomerImageUrl: {
      type: GraphQLString,
    },
    RestaurantID: {
      type: GraphQLString,
    },
    RestaurantName: {
      type: GraphQLString,
    },
    OrderedDate: {
      type: GraphQLString,
    },
    OrderType: {
      type: GraphQLString,
    },
    DeliveryStatus: {
      type: GraphQLString,
    },
    DeliverStatusID: {
      type: GraphQLInt,
    },
    Bill: {
      type: GraphQLFloat,
    },
    OrderCart: {
      type: new GraphQLList(OrderCartType),
      resolve(parent, args) {
        return orderCart.find({ OrderID: parent._id }).exec();
      },
    },
  }),
});

const OrderInputType = new GraphQLInputObjectType({
  name: 'OrderInputType',
  fields: () => ({
    CustomerID: {
      type: GraphQLString,
    },
    Address: {
      type: GraphQLString,
    },
    CustomerName: {
      type: GraphQLString,
    },
    CustomerImageUrl: {
      type: GraphQLString,
    },
    RestaurantID: {
      type: GraphQLString,
    },
    RestaurantName: {
      type: GraphQLString,
    },
    OrderedDate: {
      type: GraphQLString,
    },
    OrderType: {
      type: GraphQLString,
    },
    DeliveryStatus: {
      type: GraphQLString,
    },
    DeliverStatusID: {
      type: GraphQLInt,
    },
    Bill: {
      type: GraphQLFloat,
    },
  }),
});

const OrderCartType = new GraphQLObjectType({
  name: 'OrderCartType',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    FoodName: {
      type: GraphQLString,
    },
    MenuCategory: {
      type: GraphQLString,
    },
    Quantity: {
      type: GraphQLInt,
    },
    Price: {
      type: GraphQLFloat,
    },
  }),
});

const OrderCartInputType = new GraphQLInputObjectType({
  name: 'OrderCartInputType',
  fields: () => ({
    FoodName: {
      type: GraphQLString,
    },
    MenuCategory: {
      type: GraphQLString,
    },
    Quantity: {
      type: GraphQLInt,
    },
    Price: {
      type: GraphQLFloat,
    },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: 'ReviewType',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    RestaurantID: {
      type: GraphQLString,
    },
    Rating: {
      type: GraphQLInt,
    },
    CustomerID: {
      type: GraphQLString,
    },
    CustomerName: {
      type: GraphQLString,
    },
    CustomerAddr: {
      type: GraphQLString,
    },
    Description: {
      type: GraphQLString,
    },
    ImageUrl: {
      type: GraphQLString,
    },
    ReviewDate: {
      type: GraphQLString,
    },
  }),
});

const CountryType = new GraphQLObjectType({
  name: 'CountryType',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    Name: {
      type: GraphQLString,
    },
    CountryCode: {
      type: GraphQLInt,
    },
  }),
});

const CusinieType = new GraphQLObjectType({
  name: 'CusinieType',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    CuisineName: {
      type: GraphQLString,
    },
  }),
});

const GenderType = new GraphQLObjectType({
  name: 'GenderType',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    GenderType: {
      type: GraphQLString,
    },
  }),
});

const StateType = new GraphQLObjectType({
  name: 'StateType',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    Name: {
      type: GraphQLString,
    },
  }),
});

const StaticType = new GraphQLObjectType({
  name: 'StaticType',
  fields: () => ({
    Country: {
      type: new GraphQLList(CountryType),
    },
    Cuisine: {
      type: new GraphQLList(CusinieType),
    },
    Gender: {
      type: new GraphQLList(GenderType),
    },
    State: {
      type: new GraphQLList(StateType),
    },
  }),
});

const ResultType = new GraphQLObjectType({
  name: 'ResultType',
  fields: () => ({
    Result: {
      type: GraphQLString,
    },
  }),
});

const FoodType = new GraphQLObjectType({
  name: 'FoodType',
  fields: () => ({
    Appetizer: {
      type: new GraphQLList(AppetizerType),
    },
    Beverage: {
      type: new GraphQLList(BeverageType),
    },
    Dessert: {
      type: new GraphQLList(DessertType),
    },
    MainCourse: {
      type: new GraphQLList(MainCourseType),
    },
    Salad: {
      type: new GraphQLList(SaladType),
    },
  }),
});

const SearchStringType = new GraphQLObjectType({
  name: 'SearchStringType',
  fields: () => ({
    NameLocation: {
      type: new GraphQLList(NameLocationType),
    },
    FoodItemsStrings: {
      type: new GraphQLList(FoodItemsStringsType),
    },
    Result: {
      type: GraphQLString,
    },
  }),
});

const NameLocationType = new GraphQLObjectType({
  name: 'NameLocationType',
  fields: () => ({
    Name: {
      type: GraphQLString,
    },
    location: {
      type: GraphQLString,
    },
  }),
});

const FoodItemsStringsType = new GraphQLObjectType({
  name: 'FoodItemsStringsType',
  fields: () => ({
    FoodName: {
      type: GraphQLString,
    },
    Cuisine: {
      type: GraphQLString,
    },
  }),
});

const RestaurantResultType = new GraphQLObjectType({
  name: 'RestaurantResultType',
  fields: () => ({
    restaurantList: {
      type: new GraphQLList(RestaurantType),
    },
    restaurantCount: {
      type: GraphQLString,
    },
    Result: {
      type: GraphQLString,
    },
  }),
});

// root query for fetching data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    signupMasterData: {
      type: StaticType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        console.log('get static data');
        // return country.find();
        const result = getSignupMasterData();
        return result;
      },
    },

    getRestaurantInfo: {
      type: RestaurantType,
      args: {
        RestaurantID: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return restaurant.findOne({ RestaurantID: args.RestaurantID }).exec();
      },
    },

    getSearchStringsQuery: {
      type: SearchStringType,
      args: {
        RestaurantID: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return getSearchStrings();
      },
    },

    getRestaurantResultQuery: {
      type: RestaurantResultType,
      args: {
        filter: {
          type: GraphQLString,
        },
        searchString: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return fetchRestaurantResults(args);
      },
    },

    getCustomerInfo: {
      type: CustomerType,
      args: {
        CustomerID: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return customer.findOne({ CustomerID: args.CustomerID }).exec();
      },
    },

    getAllCustomerOrders: {
      type: new GraphQLList(OrderType),
      args: {
        CustomerID: {
          type: GraphQLString,
        },
        sortOrder: {
          type: GraphQLInt,
        },
        filter1: {
          type: GraphQLString,
        },
        filter2: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return getAllOrders(args);
      },
    },

    getRestaurantOrders: {
      type: new GraphQLList(OrderType),
      args: {
        RestaurantID: {
          type: GraphQLString,
        },
        sortValue: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return getOrderDetails(args);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    restaurantSignup: {
      type: ResultType,
      args: {
        Email: {
          type: GraphQLString,
        },
        Password: {
          type: GraphQLString,
        },
        Role: {
          type: GraphQLString,
        },
        Name: {
          type: GraphQLString,
        },
        CountryName: {
          type: GraphQLString,
        },
        StateName: {
          type: GraphQLString,
        },
        City: {
          type: GraphQLString,
        },
        Zip: {
          type: GraphQLInt,
        },
        Street: {
          type: GraphQLString,
        },
        PhoneNo: {
          type: GraphQLLong,
        },
        CountryCode: {
          type: GraphQLInt,
        },
      },
      resolve(parent, args) {
        return signup(args);
      },
    },
    // testing remaining
    updateRestaurant: {
      type: ResultType,
      args: {
        RestaurantID: {
          type: GraphQLID,
        },
        Name: {
          type: GraphQLString,
        },
        Email: {
          type: GraphQLString,
        },
        CountryName: {
          type: GraphQLString,
        },
        StateName: {
          type: GraphQLString,
        },
        City: {
          type: GraphQLString,
        },
        Zip: {
          type: GraphQLInt,
        },
        Street: {
          type: GraphQLString,
        },
        PhoneNo: {
          type: GraphQLLong,
        },
        CountryCode: {
          type: GraphQLInt,
        },
        OpeningTime: {
          type: GraphQLString,
        },
        ClosingTime: {
          type: GraphQLString,
        },
        ImageURL: {
          type: GraphQLString,
        },
        CurbsidePickup: {
          type: GraphQLBoolean,
        },
        DineIn: {
          type: GraphQLBoolean,
        },
        YelpDelivery: {
          type: GraphQLBoolean,
        },
        Latitude: {
          type: GraphQLString,
        },
        Longitude: {
          type: GraphQLString,
        },
        ReviewCounts: {
          type: GraphQLInt,
        },
        TotalRating: {
          type: GraphQLInt,
        },
      },
      resolve(parent, args) {
        // restaurant.updateOne({ RestaurantID: args.RestaurantID }, { ...args });
        return updateRestaurantProfile(args);
      },
    },

    insertFood: {
      type: ResultType,

      args: {
        RestaurantID: {
          type: GraphQLString,
        },
        FoodName: {
          type: GraphQLString,
        },
        MainIngredients: {
          type: GraphQLString,
        },
        Cuisine: {
          type: GraphQLString,
        },
        Description: {
          type: GraphQLString,
        },
        ImageUrl: {
          type: GraphQLString,
        },
        Price: {
          type: GraphQLFloat,
        },
        Category: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // restaurant.updateOne({ RestaurantID: args.RestaurantID }, { ...args });
        return insertFood(args);
      },
    },

    deleteFood: {
      type: ResultType,

      args: {
        _id: {
          type: GraphQLString,
        },
        Category: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // restaurant.updateOne({ RestaurantID: args.RestaurantID }, { ...args });
        return deleteFoodItem(args);
      },
    },

    updateFood: {
      type: ResultType,

      args: {
        _id: {
          type: GraphQLString,
        },
        RestaurantID: {
          type: GraphQLString,
        },
        FoodName: {
          type: GraphQLString,
        },
        MainIngredients: {
          type: GraphQLString,
        },
        Cuisine: {
          type: GraphQLString,
        },
        Description: {
          type: GraphQLString,
        },
        ImageUrl: {
          type: GraphQLString,
        },
        Price: {
          type: GraphQLFloat,
        },
        Category: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // restaurant.updateOne({ RestaurantID: args.RestaurantID }, { ...args });
        return updateFoodItem(args);
      },
    },

    updateOrderStatus: {
      type: ResultType,

      args: {
        _id: {
          type: GraphQLString,
        },
        RestaurantID: {
          type: GraphQLString,
        },
        DeliveryStatus: {
          type: GraphQLString,
        },
        DeliverStatusID: {
          type: GraphQLInt,
        },
      },
      resolve(parent, args) {
        // restaurant.updateOne({ RestaurantID: args.RestaurantID }, { ...args });
        return updateDeliveryStatus(args);
      },
    },
    // customer related mutations
    customerSignup: {
      type: ResultType,
      args: {
        Email: {
          type: GraphQLString,
        },
        Password: {
          type: GraphQLString,
        },
        Role: {
          type: GraphQLString,
        },
        FirstName: {
          type: GraphQLString,
        },
        LastName: {
          type: GraphQLString,
        },
        Gender: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return customerSignup(args);
      },
    },

    updateCustomer: {
      type: ResultType,
      args: {
        CustomerID: {
          type: GraphQLID,
        },
        FirstName: {
          type: GraphQLString,
        },
        LastName: {
          type: GraphQLString,
        },
        Gender: {
          type: GraphQLString,
        },
        NickName: {
          type: GraphQLString,
        },
        DOB: {
          type: GraphQLString,
        },
        Email: {
          type: GraphQLString,
        },
        CountryName: {
          type: GraphQLString,
        },
        StateName: {
          type: GraphQLString,
        },
        City: {
          type: GraphQLString,
        },
        Zip: {
          type: GraphQLInt,
        },
        Street: {
          type: GraphQLString,
        },
        PhoneNo: {
          type: GraphQLLong,
        },
        CountryCode: {
          type: GraphQLInt,
        },
        Headline: {
          type: GraphQLString,
        },
        ILove: {
          type: GraphQLString,
        },
        ImageURL: {
          type: GraphQLString,
        },
        FindMeIn: {
          type: GraphQLString,
        },
        Website: {
          type: GraphQLString,
        },
        JoinDate: {
          type: GraphQLString,
        },
        ReviewCount: {
          type: GraphQLInt,
        },
      },
      resolve(parent, args) {
        // restaurant.updateOne({ RestaurantID: args.RestaurantID }, { ...args });
        return updateProfile(args);
      },
    },

    createNewOrder: {
      type: ResultType,
      args: {
        order: {
          type: OrderInputType,
        },
        orderedMenu: {
          type: new GraphQLList(OrderCartInputType),
        },
      },
      resolve(parent, args) {
        // restaurant.updateOne({ RestaurantID: args.RestaurantID }, { ...args });
        return generateOrder(args);
      },
    },

    createNewReview: {
      type: ReviewType,
      args: {
        RestaurantID: {
          type: GraphQLString,
        },
        ReviewCounts: {
          type: GraphQLInt,
        },
        TotalRating: {
          type: GraphQLInt,
        },
        Rating: {
          type: GraphQLInt,
        },
        CustomerID: {
          type: GraphQLString,
        },
        CustomerName: {
          type: GraphQLString,
        },
        CustomerAddr: {
          type: GraphQLString,
        },
        Description: {
          type: GraphQLString,
        },
        ImageUrl: {
          type: GraphQLString,
        },
        ReviewDate: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return submitReview(args);
      },
    },

    loginUser: {
      type: UserSignupType,
      args: {
        Email: {
          type: GraphQLString,
        },
        Password: {
          type: GraphQLString,
        },
        Role: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // restaurant.updateOne({ RestaurantID: args.RestaurantID }, { ...args });
        return login(args);
      },
    },

    // signupMasterData: {
    //   type: StaticType,
    //   args: {
    //     id: {
    //       type: GraphQLString,
    //     },
    //   },
    //   resolve(parent, args) {
    //     console.log('get static data');
    //     // return country.find();
    //     const result = getSignupMasterData();
    //     return result;
    //   },
    // },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
