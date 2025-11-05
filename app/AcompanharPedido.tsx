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
  FlatList,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// Ícones FontAwesome (para seta de voltar e marcador de mapa)
import Icon from "react-native-vector-icons/FontAwesome";
// Ícones Ionicons (para a Bottom Tab Bar)
import Ionicons from "react-native-vector-icons/Ionicons";

// Definição de Tipos para Navegação
type RootStackParamList = {
  MeusPedidos: undefined; // Rota para voltar para a lista de pedidos
  HomeTab: undefined;
  SacolaTab: undefined;
  PedidosTab: undefined; // Rota desta própria tela (selecionada)
  PerfilTab: undefined;
  PedidoConfirmado: undefined;
};

type AcompanharPedidoScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

// Dados mockados para as seções
const enderecoData = {
  endereco:
    "CNB 14, Taguatinga Norte, Número 225, 77777-55, Condomínio Boa Vista",
  cliente: "Fernando de Castro Júnior - 61 9 9406-2109",
};

const itensComprados = [
  {
    id: "1",
    nome: "Sabonete íntimo Nivea 250ml",
    preco: "R$ 8,90",
    quantidade: "2x",
    isDelivered: true,
  },
  {
    id: "2",
    nome: "Kit escova de dente Condor 2 unidades",
    preco: "R$ 8,90",
    quantidade: "",
    isDelivered: true,
  },
];

const rastreamentoData = [
  {
    id: "4",
    status: "O pedido chegou!",
    data: "08/09, às 21:15",
    current: true,
  },
  {
    id: "3",
    status: "O pedido saiu para entrega",
    data: "08/09, às 21:07",
    current: false,
  },
  {
    id: "2",
    status: "Entregador recolheu o pedido na farmácia",
    data: "08/09, às 21:07",
    current: false,
  },
  {
    id: "1",
    status: "Pedido criado e confirmado",
    data: "08/09, às 21:07",
    current: false,
  },
];

const produtosRelacionados = [
  {
    id: "r1",
    name: "Kit escova de dente Condor",
    store: "Drogasil",
    time: "5 - 10min",
    price: "R$ 9,90",
    image: "https://i.imgur.com/8Q9Z3v1.png",
  }, // Placeholder
  {
    id: "r2",
    name: "Sabonete íntimo Nivea 250ml",
    store: "Drogasil",
    time: "5 - 10min",
    price: "R$ 8,90",
    image: "https://i.imgur.com/G95M47z.png",
  }, // Placeholder
  {
    id: "r3",
    name: "Kit escova de dente Condor",
    store: "Drogasil",
    time: "5 - 10min",
    price: "R$ 9,90",
    image: "https://i.imgur.com/P4W4x1Q.png",
  }, // Placeholder
  {
    id: "r4",
    name: "Protetor Facial",
    store: "Drogasil",
    time: "5 - 10min",
    price: "R$ 49,90",
    image: "https://i.imgur.com/V7qW7Rj.png",
  }, // Placeholder
];

const AcompanharPedido = () => {
  const navigation = useNavigation<AcompanharPedidoScreenNavigationProp>();

  // Componente para renderizar um passo na Linha do Tempo
  const TimelineItem = ({ data, isLast }) => {
    // Cor dos elementos com base no status (current ou concluído)
    const iconColor = data.current ? "#0064E6" : "#A9A9A9";
    const textColor = data.current ? "#333" : "#666";

    return (
      <View style={styles.timelineItem}>
        {/* Lado Esquerdo: Data e Linha */}
        <View style={styles.timelineLeft}>
          <Text style={styles.timelineDate}>{data.data.split(",")[0]}</Text>
          <Text style={styles.timelineTime}>{data.data.split(",")[1]}</Text>
          {/* O círculo e a linha */}
          <View style={styles.timelineConnectorContainer}>
            <View
              style={[
                styles.timelineDot,
                { borderColor: iconColor, backgroundColor: iconColor },
              ]}
            />
            {!isLast && (
              <View
                style={[styles.timelineLine, { backgroundColor: iconColor }]}
              />
            )}
          </View>
        </View>

        {/* Lado Direito: Status */}
        <View style={styles.timelineRight}>
          <Text
            style={[
              styles.timelineStatus,
              { color: textColor, fontWeight: data.current ? "700" : "normal" },
            ]}
          >
            {data.status}
          </Text>
        </View>
      </View>
    );
  };

  // Componente para renderizar um item de produto relacionado
  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <View style={styles.productBadgeContainer}>
        {/* Simula o badge de desconto/oferta */}
        <Text style={styles.productBadgeText}>10</Text>
      </View>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productStore}>{item.store}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* CABEÇALHO */}
      <View style={styles.header}>
        {/* CORREÇÃO 1: Seta de voltar agora navega para a TelaInicial */}
        <TouchableOpacity
          onPress={() => navigation.navigate("PedidoConfirmado")}
          style={styles.backButton}
        >
          <Icon name="arrow-circle-left" size={32} color="#0064E6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ACOMPANHAR PEDIDO</Text>
      </View>

      <ScrollView style={styles.container}>
        {/* 1. ENDEREÇO DE ENTREGA */}
        <View style={styles.addressBlock}>
          <Icon
            name="map-marker"
            size={18}
            color="#0064E6"
            style={styles.addressIcon}
          />
          <View>
            <Text style={styles.addressTextBold}>{enderecoData.endereco}</Text>
            <Text style={styles.addressText}>{enderecoData.cliente}</Text>
          </View>
        </View>

        {/* 2. ITENS COMPRADOS */}
        <View style={styles.itemsBlock}>
          {itensComprados.map((item, index) => (
            <View key={item.id} style={styles.itemRow}>
              {/* Placeholder da imagem do produto */}
              <View style={styles.itemImagePlaceholder} />

              <View style={styles.itemTextContainer}>
                <Text style={styles.itemNome}>{item.nome}</Text>
                <Text style={styles.itemPreco}>{item.preco}</Text>
              </View>
              {item.quantidade ? (
                <Text style={styles.itemQuantidade}>{item.quantidade}</Text>
              ) : null}
            </View>
          ))}
        </View>

        {/* 3. LINHA DO TEMPO / RASTREAMENTO */}
        <View style={styles.timelineBlock}>
          {rastreamentoData.map((data, index) => (
            <TimelineItem
              key={data.id}
              data={data}
              isLast={index === rastreamentoData.length - 1}
            />
          ))}
        </View>

        {/* 4. COMPRE TAMBÉM / PRODUTOS RELACIONADOS */}
        <View style={styles.buyAlsoBlock}>
          <Text style={styles.buyAlsoTitle}>Compre também</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={produtosRelacionados}
            keyExtractor={(item) => item.id}
            renderItem={renderProductItem}
            contentContainerStyle={styles.productList}
          />
        </View>

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
    backgroundColor: "#F0F2F5",
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

  // --- 1. Endereço ---
  addressBlock: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    margin: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  addressIcon: {
    marginRight: 10,
  },
  addressTextBold: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    lineHeight: 20,
  },
  addressText: {
    fontSize: 12,
    color: "#666",
  },

  // --- 2. Itens Comprados ---
  itemsBlock: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 15,
    padding: 15,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  itemImagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: "#EEEEEE",
    borderRadius: 5,
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemNome: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  itemPreco: {
    fontSize: 14,
    color: "#0064E6",
    fontWeight: "700",
  },
  itemQuantidade: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },

  // --- 3. Linha do Tempo / Rastreamento ---
  timelineBlock: {
    marginHorizontal: 15,
    marginBottom: 20,
    paddingLeft: 10, // Espaçamento para o visual da linha
  },
  timelineItem: {
    flexDirection: "row",
    minHeight: 60, // Altura mínima para cada passo
  },
  timelineLeft: {
    width: 80, // Largura para data/hora e conector
    alignItems: "flex-end",
    paddingRight: 15,
    position: "relative",
  },
  timelineDate: {
    fontSize: 12,
    color: "#666",
  },
  timelineTime: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  timelineConnectorContainer: {
    position: "absolute",
    left: 80, // Ajusta o conector para a linha central
    top: 5, // Posição vertical
    bottom: -10, // Estende a linha para o próximo item
    alignItems: "center",
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    backgroundColor: "#FFF",
    zIndex: 10,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 5,
    marginBottom: 0,
  },
  timelineRight: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20, // Espaçamento da linha
  },
  timelineStatus: {
    fontSize: 16,
    color: "#333",
  },

  // --- 4. Compre Também ---
  buyAlsoBlock: {
    paddingLeft: 15,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  buyAlsoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  productList: {
    paddingRight: 15, // Espaçamento final
  },
  productCard: {
    width: 120,
    marginRight: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 5,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    position: "relative",
  },
  productBadgeContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#F3675E", // Vermelho para destaque
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    zIndex: 5,
  },
  productBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  productImage: {
    width: "100%",
    height: 80,
    marginBottom: 8,
  },
  productName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
    minHeight: 30,
  },
  productStore: {
    fontSize: 10,
    color: "#666",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0064E6",
    marginTop: 5,
  },
  // --- Estilos da Bottom Tab Bar (Reutilizados) ---
  bottomTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingVertical: 10,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
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
    color: "#0064E6",
    fontWeight: "600",
  },
});

export default AcompanharPedido;
