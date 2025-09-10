const express = require('express');
const router = express.Router();
const {
  getAllConducteurs,
  getConducteurById,
  createConducteur,
  updateConducteur,
  deleteConducteur,
  getConducteursByStatus
} = require('../controllers/ConducteurController');
const { validateConducteur, handleValidationErrors } = require('../middleware/validation');

// Routes
router.get('/', getAllConducteurs);
router.get('/statut/:statut', getConducteursByStatus);
router.get('/:id', getConducteurById);
router.post('/', validateConducteur, handleValidationErrors, createConducteur);
router.put('/:id', validateConducteur, handleValidationErrors, updateConducteur);
router.delete('/:id', deleteConducteur);

module.exports = router;