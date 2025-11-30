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
};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

// Dados Mockados - Histórico de Transações
const transactions = [
  {
    id: "1",
    type: "credit", // 'credit' ou 'debit'
    title: "Entrega #9921",
    subtitle: "Drogasil - Taguatinga Norte",
    date: "Hoje, 15:20",
    amount: "R$ 8,50",
  },
  {
    id: "2",
    type: "credit",
    title: "Entrega #8842",
    subtitle: "Farmácia Pague Menos",
    date: "Ontem, 19:45",
    amount: "R$ 12,90",
  },
  {
    id: "3",
    type: "debit",
    title: "Saque PIX",
    subtitle: "Transferência para conta ****-1",
    date: "10/09/2025",
    amount: "- R$ 150,00",
  },
  {
    id: "4",
    type: "credit",
    title: "Bônus Semanal",
    subtitle: "Meta de entregas atingida",
    date: "09/09/2025",
    amount: "R$ 50,00",
  },
];

const EntregadorCarteira = () => {
  const navigation = useNavigation<navigationProp>();
  const [balance, setBalance] = useState("171,40"); // Saldo Atual Mockado

  const handleWithdraw = () => {
    Alert.alert("Solicitar Saque", "Funcionalidade de saque via PIX será iniciada.");
  };

  const handleBankData = () => {
    Alert.alert("Dados Bancários", "Tela para editar chave PIX ou conta bancária.");
  };

  const renderTransactionItem = ({ item }: { item: typeof transactions[0] }) => {
    const isCredit = item.type === "credit";
    const amountColor = isCredit ? "#4CAF50" : "#E53935"; // Verde ou Vermelho
    const iconName = isCredit ? "arrow-down-circle-outline" : "arrow-up-circle-outline";
    const iconColor = isCredit ? "#4CAF50" : "#E53935";
    const iconBg = isCredit ? "#E8F5E9" : "#FFEBEE";

    return (
      <View style={styles.transactionCard}>
        <View style={styles.transactionLeft}>
          <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
            <Icon name={iconName} size={24} color={iconColor} />
          </View>
          <View>
            <Text style={styles.transactionTitle}>{item.title}</Text>
            <Text style={styles.transactionSubtitle}>{item.subtitle}</Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
          </View>
        </View>
        <Text style={[styles.transactionAmount, { color: amountColor }]}>
          {item.amount}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#6B98CE" />

      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>MINHA CARTEIRA</Text>
      </View>

      <View style={styles.contentContainer}>
        {/* CARD DE SALDO PRINCIPAL */}
        <View style={styles.balanceCard}>
          <View>
            <Text style={styles.balanceLabel}>Saldo disponível</Text>
            <Text style={styles.balanceValue}>R$ {balance}</Text>
          </View>
          <View style={styles.balanceIconBg}>
            <Icon name="wallet" size={40} color="rgba(255,255,255,0.3)" />
          </View>
        </View>

        {/* BOTÕES DE AÇÃO */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleWithdraw}>
            <View style={styles.actionIconCircle}>
              <Icon name="cash-fast" size={24} color="#6B98CE" />
            </View>
            <Text style={styles.actionText}>Solicitar Saque</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleBankData}>
            <View style={styles.actionIconCircle}>
              <Icon name="bank-outline" size={24} color="#6B98CE" />
            </View>
            <Text style={styles.actionText}>Dados Bancários</Text>
          </TouchableOpacity>
        </View>

        {/* LISTA DE TRANSAÇÕES */}
        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>Histórico de transações</Text>
          <FlatList
            data={transactions}
            renderItem={renderTransactionItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('EntregadorHistorico')}
        >
          <Icon name="format-list-bulleted" size={24} color="#A9A9A9" />
          <Text style={styles.bottomTabText}>Entregas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          {/* Ícone preenchido e cor azul para indicar seleção */}
          <Icon name="wallet" size={28} color="#6B98CE" />
          <Text style={[styles.bottomTabText, styles.bottomTabTextSelected]}>Carteira</Text>
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
  
  // --- Conteúdo Principal ---
  contentContainer: {
    flex: 1,
    padding: 20,
  },

  // --- Card de Saldo ---
  balanceCard: {
    backgroundColor: "#6B98CE",
    borderRadius: 12,
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    overflow: "hidden", // Para cortar o ícone de fundo
  },
  balanceLabel: {
    color: "#E3F2FD",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  balanceValue: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "700",
  },
  balanceIconBg: {
    position: "absolute",
    right: -10,
    bottom: -10,
    transform: [{ rotate: "-15deg" }],
  },

  // --- Botões de Ação ---
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  actionButton: {
    flex: 0.48,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionIconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "600",
  },

  // --- Lista de Transações ---
  listSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 80, // Espaço para a TabBar
  },
  transactionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },
  transactionSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  transactionDate: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
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

export default EntregadorCarteira;