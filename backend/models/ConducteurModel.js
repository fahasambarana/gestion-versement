const mongoose = require('mongoose');

const conducteurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  telephone: {
    type: String,
    required: [true, 'Le téléphone est requis'],
    trim: true,
    unique: true, // ✅ Numéro unique
    match: [/^[0-9+\s()-]+$/, 'Veuillez entrer un numéro de téléphone valide']
  },
  statut: {
    type: String,
    enum: ['Actif', 'Inactif', 'En congé'],
    default: 'Actif'
  },
  versementJour: {
    type: Number,
    required: [true, 'Le versement du jour est requis'],
    min: [0, 'Le versement ne peut pas être négatif']
  },
  versementAttendu: {
    type: Number,
    required: [true, 'Le versement attendu est requis'],
    min: [0, 'Le versement attendu ne peut pas être négatif']
  }
}, { 
  timestamps: { createdAt: 'dateCreation', updatedAt: 'dateModification' }, 
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ✅ Virtual pour calculer le solde
conducteurSchema.virtual('solde').get(function() {
  return this.versementAttendu - this.versementJour;
});

module.exports = mongoose.model('Conducteur', conducteurSchema);
