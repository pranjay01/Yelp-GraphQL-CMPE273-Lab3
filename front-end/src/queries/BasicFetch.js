import { gql } from 'apollo-boost';

const getRestaurantInfo = gql`
  query($RestaurantID: ID) {
    getRestaurantInfo(RestaurantID: $RestaurantID) {
      RestaurantID
      Name
      Email
      CountryName
      StateName
      City
      Zip
      Street
      PhoneNo
      CountryCode
      OpeningTime
      ClosingTime
      ImageURL
      CurbsidePickup
      DineIn
      YelpDelivery
      Latitude
      Longitude
      ReviewCounts
      TotalRating
      MainCourse {
        _id
        RestaurantID
        FoodName
        MainIngredients
        Cuisine
        Description
        ImageUrl
        Price
      }
      Dessert {
        _id
        RestaurantID
        FoodName
        MainIngredients
        Cuisine
        Description
        ImageUrl
        Price
      }
      Salad {
        _id
        RestaurantID
        FoodName
        MainIngredients
        Cuisine
        Description
        ImageUrl
        Price
      }
      Beverage {
        _id
        RestaurantID
        FoodName
        MainIngredients
        Cuisine
        Description
        ImageUrl
        Price
      }
      Appetizer {
        _id
        RestaurantID
        FoodName
        MainIngredients
        Cuisine
        Description
        ImageUrl
        Price
      }
      Review {
        ReviewDate
        _id
        RestaurantID
        Rating
        CustomerID
        CustomerName
        CustomerAddr
        Description
        ImageUrl
        ReviewDate
      }
    }
  }
`;

const getAppetizerMenu = gql`
  query($RestaurantID: ID) {
    getRestaurantInfo(RestaurantID: $RestaurantID) {
      Appetizer {
        _id
        RestaurantID
        FoodName
        MainIngredients
        Cuisine
        Description
        ImageUrl
        Price
      }
    }
  }
`;

const getBeverageMenu = gql`
  query($RestaurantID: ID) {
    getRestaurantInfo(RestaurantID: $RestaurantID) {
      Beverage {
        _id
        RestaurantID
        FoodName
        MainIngredients
        Cuisine
        Description
        ImageUrl
        Price
      }
    }
  }
`;

const getSaladMenu = gql`
  query($RestaurantID: ID) {
    getRestaurantInfo(RestaurantID: $RestaurantID) {
      Salad {
        _id
        RestaurantID
        FoodName
        MainIngredients
        Cuisine
        Description
        ImageUrl
        Price
      }
    }
  }
`;

const getDessertMenu = gql`
  query($RestaurantID: ID) {
    getRestaurantInfo(RestaurantID: $RestaurantID) {
      Dessert {
        _id
        RestaurantID
        FoodName
        MainIngredients
        Cuisine
        Description
        ImageUrl
        Price
      }
    }
  }
`;

const getMainCourseMenu = gql`
  query($RestaurantID: ID) {
    getRestaurantInfo(RestaurantID: $RestaurantID) {
      MainCourse {
        _id
        RestaurantID
        FoodName
        MainIngredients
        Cuisine
        Description
        ImageUrl
        Price
      }
    }
  }
`;

const getRestaurantOrders = gql`
  query($RestaurantID: String, $sortValue: String) {
    getRestaurantOrders(RestaurantID: $RestaurantID, sortValue: $sortValue) {
      _id
      CustomerID
      Address
      CustomerName
      CustomerName
      CustomerImageUrl
      RestaurantID
      RestaurantName
      OrderedDate
      OrderType
      DeliveryStatus
      DeliverStatusID
      Bill
      OrderCart {
        _id
        FoodName
        MenuCategory
        Quantity
        Price
      }
    }
  }
`;

const getCustomerInfo = gql`
  query($CustomerID: ID) {
    getCustomerInfo(CustomerID: $CustomerID) {
      FirstName
      ReviewCount
      CustomerID
      LastName
      Gender
      NickName
      DOB
      Email
      CountryName
      StateName
      City
      Zip
      Street
      PhoneNo
      CountryCode
      Headline
      ILove
      ImageURL
      FindMeIn
      Website
      JoinDate
    }
  }
`;

const getRestaurantReviews = gql`
  query($RestaurantID: ID) {
    getRestaurantInfo(RestaurantID: $RestaurantID) {
      Review {
        ReviewDate
        _id
        RestaurantID
        Rating
        CustomerID
        CustomerName
        CustomerAddr
        Description
        ImageUrl
        ReviewDate
      }
    }
  }
`;

const getRestaurantResultQuery = gql`
  query($filter: String, $searchString: String) {
    getRestaurantResultQuery(filter: $filter, searchString: $searchString) {
      restaurantCount
      Result
      restaurantList {
        Name
        RestaurantID
        Email
        CountryName
        StateName
        City
        Zip
        Street
        PhoneNo
        CountryCode
        OpeningTime
        ClosingTime
        ImageURL
        CurbsidePickup
        CurbsidePickup
        DineIn
        YelpDelivery
        ReviewCounts
        TotalRating
      }
    }
  }
`;

const getAllCustomerOrders = gql`
  query($CustomerID: String, $sortOrder: Int, $filter1: String, $filter2: String) {
    getAllCustomerOrders(
      CustomerID: $CustomerID
      sortOrder: $sortOrder
      filter1: $filter1
      filter2: $filter2
    ) {
      _id
      CustomerID
      Address
      CustomerName
      CustomerName
      CustomerImageUrl
      RestaurantID
      RestaurantName
      OrderedDate
      OrderType
      DeliveryStatus
      DeliverStatusID
      Bill
      OrderCart {
        _id
        FoodName
        MenuCategory
        Quantity
        Price
      }
    }
  }
`;

export {
  getRestaurantInfo,
  getAppetizerMenu,
  getMainCourseMenu,
  getDessertMenu,
  getBeverageMenu,
  getSaladMenu,
  getRestaurantOrders,
  getCustomerInfo,
  getRestaurantReviews,
  getRestaurantResultQuery,
  getAllCustomerOrders,
};
