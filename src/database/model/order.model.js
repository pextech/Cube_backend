import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  userId: {
    type: String,
    required: [true, 'user id is required'],
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
  phone: {
    type: String,
  },
  serviceId: {
    type: String,
    ref: 'Service',
  },
  serviceName: {
    type: String,
  },
  package: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  status: {
    type: String,
    required: [true, 'status is required'],
  },
  paid: {
    type: Boolean,
    required: true,
  },
  delivered: {
    type: Boolean,
    required: true,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const Order = model('Order', orderSchema);

export default Order;
