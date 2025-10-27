import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// Ícones FontAwesome para a seta de voltar
import Icon from "react-native-vector-icons/FontAwesome";

// Definição de Tipos para Navegação
type RootStackParamList = {
  MarketplaceHome: undefined; // Rota para voltar para a Home
  MeusPedidos: undefined; // Rota para acompanhar o pedido
};

type PedidoConfirmadoScreenNavigationProp =
  NativeNativeStackNavigationProp<RootStackParamList>;

// Dados mockados para o resumo
const resumoData = {
  totalBruto: "R$ 33,90",
  valorPedido: "R$ 23,90",
  frete: "R$ 10,00",
  valorPix: "R$ 30,51",
};

const PedidoConfirmado = () => {
  const navigation = useNavigation<PedidoConfirmadoScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* CABEÇALHO */}
      <View style={styles.header}>
        {/* CORREÇÃO 1: Seta de voltar agora navega para a TelaInicial */}
        <TouchableOpacity
          onPress={() => navigation.navigate("TelaPagamento")}
          style={styles.backButton}
        >
          <Icon name="arrow-circle-left" size={32} color="#0064E6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PEDIDO CONFIRMADO</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* MENSAGEM DE CONFIRMAÇÃO */}
        <View style={styles.messageContainer}>
          <Text style={styles.mainTitle}>Seu pedido está a caminho!</Text>
          <Text style={styles.messageText}>
            Verifique se o seu serviço telefônico está disponível para obter seu
            pedido com sucesso. Acompanhe-o clicando no botão abaixo, ou indo
            para a página de "Pedidos" na parte inferior do seu dispositivo.
          </Text>

          {/* BOTÃO ACOMPANHAR PEDIDO */}
          <TouchableOpacity
            style={styles.acompanharButton}
            onPress={() => navigation.navigate("AcompanharPedido")}
          >
            <Text style={styles.acompanharButtonText}>ACOMPANHAR PEDIDO</Text>
          </TouchableOpacity>
        </View>

        {/* RESUMO TOTAL */}
        <View style={styles.resumoContainer}>
          <View style={styles.resumoHeader}>
            <Text style={styles.resumoTitle}>Resumo total:</Text>
            <Text style={styles.resumoTotal}>{resumoData.totalBruto}</Text>
          </View>
          <View style={styles.resumoDetailRow}>
            <Text style={styles.resumoDetailLabel}>Valor do pedido:</Text>
            <Text style={styles.resumoDetailValue}>
              {resumoData.valorPedido}
            </Text>
          </View>
          <View style={styles.resumoDetailRow}>
            <Text style={styles.resumoDetailLabel}>Frete:</Text>
            <Text style={styles.resumoDetailValue}>{resumoData.frete}</Text>
          </View>
          <View style={styles.resumoPixRow}>
            <Text style={styles.resumoPixLabel}>Valor à vista no PIX:</Text>
            <Text style={styles.resumoPixValue}>{resumoData.valorPix}</Text>
          </View>
        </View>
      </ScrollView>
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
  // --- Estilos do Cabeçalho ---
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
  scrollContent: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },

  // --- Estilos da Mensagem de Confirmação ---
  messageContainer: {
    marginBottom: 30,
    padding: 5,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFB300", // Amarelo/Laranja para destaque (consistente com telas anteriores)
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 25,
  },

  // --- Estilos do Botão Acompanhar Pedido ---
  acompanharButton: {
    backgroundColor: "#0064E6",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  acompanharButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  // --- Estilos do Resumo Total ---
  resumoContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 20,
  },
  resumoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F3675E", // Vermelho/Laranja do Resumo
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  resumoTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  resumoTotal: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  resumoDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  resumoDetailLabel: {
    fontSize: 14,
    color: "#666",
  },
  resumoDetailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  resumoPixRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    marginTop: 5,
  },
  resumoPixLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#00C896", // Verde para destaque
  },
  resumoPixValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#00C896",
  },
});

export default PedidoConfirmado;
