import { Schema, model } from 'mongoose';

const serviceSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    billingCycle: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000,
    },
  },
);

const Service = model('Service', serviceSchema);

export default Service;
