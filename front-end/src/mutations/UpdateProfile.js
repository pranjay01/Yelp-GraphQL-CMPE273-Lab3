import { gql } from 'apollo-boost';

const updateRestaurant = gql`
  mutation(
    $RestaurantID: ID
    $Email: String
    $Name: String
    $CountryName: String
    $StateName: String
    $City: String
    $Zip: Int
    $Street: String
    $PhoneNo: Long
    $CountryCode: Int
    $OpeningTime: String
    $ClosingTime: String
    $ImageURL: String
    $CurbsidePickup: Boolean
    $DineIn: Boolean
    $YelpDelivery: Boolean
  ) {
    updateRestaurant(
      RestaurantID: $RestaurantID
      Email: $Email
      Name: $Name
      CountryName: $CountryName
      StateName: $StateName
      City: $City
      Street: $Street
      PhoneNo: $PhoneNo
      CountryCode: $CountryCode
      OpeningTime: $OpeningTime
      ClosingTime: $ClosingTime
      ImageURL: $ImageURL
      CurbsidePickup: $CurbsidePickup
      DineIn: $DineIn
      YelpDelivery: $YelpDelivery
      Zip: $Zip
    ) {
      Result
    }
  }
`;

const createNewReview = gql`
  mutation(
    $RestaurantID: String
    $ReviewCounts: Int
    $TotalRating: Int
    $Rating: Int
    $CustomerID: String
    $CustomerName: String
    $CustomerAddr: String
    $Description: String
    $ImageUrl: String
  ) {
    createNewReview(
      RestaurantID: $RestaurantID
      ReviewCounts: $ReviewCounts
      TotalRating: $TotalRating
      Rating: $Rating
      CustomerID: $CustomerID
      CustomerName: $CustomerName
      CustomerAddr: $CustomerAddr
      Description: $Description
      ImageUrl: $ImageUrl
    ) {
      RestaurantID
      Rating
      _id
      CustomerID
      CustomerName
      CustomerAddr
      Description
      ImageUrl
      Result
    }
  }
`;

const updateCustomer = gql`
  mutation(
    $CustomerID: ID
    $FirstName: String
    $LastName: String
    $Gender: String
    $NickName: String
    $DOB: String
    $Email: String
    $CountryName: String
    $StateName: String
    $City: String
    $Zip: Int
    $Street: String
    $PhoneNo: Long
    $CountryCode: Int
    $Headline: String
    $ILove: String
    $ImageURL: String
    $FindMeIn: String
    $Website: String
  ) {
    updateCustomer(
      CustomerID: $CustomerID
      FirstName: $FirstName
      LastName: $LastName
      Gender: $Gender
      NickName: $NickName
      DOB: $DOB
      Email: $Email
      CountryName: $CountryName
      StateName: $StateName
      City: $City
      Zip: $Zip
      Street: $Street
      PhoneNo: $PhoneNo
      CountryCode: $CountryCode
      Headline: $Headline
      ILove: $ILove
      ImageURL: $ImageURL
      FindMeIn: $FindMeIn
      Website: $Website
    ) {
      Result
    }
  }
`;

export { updateRestaurant, createNewReview, updateCustomer };
