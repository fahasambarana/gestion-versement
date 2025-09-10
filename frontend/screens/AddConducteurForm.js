// AddConducteurForm.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import api from "../services/api"; // ton api.js
import { Picker } from "@react-native-picker/picker"; // pour le select du statut

const AddConducteurForm = ({ navigation, route }) => {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [statut, setStatut] = useState("Actif"); // valeur par défaut
  const [versementJour, setVersementJour] = useState("");
  const [versementAttendu, setVersementAttendu] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!nom || !telephone || !statut) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires !");
      return;
    }

    const data = {
      nom,
      telephone,
      statut: statut.toLowerCase().replace(" ", "_"), 
      versementJour: Number(versementJour) || 0,
      versementAttendu: Number(versementAttendu) || 0,
    };

    try {
      setLoading(true);
      const response = await api.post("/conducteurs", data);

      if (response.data.success) {
        Alert.alert("Succès", "Conducteur ajouté !");
        // Si tu passes une fonction onGoBack depuis ConducteurScreen
        if (route.params?.onGoBack) {
          route.params.onGoBack();
        }
        navigation.goBack();
      } else {
        Alert.alert("Erreur", "Impossible d'ajouter le conducteur");
      }
    } catch (error) {
      console.error("Erreur détaillée:", error);
      if (error.response?.data?.errors) {
        // Affiche les erreurs du backend
        Alert.alert("Erreur", error.response.data.errors[0].msg);
      } else {
        Alert.alert("Erreur", "Problème de connexion au serveur");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Ajouter un Conducteur</Text>

        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom du conducteur"
          value={nom}
          onChangeText={setNom}
        />

        <Text style={styles.label}>Téléphone</Text>
        <TextInput
          style={styles.input}
          placeholder="034XXXXXXX"
          value={telephone}
          onChangeText={setTelephone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Statut</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={statut}
            onValueChange={(itemValue) => setStatut(itemValue)}
          >
            <Picker.Item label="Actif" value="Actif" />
            <Picker.Item label="Inactif" value="Inactif" />
            <Picker.Item label="En congé" value="En congé" />
          </Picker>
        </View>

        <Text style={styles.label}>Versement du jour</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          value={versementJour}
          onChangeText={setVersementJour}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Versement attendu</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          value={versementAttendu}
          onChangeText={setVersementAttendu}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleAdd}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Ajout en cours..." : "Ajouter Conducteur"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8f9fa" },
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  label: { fontSize: 16, marginTop: 10, marginBottom: 5 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    elevation: 2,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default AddConducteurForm;
