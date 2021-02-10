import mongoose from 'mongoose';

/**
 * Invoice Schema
 */
const invoiceSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    due_date: { type: String, required: true },
    amount: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' },
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

export default mongoose.model('Invoice', invoiceSchema);
