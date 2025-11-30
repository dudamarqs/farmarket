import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Definição das rotas
type RootStackParamList = {
  EntregadorHome: undefined;
  EntregadorCarteira: undefined;
  EntregadorHistorico: undefined;
  EntregadorPerfil: undefined;
  LoginEmail: undefined; // Para logout
};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

// Dados Mockados do Entregador
const driverProfile = {
  name: "Fernando de Castro",
  rating: "4.95",
  deliveries: "1.2k",
  joinedDate: "Membro desde 2023",
  photo: "https://picsum.photos/seed/entregador/200/200", // Imagem aleatória
  vehicle: "Honda CG 160 - Placa JKL-1234",
};

const EntregadorPerfil = () => {
  const navigation = useNavigation<navigationProp>();

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Deseja realmente sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive", 
          onPress: () => navigation.navigate("LoginEmail") 
        }
      ]
    );
  };

  // Componente de Item do Menu
  const MenuItem = ({ icon, label, onPress, isDestructive = false }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <View style={[styles.iconContainer, isDestructive && styles.iconDestructive]}>
          <Icon name={icon} size={22} color={isDestructive ? "#E53935" : "#6B98CE"} />
        </View>
        <Text style={[styles.menuLabel, isDestructive && styles.textDestructive]}>
          {label}
        </Text>
      </View>
      <Icon name="chevron-right" size={24} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#6B98CE" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER DO PERFIL */}
        <View style={styles.headerContainer}>
          <View style={styles.profileInfo}>
            <Image source={{ uri: driverProfile.photo }} style={styles.avatar} />
            <View>
              <Text style={styles.name}>{driverProfile.name}</Text>
              <Text style={styles.joinedDate}>{driverProfile.joinedDate}</Text>
              
              <View style={styles.ratingContainer}>
                <View style={styles.ratingBadge}>
                  <Icon name="star" size={14} color="#FFB300" />
                  <Text style={styles.ratingText}>{driverProfile.rating}</Text>
                </View>
                <Text style={styles.deliveryCount}>• {driverProfile.deliveries} entregas</Text>
              </View>
            </View>
          </View>
        </View>

        {/* SEÇÃO CONTA */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Minha Conta</Text>
          <View style={styles.card}>
            <MenuItem 
              icon="account-edit-outline" 
              label="Meus Dados" 
              onPress={() => console.log("Editar dados")} 
            />
            <View style={styles.divider} />
            <MenuItem 
              icon="motorbike" 
              label="Meu Veículo" 
              onPress={() => console.log("Editar veículo")} 
            />
            <View style={styles.divider} />
            <MenuItem 
              icon="bank-outline" 
              label="Dados Bancários" 
              onPress={() => navigation.navigate("EntregadorCarteira")} 
            />
          </View>
        </View>

        {/* SEÇÃO PREFERÊNCIAS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Preferências</Text>
          <View style={styles.card}>
            <MenuItem 
              icon="bell-outline" 
              label="Notificações" 
              onPress={() => console.log("Notificações")} 
            />
            <View style={styles.divider} />
            <MenuItem 
              icon="map-marker-radius-outline" 
              label="Região de Atuação" 
              onPress={() => console.log("Região")} 
            />
          </View>
        </View>

        {/* SEÇÃO SUPORTE E SAIR */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Outros</Text>
          <View style={styles.card}>
            <MenuItem 
              icon="help-circle-outline" 
              label="Ajuda e Suporte" 
              onPress={() => console.log("Ajuda")} 
            />
            <View style={styles.divider} />
            <MenuItem 
              icon="logout" 
              label="Sair da conta" 
              isDestructive 
              onPress={handleLogout} 
            />
          </View>
        </View>

        <Text style={styles.versionText}>Versão 1.0.0</Text>
        
        {/* Espaço extra para não ficar atrás da TabBar */}
        <View style={{ height: 60 }} />
      </ScrollView>

      {/* BOTTOM TAB BAR */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('EntregadorHome')}
        >
          <Icon name="home-outline" size={24} color="#A9A9A9" />
          <Text style={styles.bottomTabText}>Início</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('EntregadorHistorico')}
        >
          <Icon name="format-list-bulleted" size={24} color="#A9A9A9" />
          <Text style={styles.bottomTabText}>Entregas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('EntregadorCarteira')}
        >
          <Icon name="wallet-outline" size={24} color="#A9A9A9" />
          <Text style={styles.bottomTabText}>Carteira</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          {/* Ícone preenchido e cor azul para indicar seleção */}
          <Icon name="account" size={28} color="#6B98CE" />
          <Text style={[styles.bottomTabText, styles.bottomTabTextSelected]}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// =======================================================
// ESTILOS
// =======================================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F2F5",
  },
  scrollContent: {
    flexGrow: 1,
  },
  
  // --- Header ---
  headerContainer: {
    backgroundColor: "#6B98CE",
    paddingTop: Platform.OS === "android" ? 40 : 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    marginRight: 15,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 2,
  },
  joinedDate: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  ratingText: {
    color: "#333",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 4,
  },
  deliveryCount: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  // --- Seções ---
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#666",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  // --- Itens do Menu ---
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconDestructive: {
    backgroundColor: "#FFEBEE",
  },
  menuLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  textDestructive: {
    color: "#E53935",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginLeft: 63, // Alinhado com o texto
  },

  versionText: {
    textAlign: "center",
    color: "#AAA",
    fontSize: 12,
    marginBottom: 20,
  },

  // --- Bottom Tab Bar ---
  bottomTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingVertical: 10,
    paddingBottom: Platform.OS === "ios" ? 25 : 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: "center",
    flex: 1,
  },
  bottomTabText: {
    fontSize: 10,
    color: "#A9A9A9",
    marginTop: 4,
    fontWeight: "600",
  },
  bottomTabTextSelected: {
    color: "#6B98CE",
  },
});

export default EntregadorPerfil;