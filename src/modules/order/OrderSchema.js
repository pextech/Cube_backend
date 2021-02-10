import joi from 'joi';

const orderSchema = joi.object({
  name: joi.string().min(5).required(),
  serviceId: joi.string().uuid().required(),
  serviceName: joi.string().min(3).required(),
  package: joi.string().min(3),
  price: joi.number().positive().required(),
  status: joi
    .any()
    .valid('pending', 'approved', 'canceled')
    .required(),
  paid: joi.boolean().required(),
  delivered: joi.boolean().required(),
  comment: joi.string(),
});

export default orderSchema;
