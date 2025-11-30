import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Definição do tipo de dados que essa tela espera receber (opcional, mas recomendado)
type RootStackParamList = {
  DetalhesEntrega: {
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

type DetalhesScreenRouteProp = RouteProp<RootStackParamList, 'DetalhesEntrega'>;

const DetalhesEntrega = () => {
  const navigation = useNavigation();
  const route = useRoute<DetalhesScreenRouteProp>();

  // Dados recebidos da tela anterior (ou valores padrão se for teste)
  const { 
    id = '#12345', 
    valor = 'R$ 15,50', 
    data = '30 Nov, 14:30', 
    loja = 'Burger King', 
    enderecoLoja = 'Av. Paulista, 1000 - Bela Vista',
    cliente = 'João Silva',
    enderecoCliente = 'Rua Augusta, 500 - Consolação',
    status = 'Concluída'
  } = route.params || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes da Entrega</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Card de Status e Valor */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.dateText}>{data}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{status}</Text>
            </View>
          </View>
          
          <Text style={styles.valueText}>{valor}</Text>
          <Text style={styles.orderId}>ID do Pedido: {id}</Text>
        </View>

        {/* Linha do Tempo da Entrega */}
        <View style={styles.routeContainer}>
          <Text style={styles.sectionTitle}>Trajeto</Text>
          
          {/* Ponto A: Coleta */}
          <View style={styles.routeItem}>
            <View style={styles.timelineContainer}>
              <Icon name="circle" size={12} color="#6B98CE" />
              <View style={styles.verticalLine} />
            </View>
            <View style={styles.addressContent}>
              <Text style={styles.pointLabel}>Coleta</Text>
              <Text style={styles.pointName}>{loja}</Text>
              <Text style={styles.pointAddress}>{enderecoLoja}</Text>
            </View>
          </View>

          {/* Ponto B: Entrega */}
          <View style={styles.routeItem}>
            <View style={styles.timelineContainer}>
              <Icon name="map-marker" size={16} color="#FFB300" />
            </View>
            <View style={styles.addressContent}>
              <Text style={styles.pointLabel}>Entrega</Text>
              <Text style={styles.pointName}>{cliente}</Text>
              <Text style={styles.pointAddress}>{enderecoCliente}</Text>
            </View>
          </View>
        </View>

        {/* Resumo Financeiro */}
        <View style={styles.financeContainer}>
          <Text style={styles.sectionTitle}>Ganhos</Text>
          <View style={styles.financeRow}>
            <Text style={styles.financeLabel}>Tarifa base</Text>
            <Text style={styles.financeValue}>R$ 10,00</Text>
          </View>
          <View style={styles.financeRow}>
            <Text style={styles.financeLabel}>Adicional por distância</Text>
            <Text style={styles.financeValue}>R$ 3,50</Text>
          </View>
          <View style={styles.financeRow}>
            <Text style={styles.financeLabel}>Gorjeta</Text>
            <Text style={styles.financeValue}>R$ 2,00</Text>
          </View>
          <View style={[styles.financeRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{valor}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpButtonText}>Reportar um problema</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginLeft: 15,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  statusCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateText: {
    color: '#888',
    fontSize: 14,
  },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 12,
  },
  valueText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#333',
  },
  orderId: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  routeContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  routeItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  timelineContainer: {
    alignItems: 'center',
    width: 30,
    marginRight: 10,
  },
  verticalLine: {
    width: 2,
    height: 40, // Altura da linha conectora
    backgroundColor: '#E0E0E0',
    marginVertical: 4,
  },
  addressContent: {
    flex: 1,
    paddingBottom: 20,
  },
  pointLabel: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 4,
  },
  pointName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  pointAddress: {
    fontSize: 14,
    color: '#666',
  },
  financeContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  financeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  financeLabel: {
    color: '#666',
    fontSize: 15,
  },
  financeValue: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 10,
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
  },
  helpButton: {
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
  },
  helpButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DetalhesEntrega;