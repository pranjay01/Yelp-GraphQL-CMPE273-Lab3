import { gql } from 'apollo-boost';

const getSignupMasterData = gql`
  query signupMasterData {
    signupMasterData {
      Country {
        _id
        Name
        CountryCode
      }
      Gender {
        _id
        GenderType
      }
      State {
        _id
        Name
      }
      Cuisine {
        _id
        CuisineName
      }
    }
  }
`;

const getSearchStringsQuery = gql`
  query {
    getSearchStringsQuery {
      NameLocation {
        Name
        location
      }
      FoodItemsStrings {
        FoodName
        Cuisine
      }
      Result
    }
  }
`;

export { getSignupMasterData, getSearchStringsQuery };
