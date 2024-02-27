const { validationResult } = require('express-validator');
const {validate}  = require('joi');

// Validation middleware
const validateRequest = (schema) => {
    return (req, res, next) => {
      const { error, value } = schema.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      req.body = value;
      next();
    };
  };
  
  
  
  // Use the middleware in routes
  
module.exports = validateRequest;
