const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderCartSchema = new Schema(
  {
    OrderID: { type: String, required: true },
    FoodName: { type: String, required: true },
    MenuCategory: { type: String, required: true },
    Quantity: { type: Number, required: true },
    Price: { type: Number, required: true },
  },
  { versionKey: false }
);

// userSignupSchema.index({ Email: 1, Role: 1 }, { unique: true });

const OrderCartModel = mongoose.model('ordercart', orderCartSchema);
module.exports = OrderCartModel;
