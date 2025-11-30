import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  FlatList,
  Platform,
} from "react-native";
// Ícones MaterialCommunityIcons
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// 1. ATUALIZAÇÃO DA TIPAGEM
type RootStackParamList = {
  EntregadorHome: undefined;
  EntregadorCarteira: undefined;
  EntregadorHistorico: undefined;
  EntregadorPerfil: undefined;
  // Adicionamos a nova tela e os parâmetros que ela aceita
  EntregadorDetalhesEntrega: {
    id: string;
    valor: string;
    data: string;
    loja: string;
    enderecoLoja: string;
    cliente: string;
    enderecoCliente: string;
    status: string;
  };
};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

// Dados Mockados - Em Andamento
const activeDeliveries = [
  {
    id: "1",
    storeName: "Drogasil - Taguatinga Norte",
    orderId: "#9921",
    fee: "R$ 8,50",
    status: "Coletando", 
    address: "QNB 12, Lote 5 - Taguatinga",
    date: "Hoje, 14:30",
  },
];

// Dados Mockados - Concluídas
const historyDeliveries = [
  {
    id: "10",
    storeName: "Farmácia Pague Menos",
    orderId: "#8842",
    fee: "R$ 12,90",
    status: "Entregue",
    address: "Av. Comercial Sul - Taguatinga",
    date: "Ontem, 19:45",
  },
  {
    id: "11",
    storeName: "Drogaria Rosário",
    orderId: "#8810",
    fee: "R$ 6,00",
    status: "Entregue",
    address: "QNA 30 - Taguatinga",
    date: "Ontem, 18:20",
  },
  {
    id: "12",
    storeName: "Drogasil - Centro",
    orderId: "#8755",
    fee: "R$ 9,50",
    status: "Cancelado",
    address: "Rua das Farmácias, 10",
    date: "08/09/2025",
  },
];

const EntregadorHistorico = () => {
  const navigation = useNavigation<navigationProp>();
  const [selectedTab, setSelectedTab] = useState<"active" | "history">("active");

  // Renderiza o item da lista
  const renderDeliveryItem = ({ item }: { item: any }) => {
    // Define cores e ícones baseados no status
    let statusColor = "#666";
    let statusIcon = "clock-outline";
    let statusBg = "#F0F0F0";

    if (item.status === "Entregue") {
      statusColor = "#4CAF50"; // Verde
      statusIcon = "check-circle-outline";
      statusBg = "#E8F5E9";
    } else if (item.status === "Cancelado") {
      statusColor = "#F44336"; // Vermelho
      statusIcon = "close-circle-outline";
      statusBg = "#FFEBEE";
    } else if (item.status === "Coletando" || item.status === "A caminho") {
      statusColor = "#FFB300"; // Laranja/Amarelo
      statusIcon = "bike";
      statusBg = "#FFF8E1";
    }

    return (
      // 2. ALTERADO DE VIEW PARA TOUCHABLEOPACITY
      <TouchableOpacity 
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => {
          // Navegação passando os parâmetros
          navigation.navigate('EntregadorDetalhesEntrega', {
            id: item.orderId,
            valor: item.fee,
            data: item.date,
            loja: item.storeName,
            // Como esses dados não existem no mock atual, passamos strings genéricas ou vazias
            enderecoLoja: "Endereço da Loja (Fixo)", 
            cliente: "Cliente Padrão",
            enderecoCliente: item.address,
            status: item.status
          });
        }}
      >
        {/* Cabeçalho do Card */}
        <View style={styles.cardHeader}>
          <Text style={styles.dateText}>{item.date}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
            <Icon name={statusIcon} size={14} color={statusColor} />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {item.status}
            </Text>
          </View>
        </View>

        {/* Corpo do Card */}
        <View style={styles.cardBody}>
          <View style={styles.storeRow}>
            <View style={styles.iconCircle}>
              <Icon name="store-outline" size={20} color="#6B98CE" />
            </View>
            <View>
              <Text style={styles.storeName}>{item.storeName}</Text>
              <Text style={styles.orderId}>Pedido {item.orderId}</Text>
            </View>
          </View>
          
          <View style={styles.addressRow}>
             <Icon name="map-marker-outline" size={16} color="#666" style={{marginRight: 5}}/>
             <Text style={styles.addressText}>{item.address}</Text>
          </View>
        </View>

        {/* Rodapé do Card */}
        <View style={styles.cardFooter}>
          <Text style={styles.feeLabel}>Ganho:</Text>
          <Text style={styles.feeValue}>{item.fee}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#6B98CE" />

      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>MINHAS ENTREGAS</Text>
      </View>

      {/* TABS (Em andamento / Histórico) */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === "active" && styles.tabActive]}
          onPress={() => setSelectedTab("active")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "active" && styles.tabTextActive,
            ]}
          >
            Em andamento
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, selectedTab === "history" && styles.tabActive]}
          onPress={() => setSelectedTab("history")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "history" && styles.tabTextActive,
            ]}
          >
            Concluídas
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO DA LISTA */}
      <View style={styles.contentContainer}>
        <FlatList
          data={selectedTab === "active" ? activeDeliveries : historyDeliveries}
          renderItem={renderDeliveryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="clipboard-text-off-outline" size={60} color="#CCC" />
              <Text style={styles.emptyText}>Nenhuma entrega encontrada.</Text>
            </View>
          }
        />
      </View>

      {/* BOTTOM TAB BAR */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('EntregadorHome')}
        >
          <Icon name="home-outline" size={24} color="#A9A9A9" />
          <Text style={styles.bottomTabText}>Início</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          {/* Ícone preenchido e cor azul para indicar seleção */}
          <Icon name="format-list-bulleted" size={28} color="#6B98CE" />
          <Text style={[styles.bottomTabText, styles.bottomTabTextSelected]}>Entregas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('EntregadorCarteira')}
        >
          <Icon name="wallet-outline" size={24} color="#A9A9A9" />
          <Text style={styles.bottomTabText}>Carteira</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('EntregadorPerfil')}
        >
          <Icon name="account-outline" size={24} color="#A9A9A9" />
          <Text style={styles.bottomTabText}>Perfil</Text>
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
    backgroundColor: "#6B98CE",
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
  
  // --- Tabs Superiores ---
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#6B98CE", // Azul ativo
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#888",
  },
  tabTextActive: {
    color: "#6B98CE",
  },

  // --- Lista ---
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  dateText: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 4,
  },
  cardBody: {
    marginBottom: 10,
  },
  storeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  orderId: {
    fontSize: 12,
    color: "#666",
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  addressText: {
    fontSize: 13,
    color: "#555",
    flex: 1,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 5,
  },
  feeLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 5,
  },
  feeValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32", // Verde Dinheiro
  },

  // --- Empty State ---
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyText: {
    marginTop: 10,
    color: "#888",
    fontSize: 16,
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

export default EntregadorHistorico;