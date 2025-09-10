import React, { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
  SafeAreaView, Alert, ActivityIndicator, RefreshControl, Linking, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api'; // <-- On utilise ton api.js

const ConducteurScreen = () => {
  const [conducteurs, setConducteurs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigation();

  // Récupérer les conducteurs depuis api.js
  const fetchConducteurs = async () => {
    try {
      const response = await api.get('/conducteurs'); // /conducteurs car baseURL est déjà défini dans api.js
      if (response.data.success) {
        setConducteurs(response.data.data);
      } else {
        Alert.alert('Erreur', 'Impossible de charger les conducteurs');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Problème de connexion au serveur');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchConducteurs();
  };

  const deleteConducteur = async (id) => {
    Alert.alert(
      'Confirmation',
      'Voulez-vous supprimer ce conducteur ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await api.delete(`/conducteurs/${id}`);
              if (response.data.success) {
                Alert.alert('Succès', 'Conducteur supprimé');
                fetchConducteurs();
              } else {
                Alert.alert('Erreur', 'Impossible de supprimer');
              }
            } catch (error) {
              console.error(error);
              Alert.alert('Erreur', 'Problème de connexion au serveur');
            }
          },
        },
      ]
    );
  };

  const callDriver = (phone) => Linking.openURL(`tel:${phone}`);

  const filteredConducteurs = conducteurs.filter((c) => {
    const matchesSearch =
      c.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.telephone.includes(searchQuery);
    const matchesFilter =
      filterStatus === 'Tous' || c.statut === filterStatus;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    fetchConducteurs();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Gestion Conducteurs</Text>

        {/* Recherche */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#777" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Liste */}
        <ScrollView
          style={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredConducteurs.length > 0 ? (
            filteredConducteurs.map((c) => (
              <View key={c._id} style={styles.conducteurCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.conducteurName}>{c.nom}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          c.statut === 'Actif'
                            ? '#2ecc71'
                            : c.statut === 'Inactif'
                            ? '#e74c3c'
                            : '#f39c12',
                      },
                    ]}
                  >
                    <Text style={styles.statusText}>{c.statut}</Text>
                  </View>
                </View>

                <Text style={styles.detailText}>📞 {c.telephone}</Text>

                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#27ae60' }]}
                    onPress={() => callDriver(c.telephone)}
                  >
                    <Ionicons name="call" size={16} color="#fff" />
                    <Text style={styles.actionText}>Appeler</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#3498db' }]}
                    onPress={() =>
                      navigate.navigate('EditConducteur', { conducteur: c })
                    }
                  >
                    <Ionicons name="pencil" size={16} color="#fff" />
                    <Text style={styles.actionText}>Modifier</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#e74c3c' }]}
                    onPress={() => deleteConducteur(c._id)}
                  >
                    <Ionicons name="trash" size={16} color="#fff" />
                    <Text style={styles.actionText}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="people" size={50} color="#bdc3c7" />
              <Text style={styles.emptyStateText}>Aucun conducteur trouvé</Text>
            </View>
          )}
        </ScrollView>

        {/* Bouton Ajouter */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigate.navigate('AddConducteur', { onGoBack: fetchConducteurs })
          }
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Nouveau Conducteur</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8f9fa' },
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#7f8c8d' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 12, marginBottom: 16 },
  searchInput: { flex: 1, height: 45, fontSize: 16 },
  listContainer: { flex: 1, marginBottom: 70 },
  conducteurCard: { backgroundColor: '#fff', borderRadius: 10, padding: 16, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  conducteurName: { fontSize: 18, fontWeight: 'bold' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: '#fff', fontSize: 12, fontWeight: '500' },
  detailText: { marginBottom: 8 },
  cardActions: { flexDirection: 'row', justifyContent: 'space-between' },
  actionButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 6 },
  actionText: { color: '#fff', marginLeft: 6, fontWeight: '500' },
  emptyState: { alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyStateText: { marginTop: 16, fontSize: 16, color: '#7f8c8d' },
  addButton: { position: 'absolute', bottom: 20, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: '#3498db', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 30 },
  addButtonText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },
});

export default ConducteurScreen;
