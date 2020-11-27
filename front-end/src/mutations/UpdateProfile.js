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

export { updateRestaurant };
