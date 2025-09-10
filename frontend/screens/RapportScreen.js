import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

const rapports = [
  {
    id: "1",
    date: "01/09/2025",
    conducteur: "Rakoto",
    montant: 7000,
    status: "low",
    time: "08:30"
  },
  {
    id: "2",
    date: "01/09/2025",
    conducteur: "Jean",
    montant: 8000,
    status: "good",
    time: "09:15"
  },
  {
    id: "3",
    date: "02/09/2025",
    conducteur: "Rakoto",
    montant: 9000,
    status: "excellent",
    time: "10:45"
  },
  {
    id: "4",
    date: "02/09/2025",
    conducteur: "Marie",
    montant: 7500,
    status: "low",
    time: "11:20"
  },
  {
    id: "5",
    date: "03/09/2025",
    conducteur: "Paul",
    montant: 8500,
    status: "good",
    time: "14:30"
  },
  {
    id: "6",
    date: "03/09/2025",
    conducteur: "Luc",
    montant: 9500,
    status: "excellent",
    time: "16:15"
  },
  {
    id: "7",
    date: "04/09/2025",
    conducteur: "Sophie",
    montant: 6500,
    status: "low",
    time: "17:45"
  },
];

export default function RapportsScreen() {
  const [selectedFilter, setSelectedFilter] = useState("Tous");
  const total = rapports.reduce((sum, v) => sum + v.montant, 0);
  const moyenne = Math.round(total / rapports.length);
  const excellentCount = rapports.filter(item => item.status === "excellent").length;
  const goodCount = rapports.filter(item => item.status === "good").length;
  const lowCount = rapports.filter(item => item.status === "low").length;

  const filteredRapports =
    selectedFilter === "Tous"
      ? rapports
      : rapports.filter((item) => item.status === selectedFilter);

  const getStatusIcon = (status) => {
    switch (status) {
      case "excellent":
        return "trending-up";
      case "good":
        return "checkmark-circle";
      case "low":
        return "alert-circle";
      default:
        return "help-circle";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "excellent":
        return "#10b981"; // Vert émeraude
      case "good":
        return "#3b82f6"; // Bleu vif
      case "low":
        return "#ef4444"; // Rouge vif
      default:
        return "#6b7280"; // Gris
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "excellent":
        return "Excellent";
      case "good":
        return "Bon";
      case "low":
        return "Faible";
      default:
        return "Inconnu";
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.conducteurInfo}>
          <View style={[styles.avatar, { backgroundColor: getStatusColor(item.status) + "20" }]}>
            <Ionicons name="person" size={20} color={getStatusColor(item.status)} />
          </View>
          <View style={styles.conducteurDetails}>
            <Text style={styles.conducteurName}>{item.conducteur}</Text>
            <View style={styles.dateTimeContainer}>
              <Ionicons name="calendar" size={12} color="#6b7280" />
              <Text style={styles.date}>{item.date}</Text>
              <Ionicons name="time" size={12} color="#6b7280" style={styles.timeIcon} />
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) + "15" },
          ]}
        >
          <Ionicons
            name={getStatusIcon(item.status)}
            size={14}
            color={getStatusColor(item.status)}
          />
          <Text
            style={[styles.statusText, { color: getStatusColor(item.status) }]}
          >
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.amountContainer}>
          <View style={styles.amountTextContainer}>
            <Text style={styles.amountLabel}>Montant versé</Text>
            <Text
              style={[
                styles.montant,
                { color: getStatusColor(item.status) },
              ]}
            >
              {item.montant.toLocaleString()} Ar
            </Text>
          </View>
          <Ionicons
            name={item.montant >= 8000 ? "arrow-up" : "arrow-down"}
            size={20}
            color={item.montant >= 8000 ? "#10b981" : "#ef4444"}
            style={styles.arrowIcon}
          />
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>0 Ar</Text>
            <Text style={styles.progressLabel}>10,000 Ar</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${(item.montant / 10000) * 100}%`,
                  backgroundColor: getStatusColor(item.status),
                },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* En-tête */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Rapports des Versements</Text>
            <Text style={styles.subtitle}>Suivi des transactions quotidiennes</Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="document-text" size={28} color="#3b82f6" />
          </View>
        </View>

        {/* Statistiques résumées */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.statCardPrimary]}>
            <View style={styles.statIconContainer}>
              <Ionicons name="cash" size={24} color="#ffffff" />
            </View>
            <Text style={styles.statValue}>{total.toLocaleString()} Ar</Text>
            <Text style={styles.statLabel}>Total Général</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={[styles.statMiniCard, { backgroundColor: "#f0f9ff" }]}>
              <Ionicons name="trending-up" size={16} color="#10b981" />
              <Text style={[styles.statMiniValue, { color: "#10b981" }]}>{excellentCount}</Text>
              <Text style={styles.statMiniLabel}>Excellent</Text>
            </View>

            <View style={[styles.statMiniCard, { backgroundColor: "#eff6ff" }]}>
              <Ionicons name="checkmark-circle" size={16} color="#3b82f6" />
              <Text style={[styles.statMiniValue, { color: "#3b82f6" }]}>{goodCount}</Text>
              <Text style={styles.statMiniLabel}>Bon</Text>
            </View>

            <View style={[styles.statMiniCard, { backgroundColor: "#fef2f2" }]}>
              <Ionicons name="alert-circle" size={16} color="#ef4444" />
              <Text style={[styles.statMiniValue, { color: "#ef4444" }]}>{lowCount}</Text>
              <Text style={styles.statMiniLabel}>Faible</Text>
            </View>
          </View>
        </View>

        {/* Filtres */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Filtrer par statut</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}
          >
            {["Tous", "excellent", "good", "low"].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && [
                    styles.filterButtonActive,
                    { backgroundColor: getStatusColor(filter !== "Tous" ? filter : "good") }
                  ],
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Ionicons
                  name={getStatusIcon(filter !== "Tous" ? filter : "good")}
                  size={16}
                  color={selectedFilter === filter ? "#ffffff" : getStatusColor(filter !== "Tous" ? filter : "good")}
                  style={styles.filterIcon}
                />
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter && styles.filterTextActive,
                  ]}
                >
                  {filter === "excellent"
                    ? "Excellent"
                    : filter === "good"
                    ? "Bon"
                    : filter === "low"
                    ? "Faible"
                    : "Tous"}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Liste des rapports */}
        <View style={styles.listSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Détail des versements</Text>
            <Text style={styles.sectionCount}>{filteredRapports.length} transactions</Text>
          </View>
          
          <FlatList
            data={filteredRapports}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons
                  name="document-text-outline"
                  size={60}
                  color="#d1d5db"
                />
                <Text style={styles.emptyTitle}>Aucun rapport trouvé</Text>
                <Text style={styles.emptySubtitle}>
                  Aucune transaction ne correspond à vos filtres
                </Text>
              </View>
            }
          />
        </View>

        {/* Résumé final */}
        <View style={styles.summarySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Résumé du Mois</Text>
            <Ionicons name="trophy" size={20} color="#f59e0b" />
          </View>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryIconContainer, { backgroundColor: "#dcfce7" }]}>
                <Ionicons name="cash" size={18} color="#16a34a" />
              </View>
              <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryLabel}>Total des versements</Text>
                <Text style={styles.summaryValue}>{total.toLocaleString()} Ar</Text>
              </View>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryItem}>
              <View style={[styles.summaryIconContainer, { backgroundColor: "#dbeafe" }]}>
                <Ionicons name="list" size={18} color="#2563eb" />
              </View>
              <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryLabel}>Nombre de transactions</Text>
                <Text style={styles.summaryValue}>{rapports.length}</Text>
              </View>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryItem}>
              <View style={[styles.summaryIconContainer, { backgroundColor: "#fef3c7" }]}>
                <Ionicons name="analytics" size={18} color="#d97706" />
              </View>
              <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryLabel}>Moyenne par versement</Text>
                <Text style={styles.summaryValue}>{moyenne.toLocaleString()} Ar</Text>
              </View>
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
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 30,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1f2937",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  headerIcon: {
    backgroundColor: "#eff6ff",
    padding: 12,
    borderRadius: 12,
  },
  statsContainer: {
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: "#3b82f6",
    padding: 24,
    borderRadius: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  statCardPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statMiniCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statMiniValue: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 8,
    marginBottom: 2,
  },
  statMiniLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  filterSection: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    letterSpacing: -0.5,
  },
  sectionCount: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  filterContainer: {
    marginBottom: 8,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  filterButtonActive: {
    borderColor: "transparent",
    elevation: 4,
  },
  filterIcon: {
    marginRight: 8,
  },
  filterText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 14,
  },
  filterTextActive: {
    color: "#ffffff",
  },
  listSection: {
    marginBottom: 30,
  },
  listContent: {
    paddingBottom: 8,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginBottom: 16,
    padding: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  conducteurInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  conducteurDetails: {
    flex: 1,
  },
  conducteurName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 13,
    color: "#6b7280",
    marginLeft: 6,
    marginRight: 16,
  },
  timeIcon: {
    marginLeft: 16,
  },
  time: {
    fontSize: 13,
    color: "#6b7280",
    marginLeft: 6,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 6,
  },
  cardContent: {
    marginTop: 8,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  amountTextContainer: {
    flex: 1,
  },
  amountLabel: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 4,
    fontWeight: "500",
  },
  montant: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  arrowIcon: {
    marginLeft: 12,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 11,
    color: "#9ca3af",
    fontWeight: "500",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#f3f4f6",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 48,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginTop: 16,
    borderWidth: 1.5,
    borderColor: "#f3f4f6",
    borderStyle: "dashed",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
  summarySection: {
    marginBottom: 40,
  },
  summaryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#f3f4f6",
  },
});