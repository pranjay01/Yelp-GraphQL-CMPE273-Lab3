import { gql } from 'apollo-boost';

const insertFood = gql`
  mutation(
    $RestaurantID: String
    $FoodName: String
    $MainIngredients: String
    $Cuisine: String
    $Description: String
    $ImageUrl: String
    $Price: Float
    $Category: String
  ) {
    insertFood(
      RestaurantID: $RestaurantID
      FoodName: $FoodName
      MainIngredients: $MainIngredients
      Cuisine: $Cuisine
      Description: $Description
      ImageUrl: $ImageUrl
      Price: $Price
      Category: $Category
    ) {
      Result
    }
  }
`;

const updateFood = gql`
  mutation(
    $_id: String
    $RestaurantID: String
    $FoodName: String
    $MainIngredients: String
    $Cuisine: String
    $Description: String
    $ImageUrl: String
    $Price: Float
    $Category: String
  ) {
    updateFood(
      _id: $_id
      RestaurantID: $RestaurantID
      FoodName: $FoodName
      MainIngredients: $MainIngredients
      Cuisine: $Cuisine
      Description: $Description
      ImageUrl: $ImageUrl
      Price: $Price
      Category: $Category
    ) {
      Result
    }
  }
`;

const deleteFood = gql`
  mutation($_id: String, $Category: String) {
    deleteFood(_id: $_id, Category: $Category) {
      Result
    }
  }
`;

const updateOrderStatus = gql`
  mutation($_id: String, $RestaurantID: String, $DeliveryStatus: String, $DeliverStatusID: Int) {
    updateOrderStatus(
      _id: $_id
      RestaurantID: $RestaurantID
      DeliveryStatus: $DeliveryStatus
      DeliverStatusID: $DeliverStatusID
    ) {
      Result
    }
  }
`;

export { insertFood, updateFood, deleteFood, updateOrderStatus };
