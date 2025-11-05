import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
  FlatList, // Usado para renderizar a lista de produtos
  Alert, // Para feedback ao usuário
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Ícones MaterialCommunityIcons
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Definindo as rotas para navegação
type RootStackParamList = {
  Home: undefined; // Para poder voltar para a Home
  Produtos: undefined; // A própria tela de Produtos
  AdicionarProduto: undefined; // Rota para adicionar novo produto
  EditarProduto: { productId: string }; // Rota para editar, passando o ID do produto
};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

// --- DADOS MOCK (SIMULADOS) DE PRODUTOS ---
interface Product {
  id: string;
  name: string;
  price: string;
  stock: number;
}

const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Sabonete Íntimo Nivea 250ml", price: "R$ 16,90", stock: 35 },
  { id: "2", name: "Creme de Rosto Nivea 250ml", price: "R$ 16,90", stock: 22 },
  { id: "3", name: "Sabonete Íntimo Nivea 250ml", price: "R$ 16,90", stock: 30 },
  { id: "4", name: "Sabonete Íntimo Nivea 250ml", price: "R$ 16,90", stock: 35 },
  { id: "5", name: "Sabonete Íntimo Nivea 250ml", price: "R$ 16,90", stock: 28 },
  { id: "6", name: "Sabonete Íntimo Nivea 250ml", price: "R$ 16,90", stock: 30 },
  { id: "7", name: "Sabonete Íntimo Nivea 250ml", price: "R$ 16,90", stock: 35 },
  { id: "8", name: "Sabonete Íntimo Nivea 250ml", price: "R$ 16,90", stock: 31 },
  { id: "9", name: "Sabonete Íntimo Nivea 250ml", price: "R$ 16,90", stock: 30 },
  // Adicione mais produtos conforme necessário
];

const ProdutosScreen = () => {
  const navigation = useNavigation<navigationProp>();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS); // Estado para a lista de produtos

  // Função de busca
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Renderiza cada item do produto na grade
  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      {/* Imagem do produto - placeholder */}
      <View style={styles.productImagePlaceholder} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <Text style={styles.productStock}>{item.stock} em estoque</Text>
      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => navigation.navigate("EditarProduto-FN", { product: item })}
        // Na vida real: onPress={() => navigation.navigate("EditarProduto", { productId: item.id })}
      >
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F2F5" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left-circle" size={32} color="#0064E6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PRODUTOS</Text>
      </View>

      {/* Botão Adicionar Novo Produto */}
      <View style={styles.topActionContainer}>
        <TouchableOpacity 
          style={styles.addNewProductButton}
          onPress={() => navigation.navigate("AdicionarProduto-FN")}
        >
          <Icon name="plus-circle-outline" size={24} color="#FFFFFF" style={styles.addNewProductIcon} />
          <Text style={styles.addNewProductButtonText}>Adicionar novo produto</Text>
        </TouchableOpacity>
      </View>

      {/* Seção de produtos catalogados */}
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitleHighlight}>Produtos catalogados</Text>

        {/* Campo de Busca */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar produto"
            placeholderTextColor="#A9A9A9"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Icon name="magnify" size={24} color="#A9A9A9" style={styles.searchIcon} />
        </View>

        {/* Lista de Produtos (Grid) */}
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={3} // 3 colunas por linha
          columnWrapperStyle={styles.row} // Estilo para as linhas (espaçamento)
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

// Estilos
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F2F5",
  },
  // --- Header Styles ---
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    position: "absolute",
    left: 15,
    padding: 5,
  },
  headerTitle: {
    color: "#0064E6",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
  // --- Botão Adicionar Novo Produto ---
  topActionContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: "#F0F2F5", // Mantém o fundo consistente
  },
  addNewProductButton: {
    flexDirection: 'row',
    backgroundColor: "#0064E6", // Azul principal
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  addNewProductIcon: {
    marginRight: 8,
  },
  addNewProductButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  // --- Conteúdo Principal (Produtos) ---
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F0F2F5",
  },
  sectionTitleHighlight: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFB300", // Laranja/Amarelo de destaque
    marginBottom: 15,
  },
  // --- Campo de Busca ---
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  searchIcon: {
    marginLeft: 8,
  },
  // --- Lista de Produtos (FlatList/Grid) ---
  productList: {
    paddingBottom: 20, // Espaçamento para o final da lista
  },
  row: {
    justifyContent: 'space-between', // Espaço entre as colunas
    marginBottom: 10, // Espaço entre as linhas
  },
  productCard: {
    width: "32%", // Aproximadamente 1/3 da largura, descontando o espaçamento
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: 'space-between',
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  productImagePlaceholder: {
    width: "100%",
    height: 70, // Altura fixa para o placeholder da imagem
    backgroundColor: "#E0E0E0", // Cor cinza claro
    borderRadius: 6,
    marginBottom: 5,
  },
  productName: {
    fontSize: 12, // Menor para caber mais texto
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0064E6", // Preço em azul
    marginBottom: 2,
  },
  productStock: {
    fontSize: 10, // Ainda menor
    color: "#666",
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: "#666666", // Cinza para o botão de editar
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: "90%", // Ocupa quase a largura do card
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default ProdutosScreen;