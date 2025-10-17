import React, { useState } from 'react';
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
  Modal, // Importe o Modal
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons'; // Usando Ionicons para mais opções

// Definindo o tipo do produto para type safety
type ProductType = {
  id: string;
  name: string;
  store: string;
  time: string;
  originalPrice?: string;
  price: string;
  image: any; // O tipo real pode variar dependendo de como você carrega as imagens
};

// Atualize sua lista de rotas para incluir esta tela e seus parâmetros
type RootStackParamList = {
  MarketplaceHome: undefined;
  ProductDetail: { product: ProductType };
  SacolaTab: undefined; // Rota para o botão "ver sacola"
  SacolaScreen: undefined;
};

// Dados mockados para "Mais produtos da Drogasil"
const relatedProducts = [
    { id: 'h3', name: 'Kit escova de dente Condor', price: 'R$ 8,50', originalPrice: 'R$ 9,90', store: 'Drogasil', time: '5-10min', image: require('../assets/images/img.png') },
    { id: 'h2', name: 'Sabonete íntimo Nivea 250ml', price: 'R$ 22,90', originalPrice: 'R$ 25,00', store: 'Drogasil', time: '5-10min', image: require('../assets/images/img.png') },
    { id: 'm4', name: 'Dorflex', price: 'R$ 11,99', originalPrice: 'R$ 14,00', store: 'Drogasil', time: '5-10min', image: require('../assets/images/img.png') },
    { id: 'v1', name: 'Vitamina C Redoxon 30cp', price: 'R$ 35,00', originalPrice: 'R$ 39,90', store: 'Drogasil', time: '5-10min', image: require('../assets/images/img.png') },
];

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProductDetailScreen = () => {
  const navigation = useNavigation<ProductDetailNavigationProp>();
  const route = useRoute<ProductDetailRouteProp>();
  const { product } = route.params; // Recebe o produto da tela anterior

  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para o pop-up

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleAddToCart = () => {
    // Aqui você adicionaria a lógica para adicionar o produto ao carrinho
    console.log(`Adicionado ${quantity}x ${product.name} ao carrinho.`);
    setIsModalVisible(true); // Mostra o pop-up de confirmação
  };

  const renderRelatedProduct = ({ item }: { item: ProductType }) => (
    <TouchableOpacity style={styles.relatedProductCard}>
      <Image source={item.image} style={styles.relatedProductImage} resizeMode="contain" />
      <Text numberOfLines={2} style={styles.relatedProductName}>{item.name}</Text>
      {item.originalPrice && <Text style={styles.relatedOriginalPrice}>{item.originalPrice}</Text>}
      <Text style={styles.relatedPrice}>{item.price}</Text>
      <Text style={styles.relatedStore}>{item.store}</Text>
      <Text style={styles.relatedTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Cabeçalho Customizado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-circle" size={32} color="#0064E6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <Image source={product.image} style={styles.productImage} resizeMode="contain" />

        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.priceContainer}>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>{product.originalPrice}</Text>
            )}
            <Text style={styles.currentPrice}>{product.price}</Text>
          </View>

          <View style={styles.storeInfoContainer}>
            <Icon name="location-outline" size={16} color="#555" />
            <Text style={styles.storeText}>Drogasil Taguatinga Sul</Text>
            <Text style={styles.deliveryInfo}> • 5 - 10min • </Text>
            <Text style={styles.freeShipping}>Grátis</Text>
          </View>
        </View>

        {/* Mais produtos */}
        <View style={styles.relatedSection}>
          <Text style={styles.relatedTitle}>Mais produtos da {product.store}</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={relatedProducts}
            keyExtractor={(item) => item.id}
            renderItem={renderRelatedProduct}
            contentContainerStyle={{ paddingLeft: 20 }}
          />
        </View>
      </ScrollView>

      {/* Footer Fixo */}
      <View style={styles.footer}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Adicionar</Text>
          {/* Lógica para calcular o preço total */}
          <Text style={styles.addButtonPrice}>
            R$ {(parseFloat(product.price.replace('R$ ', '').replace(',', '.')) * quantity).toFixed(2).replace('.', ',')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Confirmação */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Icon name="close" size={24} color="#888" />
            </TouchableOpacity>
            <Icon name="alert-circle-outline" size={32} color="#FFB300" style={{ marginBottom: 10 }} />
            <Text style={styles.modalText}>Seu produto foi adicionado à sua sacola.</Text>
            <TouchableOpacity
              style={styles.viewCartButton}
              onPress={() => {
                setIsModalVisible(false);
                navigation.navigate('SacolaTab'); // Navega para a tela da sacola
              }}
            >
              <Text style={styles.viewCartButtonText}>ver sacola</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { padding: 15, backgroundColor: '#FFFFFF', alignItems: 'flex-start' },
  backButton: { padding: 5 },
  container: { flex: 1, backgroundColor: '#F0F2F5' },
  productImage: { width: '100%', height: 300, backgroundColor: '#FFFFFF' },
  infoContainer: { padding: 20, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  productName: { fontSize: 22, fontWeight: '700', color: '#333', marginBottom: 10 },
  priceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  originalPrice: { fontSize: 16, color: '#999', textDecorationLine: 'line-through', marginRight: 10 },
  currentPrice: { fontSize: 24, fontWeight: 'bold', color: '#D32F2F' },
  storeInfoContainer: { flexDirection: 'row', alignItems: 'center', padding: 15, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8 },
  storeText: { marginLeft: 8, fontSize: 14, color: '#555' },
  deliveryInfo: { fontSize: 14, color: '#555' },
  freeShipping: { fontSize: 14, color: '#4CAF50', fontWeight: 'bold' },
  relatedSection: { backgroundColor: '#FFFFFF', paddingTop: 20, marginTop: 10 },
  relatedTitle: { fontSize: 18, fontWeight: 'bold', color: '#0064E6', marginBottom: 15, paddingHorizontal: 20 },
  relatedProductCard: { width: 140, marginRight: 15, marginBottom: 20 },
  relatedProductImage: { width: '100%', height: 90, borderRadius: 8, backgroundColor: '#F0F2F5', marginBottom: 8 },
  relatedProductName: { fontSize: 13, fontWeight: '600', color: '#333' },
  relatedOriginalPrice: { fontSize: 11, color: '#999', textDecorationLine: 'line-through' },
  relatedPrice: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  relatedStore: { fontSize: 11, color: '#777' },
  relatedTime: { fontSize: 11, color: '#777' },
  footer: { flexDirection: 'row', alignItems: 'center', padding: 15, borderTopWidth: 1, borderTopColor: '#E0E0E0', backgroundColor: '#FFFFFF' },
  quantitySelector: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8 },
  quantityButton: { paddingHorizontal: 15, paddingVertical: 10 },
  quantityButtonText: { fontSize: 20, color: '#D32F2F', fontWeight: 'bold' },
  quantityText: { fontSize: 18, fontWeight: 'bold', paddingHorizontal: 15 },
  addButton: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#D32F2F', borderRadius: 8, padding: 15, marginLeft: 15 },
  addButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  addButtonPrice: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  // Estilos do Modal
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)' },
  modalContent: { width: '85%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  closeButton: { position: 'absolute', top: 10, left: 15 },
  modalText: { fontSize: 18, fontWeight: '600', color: '#333', textAlign: 'center', marginBottom: 20, marginTop: 5 },
  viewCartButton: { backgroundColor: '#FFC107', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 40 },
  viewCartButtonText: { color: '#333', fontSize: 16, fontWeight: 'bold' },
});

export default ProductDetailScreen;