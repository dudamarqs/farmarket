import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// Ícones FontAwesome para a seta de voltar
import Icon from "react-native-vector-icons/FontAwesome";
// Ícones Ionicons para a Bottom Tab Bar
import Ionicons from "react-native-vector-icons/Ionicons";

// Definição de Tipos para Navegação (Adaptada ao contexto de um App)
type RootStackParamList = {
  TelaAnterior: undefined; // Rota genérica para voltar
  HomeTab: undefined;
  SacolaTab: undefined;
  MeusPedidos: undefined; // Rota desta própria tela (selecionada)
  PerfilTab: undefined;
  MarketplaceHome: undefined;
  DetalhePedido: { pedidoId: string };
};

type MeusPedidosScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

// Dados estáticos do pedido para simular a tela
const mockPedido = {
  id: "#334455",
  data: "10/08/2025",
  status: "Em processo de entrega",
  descricao: "Sabonete íntimo Nivea 250ml 2x",
  imagemProduto: "https://i.imgur.com/G95M47z.png", // URL de exemplo
};

const MeusPedidos = () => {
  const navigation = useNavigation<MeusPedidosScreenNavigationProp>();

  // Componente para renderizar um item de pedido
  const PedidoItem = ({ pedido }) => (
    <View style={styles.pedidoCard}>
      {/* Linha 1: Número do Pedido e Data */}
      <View style={styles.pedidoHeader}>
        <Text style={styles.pedidoTextBold}>Pedido: {pedido.id}</Text>
        <Text style={styles.pedidoText}>Data: {pedido.data}</Text>
      </View>

      {/* Linha 2: Status */}
      <View style={styles.separator} />
      <View style={styles.statusRow}>
        <Text style={styles.statusLabel}>Status:</Text>
        <Text style={styles.statusValue}>{pedido.status}</Text>
      </View>

      {/* Linha 3: Visualizar Nota Fiscal (Link/Botão) */}
      <View style={styles.separator} />
      <TouchableOpacity onPress={() => console.log("Visualizar Nota Fiscal")}>
        <Text style={styles.visualizarNota}>Visualizar nota fiscal</Text>
      </TouchableOpacity>

      {/* Linha 4: Item e Imagem */}
      <View style={styles.separator} />
      <View style={styles.itemRow}>
        <Text style={styles.itemDescription} numberOfLines={2}>
          {pedido.descricao}
        </Text>
        {/* Imagem do produto */}
        <Image
          source={{ uri: pedido.imagemProduto }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      {/* Linha 5: Botão Acompanhar Pedido */}
      <TouchableOpacity
        style={styles.acompanharButton}
        onPress={() =>
          navigation.navigate("DetalhePedido", { pedidoId: pedido.id })
        }
      >
        <Text style={styles.acompanharButtonText}>acompanhar pedido</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* CABEÇALHO SUPERIOR */}
      <View style={styles.header}>
        {/* CORREÇÃO 1: Seta de voltar agora navega para a TelaInicial */}
        <TouchableOpacity
          onPress={() => navigation.navigate("MarketplaceHome")}
          style={styles.backButton}
        >
          <Icon name="arrow-circle-left" size={32} color="#0064E6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MEUS PEDIDOS</Text>
      </View>

      <ScrollView style={styles.container}>
        {/* Barra de Busca */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar pedido..."
            placeholderTextColor="#A9A9A9"
          />
          <Icon
            name="search"
            size={18}
            color="#A9A9A9"
            style={styles.searchIcon}
          />
        </View>

        {/* Filtros */}
        <View style={styles.filtersContainer}>
          <Text style={styles.filterPeriodText}>
            Período:{" "}
            <Text style={styles.filterPeriodValue}>Últimos 3 meses</Text>
          </Text>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Filtrar pedidos</Text>
            <Icon
              name="caret-down"
              size={14}
              color="#0064E6"
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>

        {/* LISTA DE PEDIDOS */}
        <PedidoItem pedido={mockPedido} />

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* BARRA DE NAVEGAÇÃO INFERIOR (BOTTOM TAB BAR) */}
      <View style={styles.bottomTabBar}>
        {/* Home */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("HomeTab")}
        >
          <Ionicons name="home-outline" size={24} color="#888" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        {/* Sacola */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("SacolaTab")}
        >
          <Ionicons name="bag-handle-outline" size={24} color="#888" />
          <Text style={styles.tabText}>Sacola</Text>
        </TouchableOpacity>
        {/* Pedidos (Selecionado) */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => console.log("Pedidos (Já nesta tela)")}
        >
          <Ionicons name="receipt" size={24} color="#0064E6" />
          <Text style={[styles.tabText, styles.tabTextSelected]}>Pedidos</Text>
        </TouchableOpacity>
        {/* Perfil */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("PerfilTab")}
        >
          <Ionicons name="person-outline" size={24} color="#888" />
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
    backgroundColor: "#F0F2F5", // Fundo da tela
  },
  container: {
    flex: 1,
  },
  // --- Estilos do Cabeçalho Superior ---
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: { position: "absolute", left: 15, padding: 5 },
  headerTitle: {
    color: "#0064E6",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },

  // --- Estilos da Busca e Filtros ---
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    paddingHorizontal: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 14,
    color: "#333",
  },
  searchIcon: {
    marginLeft: 5,
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    paddingVertical: 10,
  },
  filterPeriodText: {
    fontSize: 14,
    color: "#333",
  },
  filterPeriodValue: {
    fontWeight: "700",
    color: "#FFB300",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#0064E6",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  filterButtonText: {
    color: "#0064E6",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 5,
  },
  filterIcon: {
    marginLeft: 5,
  },

  // --- Estilos do Card de Pedido ---
  pedidoCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  pedidoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  pedidoText: {
    fontSize: 14,
    color: "#666",
  },
  pedidoTextBold: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 10,
  },
  statusRow: {
    flexDirection: "row",
  },
  statusLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 5,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
  },
  visualizarNota: {
    fontSize: 14,
    color: "#0064E6",
    textDecorationLine: "underline",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  itemDescription: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    marginRight: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DCDCDC",
  },
  acompanharButton: {
    backgroundColor: "#0064E6",
    borderRadius: 5,
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 5,
  },
  acompanharButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },

  // --- Estilos da Bottom Tab Bar ---
  bottomTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingVertical: 10,
    paddingBottom: Platform.OS === "ios" ? 20 : 10, // Ajuste para safe area do iOS
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  tabTextSelected: {
    color: "#0064E6", // Cor do texto quando selecionado
    fontWeight: "600",
  },
});

export default MeusPedidos;
