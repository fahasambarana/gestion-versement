import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute, useNavigation } from '@react-navigation/native';

const API_BASE_URL = 'http://192.168.0.29:5000/api'; // Remplacez par votre URL d'API

export default function EditConducteurScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { conducteur } = route.params;
  
  const [nom, setNom] = useState(conducteur.nom);
  const [telephone, setTelephone] = useState(conducteur.telephone);
  const [statut, setStatut] = useState(conducteur.statut);
  const [versementJour, setVersementJour] = useState(String(conducteur.versementJour));
  const [versementAttendu, setVersementAttendu] = useState(String(conducteur.versementAttendu));
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!nom.trim() || !telephone.trim() || !versementJour || !versementAttendu) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/conducteurs/${conducteur._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom,
          telephone,
          statut,
          versementJour: Number(versementJour),
          versementAttendu: Number(versementAttendu),
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert('Succès', 'Conducteur modifié avec succès');
        navigation.goBack();
      } else {
        Alert.alert('Erreur', data.message || 'Erreur lors de la modification');
      }
    } catch (error) {
      console.error('Erreur:', error);
      Alert.alert('Erreur', 'Problème de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
        <Text style={styles.title}>Modifier le Conducteur</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Nom complet</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez le nom complet"
            value={nom}
            onChangeText={setNom}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Téléphone</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez le téléphone"
            keyboardType="phone-pad"
            value={telephone}
            onChangeText={setTelephone}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Statut</Text>
          <Picker
            selectedValue={statut}
            style={styles.picker}
            onValueChange={(itemValue) => setStatut(itemValue)}
          >
            <Picker.Item label="Actif" value="Actif" />
            <Picker.Item label="Inactif" value="Inactif" />
            <Picker.Item label="En congé" value="En congé" />
          </Picker>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Versement du jour (Ar)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 15000"
            keyboardType="numeric"
            value={versementJour}
            onChangeText={setVersementJour}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Versement attendu (Ar)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 20000"
            keyboardType="numeric"
            value={versementAttendu}
            onChangeText={setVersementAttendu}
          />
        </View>

        <TouchableOpacity 
          style={[styles.submitButton, loading && styles.submitButtonDisabled]} 
          onPress={handleUpdate}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Modification...' : 'Modifier'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#2c3e50',
    textAlign: 'center',
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cfd8dc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#2c3e50',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#cfd8dc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});