import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const totalJour = 15000;
  const attendu = 20000;
  const manque = attendu - totalJour;
  const [activeButton, setActiveButton] = useState(null);

  const handleNavigation = (screen) => {
    setActiveButton(screen);
    setTimeout(() => {
      navigation.navigate(screen);
      setActiveButton(null);
    }, 200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Gestion Versements Cyclo-Pousses</Text>
          
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Aujourd'hui</Text>
              <Text style={styles.cardDate}>{new Date().toLocaleDateString('fr-FR')}</Text>
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Total du jour</Text>
                <Text style={styles.statValue}>{totalJour.toLocaleString()} Ar</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Versements attendus</Text>
                <Text style={styles.statValue}>{attendu.toLocaleString()} Ar</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, manque > 0 ? styles.warningText : styles.successText]}>
                  {manque > 0 ? 'Manque' : 'Excédent'}
                </Text>
                <Text style={[
                  styles.statValue, 
                  manque > 0 ? styles.warningValue : styles.successValue
                ]}>
                  {Math.abs(manque).toLocaleString()} Ar
                </Text>
              </View>
            </View>
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(totalJour / attendu) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {((totalJour / attendu) * 100).toFixed(1)}% des versements réalisés
            </Text>
          </View>

          <View style={styles.toggleButtonsContainer}>
            <Text style={styles.sectionTitle}>Actions rapides</Text>
            
            <View style={styles.toggleButtonRow}>
              <TouchableOpacity 
                style={[
                  styles.toggleButton,
                  activeButton === "Versement" && styles.toggleButtonActive
                ]}
                onPress={() => handleNavigation("Versement")}
                activeOpacity={0.8}
              >
                <Ionicons 
                  name="add-circle-outline" 
                  size={32} 
                  color={activeButton === "Versement" ? "#fff" : "#2980b9"}
                  style={styles.toggleButtonIcon}
                />
                <Text style={[
                  styles.toggleButtonText,
                  activeButton === "Versement" && styles.toggleButtonTextActive
                ]}>Ajouter Versement</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.toggleButton,
                  activeButton === "Rapports" && styles.toggleButtonActive
                ]}
                onPress={() => handleNavigation("Rapports")}
                activeOpacity={0.8}
              >
                <Ionicons 
                  name="stats-chart-outline" 
                  size={32} 
                  color={activeButton === "Rapports" ? "#fff" : "#2980b9"}
                  style={styles.toggleButtonIcon}
                />
                <Text style={[
                  styles.toggleButtonText,
                  activeButton === "Rapports" && styles.toggleButtonTextActive
                ]}>Voir Rapports</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.toggleButtonRow}>
              <TouchableOpacity 
                style={[
                  styles.toggleButton,
                  activeButton === "Conducteurs" && styles.toggleButtonActive
                ]}
                onPress={() => handleNavigation("Conducteurs")}
                activeOpacity={0.8}
              >
                <Ionicons 
                  name="people-outline" 
                  size={32} 
                  color={activeButton === "Conducteurs" ? "#fff" : "#2980b9"}
                  style={styles.toggleButtonIcon}
                />
                <Text style={[
                  styles.toggleButtonText,
                  activeButton === "Conducteurs" && styles.toggleButtonTextActive
                ]}>Gestion Conducteurs</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.toggleButton,
                  activeButton === "Paramètres" && styles.toggleButtonActive
                ]}
                onPress={() => handleNavigation("Paramètres")}
                activeOpacity={0.8}
              >
                <Ionicons 
                  name="settings-outline" 
                  size={32} 
                  color={activeButton === "Paramètres" ? "#fff" : "#2980b9"}
                  style={styles.toggleButtonIcon}
                />
                <Text style={[
                  styles.toggleButtonText,
                  activeButton === "Paramètres" && styles.toggleButtonTextActive
                ]}>Paramètres</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f3f7",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 22,
    textAlign: "center",
    color: "#34495e",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 16,
    marginBottom: 28,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
    paddingBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#34495e",
  },
  cardDate: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  statsContainer: {
    marginBottom: 20,
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  statLabel: {
    fontSize: 16,
    color: "#677d94",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c3e50",
  },
  warningText: {
    color: "#e74c3c",
  },
  warningValue: {
    color: "#e74c3c",
    fontWeight: "700",
  },
  successText: {
    color: "#27ae60",
  },
  successValue: {
    color: "#27ae60",
    fontWeight: "700",
  },
  progressBar: {
    height: 12,
    backgroundColor: "#dbe6f3",
    borderRadius: 7,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3498db",
    borderRadius: 7,
  },
  progressText: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: "#34495e",
  },
  toggleButtonsContainer: {
    marginBottom: 20,
  },
  toggleButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  toggleButton: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 18,
    borderRadius: 14,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    borderWidth: 1,
    borderColor: "#dde6f0",
    minHeight: 110,
  },
  toggleButtonActive: {
    backgroundColor: "#3498db",
    transform: [{ scale: 0.95 }],
    borderColor: "#3498db",
    shadowColor: "#3498db",
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  toggleButtonIcon: {
    marginBottom: 10,
  },
  toggleButtonText: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    color: "#34495e",
  },
  toggleButtonTextActive: {
    color: "#fff",
  },
});
