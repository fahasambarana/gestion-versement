import axios from "axios";
import { Platform } from "react-native";

// ⚠️ Mets ici ton IP locale (celle de ton PC)
const LOCAL_PC_IP = "192.168.0.29"; 

// Sélection automatique selon plateforme
const baseURL =
  Platform.OS === "android"
    ? "http://10.0.2.2:5000/api" // émulateur Android
    : Platform.OS === "ios"
    ? "http://localhost:5000/api" // simulateur iOS
    : `http://${LOCAL_PC_IP}:5000/api`; // vrai téléphone

const api = axios.create({
  baseURL,
  timeout: 5000,
});

export default api;
