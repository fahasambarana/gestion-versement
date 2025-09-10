const Conducteur = require('../models/ConducteurModel');

// Get all conducteurs
const getAllConducteurs = async (req, res) => {
  try {
    const conducteurs = await Conducteur.find().sort({ dateCreation: -1 });
    res.json({
      success: true,
      data: conducteurs,
      count: conducteurs.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des conducteurs',
      error: error.message
    });
  }
};

// Get single conducteur by ID
const getConducteurById = async (req, res) => {
  try {
    const conducteur = await Conducteur.findById(req.params.id);
    if (!conducteur) {
      return res.status(404).json({
        success: false,
        message: 'Conducteur non trouvé'
      });
    }
    res.json({
      success: true,
      data: conducteur
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération du conducteur',
      error: error.message
    });
  }
};

// Create new conducteur
const createConducteur = async (req, res) => {
  try {
    const conducteur = new Conducteur(req.body);
    const savedConducteur = await conducteur.save();
    
    res.status(201).json({
      success: true,
      message: 'Conducteur créé avec succès',
      data: savedConducteur
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: errors
      });
    }
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création du conducteur',
      error: error.message
    });
  }
};

// Update conducteur
const updateConducteur = async (req, res) => {
  try {
    const conducteur = await Conducteur.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!conducteur) {
      return res.status(404).json({
        success: false,
        message: 'Conducteur non trouvé'
      });
    }
    
    res.json({
      success: true,
      message: 'Conducteur mis à jour avec succès',
      data: conducteur
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: errors
      });
    }
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la mise à jour du conducteur',
      error: error.message
    });
  }
};

// Delete conducteur
const deleteConducteur = async (req, res) => {
  try {
    const conducteur = await Conducteur.findByIdAndDelete(req.params.id);
    
    if (!conducteur) {
      return res.status(404).json({
        success: false,
        message: 'Conducteur non trouvé'
      });
    }
    
    res.json({
      success: true,
      message: 'Conducteur supprimé avec succès',
      data: conducteur
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la suppression du conducteur',
      error: error.message
    });
  }
};

// Get conducteurs by status
const getConducteursByStatus = async (req, res) => {
  try {
    const { statut } = req.params;
    const conducteurs = await Conducteur.find({ statut }).sort({ nom: 1 });
    
    res.json({
      success: true,
      data: conducteurs,
      count: conducteurs.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des conducteurs',
      error: error.message
    });
  }
};

module.exports = {
  getAllConducteurs,
  getConducteurById,
  createConducteur,
  updateConducteur,
  deleteConducteur,
  getConducteursByStatus
};