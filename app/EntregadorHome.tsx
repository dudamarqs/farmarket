import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  Platform,
  Alert,
} from "react-native";
// Usando MaterialCommunityIcons para ícones mais modernos de entregas/moto
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Definição das rotas (Exemplo)
type RootStackParamList = {
  EntregadorHome: undefined;
  EntregadorCarteira: undefined;
  EntregadorHistorico: undefined;
  EntregadorPerfil: undefined;
  DetalheEntrega: { id: string };
};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

// Dados Mockados de Entregas Disponíveis
const availableDeliveries = [
  {
    id: "1",
    storeName: "Drogasil - Taguatinga Norte",
    distance: "2.5 km",
    fee: "R$ 8,50",
    address: "QNB 12, Lote 5",
    items: 3,
    time: "15-20 min",
  },
  {
    id: "2",
    storeName: "Farmácia Pague Menos",
    distance: "4.1 km",
    fee: "R$ 12,90",
    address: "Av. Comercial Sul",
    items: 1,
    time: "25-30 min",
  },
  {
    id: "3",
    storeName: "Drogaria Rosário",
    distance: "1.2 km",
    fee: "R$ 6,00",
    address: "QNA 30, Lote 1",
    items: 5,
    time: "10-15 min",
  },
];

const EntregadorHome = () => {
  const navigation = useNavigation<navigationProp>();
  const [isOnline, setIsOnline] = useState(true); // Estado Online/Offline
  const [balance, setBalance] = useState("150,50"); // Saldo Mockado

  // Renderiza cada card de entrega
  const renderDeliveryItem = ({ item }: { item: typeof availableDeliveries[0] }) => (
    <View style={styles.deliveryCard}>
      <View style={styles.cardHeader}>
        <View style={styles.storeInfo}>
          <View style={styles.storeIconContainer}>
            <Icon name="store-outline" size={20} color="#6B98CE" />
          </View>
          <View>
            <Text style={styles.storeName}>{item.storeName}</Text>
            <Text style={styles.deliveryAddress}>{item.address}</Text>
          </View>
        </View>
        <Text style={styles.deliveryFee}>{item.fee}</Text>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailItem}>
          <Icon name="map-marker-distance" size={16} color="#666" />
          <Text style={styles.detailText}>{item.distance}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="clock-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="package-variant-closed" size={16} color="#666" />
          <Text style={styles.detailText}>{item.items} itens</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.acceptButton}
        onPress={() => Alert.alert("Sucesso", "Entrega aceita! Dirija-se ao estabelecimento.")}
      >
        <Text style={styles.acceptButtonText}>ACEITAR ENTREGA</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#6B98CE" />

      {/* CABEÇALHO SUPERIOR */}
      <View style={styles.headerContainer}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: "https://picsum.photos/seed/entregador/100/100" }} // Imagem mockada
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.welcomeText}>Olá, Entregador</Text>
            <TouchableOpacity onPress={() => setIsOnline(!isOnline)}>
              <Text style={[styles.statusText, isOnline ? styles.online : styles.offline]}>
                {isOnline ? "● Disponível para entregas" : "○ Offline"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="bell-outline" size={24} color="#FFFFFF" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* WIDGET DA CARTEIRA */}
        <View style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <Text style={styles.walletTitle}>Saldo disponível</Text>
            <Icon name="wallet-outline" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.walletBalance}>R$ {balance}</Text>
          
          <View style={styles.walletActions}>
            <TouchableOpacity 
              style={styles.walletActionButton}
              onPress={() => Alert.alert("Saque", "Funcionalidade de saque iniciada.")}
            >
              <Icon name="cash-fast" size={20} color="#6B98CE" />
              <Text style={styles.walletActionText}>Sacar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.walletActionButton, styles.secondaryAction]}
              // onPress={() => navigation.navigate('EntregadorCarteira')}
            >
              <Icon name="history" size={20} color="#FFFFFF" />
              <Text style={styles.secondaryActionText}>Extrato</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SEÇÃO DE ENTREGAS DISPONÍVEIS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Entregas na sua região</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Atualizar lista</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Entregas */}
        {isOnline ? (
          availableDeliveries.map((item) => (
            <View key={item.id}>
              {renderDeliveryItem({ item })}
            </View>
          ))
        ) : (
          <View style={styles.offlineContainer}>
            <Icon name="motorbike-off" size={60} color="#CCC" />
            <Text style={styles.offlineText}>Você está offline.</Text>
            <Text style={styles.offlineSubText}>Fique disponível para ver novas entregas.</Text>
            <TouchableOpacity 
              style={styles.goOnlineButton}
              onPress={() => setIsOnline(true)}
            >
              <Text style={styles.goOnlineText}>FICAR ONLINE</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* BARRA DE NAVEGAÇÃO INFERIOR */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="home" size={28} color="#6B98CE" />
          <Text style={[styles.tabText, styles.tabTextSelected]}>Início</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('EntregadorHistorico')}
        >
          <Icon name="format-list-bulleted" size={24} color="#A9A9A9" />
          <Text style={styles.tabText}>Entregas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('EntregadorCarteira')}
        >
          <Icon name="wallet" size={24} color="#A9A9A9" />
          <Text style={styles.tabText}>Carteira</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('EntregadorPerfil')}
        >
          <Icon name="account" size={24} color="#A9A9A9" />
          <Text style={styles.tabText}>Perfil</Text>
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
  // --- Header ---
  headerContainer: {
    backgroundColor: "#6B98CE", // Azul do tema Entregador
    padding: 20,
    paddingTop: Platform.OS === "android" ? 40 : 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginRight: 12,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },
  online: { color: "#81C784" }, // Verde claro
  offline: { color: "#E0E0E0" }, // Cinza claro
  
  notificationButton: {
    padding: 5,
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    backgroundColor: "#FFB300", // Laranja destaque
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#6B98CE",
  },

  // --- Conteúdo ---
  scrollContent: {
    padding: 20,
    paddingBottom: 80, // Espaço para a TabBar
  },

  // --- Carteira ---
  walletCard: {
    backgroundColor: "#6B98CE",
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  walletHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  walletTitle: {
    color: "#E3F2FD",
    fontSize: 14,
    fontWeight: "600",
  },
  walletBalance: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 20,
  },
  walletActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  walletActionButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  walletActionText: {
    color: "#6B98CE",
    fontWeight: "700",
    marginLeft: 5,
    fontSize: 16,
  },
  secondaryAction: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginRight: 0,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  secondaryActionText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 5,
    fontSize: 16,
  },

  // --- Seção Entregas ---
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  seeAllText: {
    color: "#6B98CE",
    fontWeight: "600",
  },

  // --- Card de Entrega ---
  deliveryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  storeInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  storeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F7FF", // Fundo azul bem claro
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  deliveryAddress: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  deliveryFee: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32", // Verde Dinheiro
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginLeft: 5,
    color: "#555",
    fontSize: 13,
    fontWeight: "500",
  },
  acceptButton: {
    backgroundColor: "#000000",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  acceptButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  // --- Estado Offline ---
  offlineContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
  },
  offlineText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#555",
    marginTop: 10,
  },
  offlineSubText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  goOnlineButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "#6B98CE",
    borderRadius: 20,
  },
  goOnlineText: {
    color: "#FFFFFF",
    fontWeight: "700",
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
  tabText: {
    fontSize: 10,
    color: "#A9A9A9",
    marginTop: 4,
    fontWeight: "600",
  },
  tabTextSelected: {
    color: "#6B98CE",
  },
});

export default EntregadorHome;