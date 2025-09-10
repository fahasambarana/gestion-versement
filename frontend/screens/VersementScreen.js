import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView,
  Modal,
  FlatList,
  SafeAreaView,
  Platform 
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function VersementScreen({ navigation }) {
  const [date, setDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [conducteur, setConducteur] = useState("");
  const [montant, setMontant] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Liste statique des conducteurs
  const conducteursList = [
    { id: '1', nom: 'Jean Rakoto', telephone: '034 12 345 67' },
    { id: '2', nom: 'Paul Randria', telephone: '032 98 765 43' },
    { id: '3', nom: 'Marie Rasoa', telephone: '033 55 44 33 22' },
    { id: '4', nom: 'Pierre Andria', telephone: '038 11 22 33 44' },
    { id: '5', nom: 'Lucette Ravao', telephone: '039 99 88 77 66' },
  ];

  const handleSave = () => {
    if (!date || !conducteur || !montant) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs !");
      return;
    }

    Alert.alert(
      "Versement ajouté",
      `Date: ${date}\nConducteur: ${conducteur}\nMontant: ${montant} Ar`,
      [
        {
          text: "OK",
          onPress: () => {
            setDate("");
            setConducteur("");
            setMontant("");
            navigation.navigate("Accueil");
          }
        }
      ]
    );
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(Platform.OS === 'ios'); // Garder le picker ouvert sur iOS
    
    if (event.type === 'set') { // Si l'utilisateur a choisi une date
      const formattedDate = formatDate(currentDate);
      setDate(formattedDate);
      setSelectedDate(currentDate);
      
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }
    } else if (event.type === 'dismissed') {
      setShowDatePicker(false);
    }
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const renderConducteurItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conducteurItem}
      onPress={() => {
        setConducteur(item.nom);
        setModalVisible(false);
      }}
    >
      <View style={styles.conducteurInfo}>
        <Text style={styles.conducteurName}>{item.nom}</Text>
        <Text style={styles.conducteurPhone}>{item.telephone}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#3498db" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Ajouter un Versement</Text>

          <View style={styles.formCard}>
            {/* Champ Date avec sélecteur de calendrier */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date du versement</Text>
              <TouchableOpacity 
                style={styles.datePickerButton}
                onPress={showDatepicker}
              >
                <View style={styles.datePickerContent}>
                  <Ionicons name="calendar" size={20} color="#7f8c8d" />
                  {date ? (
                    <Text style={styles.dateText}>{date}</Text>
                  ) : (
                    <Text style={styles.datePlaceholder}>Sélectionner une date</Text>
                  )}
                </View>
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onChangeDate}
                  style={styles.datePicker}
                  textColor="#2c3e50"
                />
              )}
            </View>

            {/* Sélecteur de Conducteur */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Conducteur</Text>
              <TouchableOpacity 
                style={styles.selectButton}
                onPress={() => setModalVisible(true)}
              >
                <View style={styles.selectButtonContent}>
                  {conducteur ? (
                    <Text style={styles.selectButtonText}>{conducteur}</Text>
                  ) : (
                    <Text style={styles.selectButtonPlaceholder}>Sélectionner un conducteur</Text>
                  )}
                  <Ionicons name="chevron-down" size={20} color="#7f8c8d" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Champ Montant */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Montant</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="cash" size={20} color="#7f8c8d" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Montant en Ariary"
                  value={montant}
                  onChangeText={setMontant}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Bouton d'enregistrement */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Ionicons name="save" size={20} color="#fff" />
              <Text style={styles.saveButtonText}>Enregistrer le versement</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal de sélection des conducteurs */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sélectionner un conducteur</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#2c3e50" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={conducteursList}
              renderItem={renderConducteurItem}
              keyExtractor={item => item.id}
              style={styles.conducteursList}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2c3e50",
  },
  formCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#34495e",
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
    padding: 12,
  },
  datePickerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#2c3e50",
    marginLeft: 10,
  },
  datePlaceholder: {
    fontSize: 16,
    color: "#7f8c8d",
    marginLeft: 10,
  },
  datePicker: {
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
  },
  inputIcon: {
    padding: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  selectButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
    padding: 12,
  },
  selectButtonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectButtonText: {
    fontSize: 16,
    color: "#2c3e50",
  },
  selectButtonPlaceholder: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  saveButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498db",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  conducteursList: {
    marginBottom: 20,
  },
  conducteurItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  conducteurInfo: {
    flex: 1,
  },
  conducteurName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2c3e50",
    marginBottom: 4,
  },
  conducteurPhone: {
    fontSize: 14,
    color: "#7f8c8d",
  },
});