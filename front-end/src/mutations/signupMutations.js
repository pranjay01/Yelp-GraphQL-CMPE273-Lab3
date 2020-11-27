import { gql } from 'apollo-boost';

// mutation{
//    customerSignup(Email:"qwer@gmail.com",Password:"pranjay01",FirstName:"Pr",LastName:"Sg",Gender:"male"){
//      Result
//    }
//  }

// const customerSignup = gql'mutation($Email:String )';

const customerSignup = gql`
  mutation(
    $Email: String
    $Password: String
    $FirstName: String
    $Role: String
    $LastName: String
    $Gender: String
  ) {
    customerSignup(
      Email: $Email
      Password: $Password
      Role: $Role
      FirstName: $FirstName
      LastName: $LastName
      Gender: $Gender
    ) {
      Result
    }
  }
`;

const restaurantSignup = gql`
  mutation(
    $Email: String
    $Password: String
    $Name: String
    $Role: String
    $CountryName: String
    $StateName: String
    $City: String
    $Zip: Int
    $Street: String
    $PhoneNo: Long
    $CountryCode: Int
  ) {
    restaurantSignup(
      Email: $Email
      Password: $Password
      Role: $Role
      Name: $Name
      CountryName: $CountryName
      StateName: $StateName
      City: $City
      Zip: $Zip
      Street: $Street
      PhoneNo: $PhoneNo
      CountryCode: $CountryCode
    ) {
      Result
    }
  }
`;

const loginUser = gql`
  mutation($Email: String, $Password: String, $Role: String) {
    loginUser(Email: $Email, Password: $Password, Role: $Role) {
      Result
      Email
      Role
      _id
    }
  }
`;

export { customerSignup, restaurantSignup, loginUser };
