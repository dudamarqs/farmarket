import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  Image,
  Dimensions,
  Platform, // ✅ adicionado aqui
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// Ícones FontAwesome para consistência
import Icon from 'react-native-vector-icons/FontAwesome';
// Ícones específicos do Ionicons podem ser úteis para a barra inferior
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width: screenWidth } = Dimensions.get('window');

// Definição das rotas para o Stack Navigator
type RootStackParamList = {
  TelaInicial: undefined;
  LoginEmail: undefined;
  ValidacaoEmail: undefined;
  AvisosImportantes: undefined;
  MarketplaceHome: undefined;
  ProductDetail: undefined;
  // Adicione outras telas que podem ser navegadas a partir daqui
};

// Definição das rotas para o Bottom Tab Navigator (a ser configurado em App.tsx)
type BottomTabParamList = {
  HomeTab: undefined;
  SacolaTab: undefined;
  PedidosTab: undefined;
  PerfilTab: undefined;
};

// Combinamos os tipos de navegação
type MarketplaceHomeNavigationProp = NativeStackNavigationProp<RootStackParamList & BottomTabParamList>;


// DADOS MOCKADOS
const advertisements = [
  { id: '1', image: require('../assets/images/img.png'), text: 'Publicidade 1' },
  { id: '2', image: require('../assets/images/img.png'), text: 'Promoção de Verão!' },
  { id: '3', image: require('../assets/images/img.png'), text: 'Novos Produtos!' },
];

const filters = [
  { id: 'medicamentos', name: 'Medicamentos' },
  { id: 'higiene', name: 'Higiene pessoal' },
  { id: 'vitaminas', name: 'Vitaminas' },
  { id: 'cosmeticos', name: 'Cosméticos' },
  { id: 'bebe', name: 'Bebê' },
];

const pharmaciesData = [
  { id: 'drogall', name: 'Drogall', distance: '1,2 km', time: '10 - 5 min', logo: require('../assets/images/img.png') },
  { id: 'paguemenos', name: 'PagueMenos', distance: '1,2 km', time: '10 - 5 min', logo: require('../assets/images/img.png') },
  { id: 'drogasil', name: 'Drogasil', distance: '1,2 km', time: '10 - 5 min', logo: require('../assets/images/img.png') },
  { id: 'drogariaRosario', name: 'Drogaria Rosário', distance: '1,2 km', time: '10 - 5 min', logo: require('../assets/images/img.png') },
];


const productsData = {
  higiene: [
    { id: 'h1', name: 'Sabonete íntimo Nivea 250ml', store: 'Drogasil', time: '5-10min', price: 'R$ 22,90', image: require('../assets/images/img.png') },
    { id: 'h2', name: 'Shampoo e Cond. Elseve', store: 'Drogaria Rosário', time: '5-10min', price: 'R$ 29,90', image: require('../assets/images/img.png') },
    { id: 'h3', name: 'Kit escova de dente Condor', store: 'PagueMenos', time: '5-10min', price: 'R$ 8,50', image: require('../assets/images/img.png') },
    { id: 'h4', name: 'Espuma de Barbear Bozzano', store: 'Drogall', time: '5-10min', price: 'R$ 13,99', image: require('../assets/images/img.png') },
  ],
  medicamentos: [
    { id: 'm1', name: 'Buscopan Ibup. 400mg 20 und', store: 'Drogall', time: '5-10min', price: 'R$ 22,90', image: require('../assets/images/img.png') },
    { id: 'm2', name: 'Advil', store: 'Drogaria Rosário', time: '5-10min', price: 'R$ 18,50', image: require('../assets/images/img.png') },
    { id: 'm3', name: 'Neosaldina', store: 'PagueMenos', time: '5-10min', price: 'R$ 15,00', image: require('../assets/images/img.png') },
    { id: 'm4', name: 'Dorflex', store: 'Drogasil', time: '5-10min', price: 'R$ 11,99', image: require('../assets/images/img.png') },
  ],
  vitaminas: [
    { id: 'v1', name: 'Vitamina C Redoxon 30cp', store: 'Drogall', time: '5-10min', price: 'R$ 35,00', image: require('../assets/images/img.png') },
    { id: 'v2', name: 'Complexo B + Zinco', store: 'PagueMenos', time: '5-10min', price: 'R$ 45,00', image: require('../assets/images/img.png') },
  ],
  cosmeticos: [],
  bebe: [],
};


const MarketplaceHome = () => {
  const navigation = useNavigation<MarketplaceHomeNavigationProp>();
  const [selectedFilter, setSelectedFilter] = useState('medicamentos'); // Filtro inicial
  const adFlatListRef = useRef<FlatList>(null);
  const [adIndex, setAdIndex] = useState(0);

  useEffect(() => {
    // Carrossel de publicidade automático
    const interval = setInterval(() => {
      setAdIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % advertisements.length;
        adFlatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 5000); // Rola a cada 5 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, []);

  const renderProductItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      >
      <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productStore}>{item.store}</Text>
      <Text style={styles.productTime}>{item.time}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  const renderPharmacyItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.pharmacyCard}>
      <Image source={item.logo} style={styles.pharmacyLogo} resizeMode="contain" />
      <Text style={styles.pharmacyName}>{item.name}</Text>
      <Text style={styles.pharmacyDistance}>{item.distance}</Text>
      <Text style={styles.pharmacyTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header com Endereço e Busca */}
      <View style={styles.topHeader}>
        <View style={styles.locationContainer}>
          <Icon name="map-marker" size={18} color="#0064E6" style={styles.locationIcon} />
          <View>
            <Text style={styles.locationAddress}>QS 07, Lote 01, Taguatinga Sul - Taguatinga, Brasília</Text>
            <TouchableOpacity>
              <Text style={styles.changeAddressText}>Alterar endereço</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Icon name="search" size={18} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar pedido..."
            placeholderTextColor="#888"
          />
        </View>
      </View>

      {/* Filtros de Categoria */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filters}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === item.id && styles.filterButtonSelected,
              ]}
              onPress={() => setSelectedFilter(item.id)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === item.id && styles.filterButtonTextSelected,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <ScrollView style={styles.mainContentScroll}>
        {/* Carrossel de Publicidade */}
        <View style={styles.adCarouselContainer}>
          <FlatList
            ref={adFlatListRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={advertisements}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.adCard}>
                {/* Aqui, idealmente, você teria uma imagem de publicidade */}
                <Image source={item.image} style={styles.adImage} resizeMode="cover"/>
                {/* <Text style={styles.adText}>{item.text}</Text> */}
              </TouchableOpacity>
            )}
            getItemLayout={(data, index) => (
                { length: screenWidth - 40, offset: (screenWidth - 40) * index, index }
            )}
            onScrollEndDrag={(event) => {
                const contentOffsetX = event.nativeEvent.contentOffset.x;
                const newIndex = Math.round(contentOffsetX / (screenWidth - 40));
                setAdIndex(newIndex);
            }}
          />
        </View>

        {/* Seção "Farmácias próximas de você" */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Farmácias próximas de você</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={pharmaciesData}
            keyExtractor={(item) => item.id}
            renderItem={renderPharmacyItem}
            contentContainerStyle={styles.pharmaciesList}
          />
        </View>

        {/* Seção de Produtos (dinâmica pelo filtro) */}
        {productsData[selectedFilter as keyof typeof productsData] && productsData[selectedFilter as keyof typeof productsData].length > 0 && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{filters.find(f => f.id === selectedFilter)?.name || 'Produtos'}</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={productsData[selectedFilter as keyof typeof productsData]}
                    keyExtractor={(item) => item.id}
                    renderItem={renderProductItem}
                    contentContainerStyle={styles.productsList}
                />
            </View>
        )}

        {/* Exemplo de outras seções estáticas */}
        {/* Pode duplicar o bloco acima com outros produtos ou um novo filtro padrão */}
         {/* Seção "Para cólicas e dores de cabeça" */}
         <View style={styles.section}>
            <Text style={styles.sectionTitle}>Para cólicas e dores de cabeça</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={productsData.medicamentos} // Usando medicamentos como exemplo
                keyExtractor={(item) => item.id}
                renderItem={renderProductItem}
                contentContainerStyle={styles.productsList}
            />
        </View>

        {/* Adicione mais seções aqui */}

      </ScrollView>

      {/* Bottom Navigation Bar */}
      {/* Este componente será renderizado pelo Bottom Tab Navigator em App.tsx, mas aqui está um placeholder visual */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('MarketplaceHome')}>
          <Ionicons name="home" size={24} color="#0064E6" />
          <Text style={[styles.tabText, {color: '#0064E6'}]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('SacolaTab')}>
          <Ionicons name="bag" size={24} color="#888" />
          <Text style={styles.tabText}>Sacola</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="receipt" size={24} color="#888" />
          <Text style={styles.tabText}>Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person" size={24} color="#888" />
          <Text style={styles.tabText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  topHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationIcon: {
    marginRight: 10,
  },
  locationAddress: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  changeAddressText: {
    fontSize: 12,
    color: '#0064E6',
    textDecorationLine: 'underline',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0, // Ajusta o padding para TextInput dentro de um View
  },
  filterContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0064E6', // Borda azul
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF', // Fundo branco padrão
  },
  filterButtonSelected: {
    backgroundColor: '#0064E6', // Fundo azul quando selecionado
  },
  filterButtonText: {
    color: '#0064E6', // Texto azul padrão
    fontSize: 14,
    fontWeight: '600',
  },
  filterButtonTextSelected: {
    color: '#FFFFFF', // Texto branco quando selecionado
  },
  mainContentScroll: {
    flex: 1,
  },
  adCarouselContainer: {
    height: 180, // Altura da publicidade
    marginVertical: 15,
    // Garante que o FlatList de anúncios não vaze
  },
  adCard: {
    width: screenWidth - 30, // Largura da tela menos padding total
    height: 180,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginHorizontal: 20, // Ajusta o espaçamento lateral para centralizar
    overflow: 'hidden', // Garante que a imagem não vaze
  },
  adImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  adText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  section: {
    paddingVertical: 15,
    paddingLeft: 20,
    // backgroundColor: '#FFFFFF',
    marginTop: 10, // Espaçamento entre as seções
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0064E6',
    marginBottom: 15,
  },
  pharmaciesList: {
    paddingRight: 20, // Para a rolagem horizontal ter um respiro no final
  },
  pharmacyCard: {
    width: 100, // Largura fixa para os cards da farmácia
    marginRight: 15,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  pharmacyLogo: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  pharmacyName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  pharmacyDistance: {
    fontSize: 10,
    color: '#666',
  },
  pharmacyTime: {
    fontSize: 10,
    color: '#666',
  },
  productsList: {
    paddingRight: 20, // Para a rolagem horizontal ter um respiro no final
  },
  productCard: {
    width: 140, // Largura para o card de produto
    marginRight: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'flex-start', // Alinha o conteúdo à esquerda
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 90,
    marginBottom: 8,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
    flexWrap: 'wrap', // Permite que o texto quebre linha
  },
  productStore: {
    fontSize: 11,
    color: '#666',
  },
  productTime: {
    fontSize: 11,
    color: '#666',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10, // Ajusta para a barra de segurança do iOS
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#888', // Cor padrão para os itens não selecionados
    marginTop: 4,
  },
});

export default MarketplaceHome;