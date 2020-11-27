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
    }
  }
`;

export { getRestaurantInfo };
