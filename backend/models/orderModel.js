import mongoose from "mongoose";
import { timestamp } from "rxjs";

const orderSchema = mongoose.Schema({
  user: {
    // id that has a _ in front known as ObjectId
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // coming from the "User" reference
    ref: "User",
  },
  orderItems:[
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        // refers to the object id 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // refers to Product 
        ref: "Product"
      },
    }
  ],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  paymentResult: { 
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  itemsPrice: { type: Number, required: true, default: 0.0 },
  taxPrice: { type: Number, required: true, default: 0.0 },
  shippingPrice: { type: Number, required: true, default: 0.0 },
  totalPrice: { type: Number, required: true, default: 0.0 },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, required: true, default: false },
  deliveredAt: { type: Date },

}, {
  timestamps: true,
});

const Order = mongoose.model("Order", orderSchema); 

export default Order;