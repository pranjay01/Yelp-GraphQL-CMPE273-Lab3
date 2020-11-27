import { gql } from 'apollo-boost';

const getSignupMasterData = gql`
  query signupMasterData {
    signupMasterData {
      Country {
        Name
        CountryCode
      }
      Gender {
        GenderType
      }
      State {
        Name
      }
    }
  }
`;

export { getSignupMasterData };
