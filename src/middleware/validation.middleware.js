export const validation = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params, ...req.query };
    const validationResult = schema.validate(data, { abortEarly: false });

    if (validationResult.error) {
      const errorMessages = validationResult.error.details.map(
        (err) => err.message
      );
      return res.status(400).json({ message: "Validation Error", errors: errorMessages });
    }

    return next();
  };
};