const validate = (schema) => async (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details
      .map((details) => details.message)
      .join(', ');
    return res.status(400).json({ error: errors });
  }
  return next();
};
export default validate;
