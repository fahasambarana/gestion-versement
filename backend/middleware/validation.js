const { body, validationResult } = require('express-validator');

// Validation rules for conducteur
const validateConducteur = [
  body('nom')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom doit contenir entre 2 et 100 caractères'),
  
  body('telephone')
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage('Le téléphone doit contenir entre 8 et 20 caractères')
    .matches(/^[0-9+\s()-]+$/)
    .withMessage('Veuillez entrer un numéro de téléphone valide'),
  
  body('statut')
    .isIn(['Actif', 'Inactif', 'En congé'])
    .withMessage('Statut invalide'),
  
  body('versementJour')
    .isFloat({ min: 0 })
    .withMessage('Le versement du jour doit être un nombre positif'),
  
  body('versementAttendu')
    .isFloat({ min: 0 })
    .withMessage('Le versement attendu doit être un nombre positif'),
];

// Middleware to check validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  validateConducteur,
  handleValidationErrors
};