import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
 
// @desc Create new order
// @route POST /api/orders
// @access Private 
const addOrderItems = asyncHandler(async (req, res) => {
    res.send('add order items');
});

// @desc Get logged in user orders
// @route GET /api/orders/mine
// @access Private 
const getMyOrders = asyncHandler(async (req, res) => {
  res.send('get my orders');
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private 
const getOrderById = asyncHandler(async (req, res) => {
  res.send('get order by id');
});

// @desc Update order status to paid
// @route GET /api/orders/:id/pay
// @access Private 
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('update order status to paid');
});

// @desc Update order status to delivered as admin
// @route GET /api/orders/:id/deliver
// @access Private / Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('update order status to delivered as Admin');
});

// @desc Get all orders as an admin
// @route GET /api/orders
// @access Private / Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send('get all orders as Admin');
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders
};