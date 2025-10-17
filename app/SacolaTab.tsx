import React, { useState, useEffect } from 'react';
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
  Modal, // 1. Importe o Modal
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Tipos para navegação
type RootStackParamList = {
  MarketplaceHome: undefined;
  Sacola: undefined;
};
type SacolaScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Tipo para os produtos
type ProductType = {
  id: string;
  name: string;
  price: number;
  image: any;
  quantity: number;
};

// Dados mockados
const initialCartItems: ProductType[] = [
  { id: 'h2', name: 'Sabonete Íntimo Nivea 250ml', price: 8.90, image: require('../assets/images/img.png'), quantity: 2 },
  { id: 'h3', name: 'Kit escova de dente Condor 2 unidades', price: 8.90, image: require('../assets/images/img.png'), quantity: 1 },
];

const suggestedProducts = [
    { id: 'h3_s', name: 'Kit escova de dente Condor', price: 8.90, store: 'Drogasil', time: '5-10min', image: require('../assets/images/img.png') },
    { id: 'h2_s', name: 'Sabonete Íntimo Nivea 250ml', price: 8.90, store: 'Drogasil', time: '5-10min', image: require('../assets/images/img.png') },
    { id: 'm4_s', name: 'Protetor Facial Needs 40g', price: 11.99, store: 'Drogasil', time: '5-10min', image: require('../assets/images/img.png') },
    { id: 'v1_s', name: 'Vitamina C Redoxon 30cp', price: 35.00, store: 'Drogasil', time: '5-10min', image: require('../assets/images/img.png') },
];

const SacolaScreen = () => {
  const navigation = useNavigation<SacolaScreenNavigationProp>();
  const [cartItems, setCartItems] = useState<ProductType[]>(initialCartItems);
  
  // 2. Novos estados para controlar o modal de exclusão
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // Calcula os totais
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 6.50;
  const serviceFee = 0.99;
  const total = subtotal + deliveryFee + serviceFee;

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      // Abre o modal de confirmação em vez de deletar diretamente
      setItemToDelete(productId);
      setIsDeleteModalVisible(true);
    } else {
      setCartItems(
        cartItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // 3. Função para confirmar a exclusão do item
  const confirmDeleteItem = () => {
    if (itemToDelete) {
      setCartItems(cartItems.filter(item => item.id !== itemToDelete));
    }
    setIsDeleteModalVisible(false);
    setItemToDelete(null);
  };
  
  // Função para cancelar a exclusão
  const cancelDeleteItem = () => {
      setIsDeleteModalVisible(false);
      setItemToDelete(null);
  };

  const renderCartItem = (item: ProductType) => (
    <View style={styles.cartItemContainer} key={item.id}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>R$ {item.price.toFixed(2).replace('.', ',')}</Text>
      </View>
      <View style={styles.quantityContainer}>
        {/* 4. O botão de lixeira agora chama a função para abrir o modal */}
        <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, 0)}>
            <Icon name="trash-alt" size={16} color="#D32F2F" style={{ marginRight: 15 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSuggestedProduct = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.suggestedCard}>
        <Image source={item.image} style={styles.suggestedImage} resizeMode="contain" />
        <Text numberOfLines={2} style={styles.suggestedName}>{item.name}</Text>
        <Text style={styles.suggestedPrice}>R$ {item.price.toFixed(2).replace('.', ',')}</Text>
        <Text style={styles.suggestedStore}>{item.store}</Text>
        <Text style={styles.suggestedTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back-circle" size={32} color="#0064E6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SACOLA</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* ... restante do conteúdo da tela ... */}
        <View style={styles.storeInfo}>
          <Image source={require('../assets/images/drogasil.png')} style={styles.storeLogo} />
          <View>
            <Text style={styles.storeName}>Drogasil Taguatinga Sul</Text>
            <Text style={styles.storeAddress}>72015-585</Text>
          </View>
        </View>
        {cartItems.map(item => renderCartItem(item))}
        <View style={styles.suggestedSection}>
            <Text style={styles.addMoreText}>Adicione mais produtos à sua sacola</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={suggestedProducts}
                keyExtractor={(item) => item.id}
                renderItem={renderSuggestedProduct}
                contentContainerStyle={{ paddingLeft: 20 }}
            />
        </View>
        <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
            </View>
            <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Taxa de entrega</Text>
                <Text style={styles.summaryValue}>R$ {deliveryFee.toFixed(2).replace('.', ',')}</Text>
            </View>
            <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Taxa de serviço <Ionicons name="information-circle-outline" size={14} /></Text>
                <Text style={styles.summaryValue}>R$ {serviceFee.toFixed(2).replace('.', ',')}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.summaryLabelTotal}>Total</Text>
                <Text style={styles.summaryValueTotal}>R$ {total.toFixed(2).replace('.', ',')}</Text>
            </View>
        </View>
      </ScrollView>

      {/* Footer Fixo */}
      <View style={styles.footer}>
        <View>
            <Text style={styles.footerTotalLabel}>Total</Text>
            <Text style={styles.footerTotalValue}>R$ {total.toFixed(2).replace('.', ',')}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Finalizar compra</Text>
        </TouchableOpacity>
      </View>
      
      {/* Bottom Tab Navigator Placeholder */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('MarketplaceHome')}>
          <Ionicons name="home-outline" size={24} color="#888" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="bag" size={24} color="#0064E6" />
          <Text style={[styles.tabText, {color: '#0064E6'}]}>Sacola</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="receipt-outline" size={24} color="#888" />
          <Text style={styles.tabText}>Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#888" />
          <Text style={styles.tabText}>Perfil</Text>
        </TouchableOpacity>
      </View>
      
      {/* 5. Modal de Confirmação de Exclusão */}
      <Modal
        visible={isDeleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelDeleteItem}
      >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeButton} onPress={cancelDeleteItem}>
                    <Ionicons name="close" size={24} color="#888" />
                </TouchableOpacity>
                <Ionicons name="alert-circle-outline" size={32} color="#FFB300" style={{ marginBottom: 10 }} />
                <Text style={styles.modalText}>Tem certeza que deseja remover este item da sua sacola?</Text>
                <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                        style={[styles.modalButton, styles.cancelButton]}
                        onPress={cancelDeleteItem}
                    >
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.modalButton, styles.confirmButton]}
                        onPress={confirmDeleteItem}
                    >
                        <Text style={styles.confirmButtonText}>Remover</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F0F2F5' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 15, backgroundColor: '#FFFFFF', position: 'relative', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
    backButton: { position: 'absolute', left: 15, padding: 5 },
    headerTitle: { color: '#0064E6', fontSize: 18, fontWeight: '700', letterSpacing: 1 },
    scrollContainer: { paddingBottom: 150 },
    storeInfo: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 20 },
    storeLogo: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
    storeName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    storeAddress: { fontSize: 16, color: '#777' },
    addMoreText: { paddingHorizontal: 20, paddingVertical: 15, color: '#0064E6', fontWeight: 'bold', fontSize: 16, backgroundColor: '#FFFFFF' },
    cartItemContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingVertical: 15, borderTopWidth: 1, borderColor: '#F0F0F0' },
    cartItemImage: { width: 60, height: 60, backgroundColor: '#E0E0E0', borderRadius: 8, marginRight: 15 },
    cartItemDetails: { flex: 1 },
    cartItemName: { fontSize: 16, color: '#333' },
    cartItemPrice: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    quantityContainer: { flexDirection: 'row', alignItems: 'center' },
    quantityButton: { padding: 5 },
    quantityButtonText: { fontSize: 20, color: '#0064E6' },
    quantityText: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 10 },
    suggestedSection: { backgroundColor: '#FFFFFF', paddingTop: 10, marginTop: 10 },
    suggestedCard: { width: 140, marginRight: 15 },
    suggestedImage: { width: '100%', height: 90, borderRadius: 8, backgroundColor: '#F0F2F5', marginBottom: 8 },
    suggestedName: { fontSize: 13, fontWeight: '600' },
    suggestedPrice: { fontSize: 16, fontWeight: 'bold' },
    suggestedStore: { fontSize: 11, color: '#777' },
    suggestedTime: { fontSize: 11, color: '#777' },
    summaryContainer: { backgroundColor: '#FFFFFF', padding: 20, marginTop: 10, borderTopWidth: 1, borderTopColor: '#E0E0E0' },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    summaryLabel: { fontSize: 16, color: '#555' },
    summaryValue: { fontSize: 16, color: '#333' },
    totalRow: { paddingTop: 10, borderTopWidth: 1, borderColor: '#E0E0E0' },
    summaryLabelTotal: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    summaryValueTotal: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    footer: { position: 'absolute', bottom: 55, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 15, borderTopWidth: 1, borderTopColor: '#E0E0E0' },
    footerTotalLabel: { fontSize: 12, color: '#777' },
    footerTotalValue: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    checkoutButton: { backgroundColor: '#0064E6', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 8 },
    checkoutButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
    bottomTabBar: { flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingVertical: 10,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10, },
    tabItem: { flex: 1, alignItems: 'center' },
    tabText: { fontSize: 12, color: '#888', marginTop: 4 },
    // 6. Novos estilos para o Modal de Exclusão
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)' },
    modalContent: { width: '85%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
    closeButton: { position: 'absolute', top: 10, left: 15 },
    modalText: { fontSize: 18, fontWeight: '600', color: '#333', textAlign: 'center', marginBottom: 25, marginTop: 5 },
    modalButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
    modalButton: { flex: 1, borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
    cancelButton: { backgroundColor: '#E0E0E0', marginRight: 10 },
    cancelButtonText: { color: '#333', fontSize: 16, fontWeight: 'bold' },
    confirmButton: { backgroundColor: '#D32F2F' },
    confirmButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default SacolaScreen;