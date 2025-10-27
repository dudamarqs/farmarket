import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// Ícones FontAwesome
import Icon from "react-native-vector-icons/FontAwesome";
// Ícones do Ionicons para carteira/dinheiro
import Ionicons from "react-native-vector-icons/Ionicons";

// Definição de Tipos para Navegação
type RootStackParamList = {
  TelaAnterior: undefined;
  PagamentoFinal: undefined;
  SacolaTab: undefined;
  ConfirmPedido: undefined;
};

type PagamentoScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

// Dados do resumo para simulação
const resumoData = {
  totalBruto: "R$ 33,90",
  valorPedido: "R$ 23,90",
  frete: "R$ 10,00",
  valorPix: "R$ 30,51", // Simula o desconto do PIX
};

const Pagamento = () => {
  const navigation = useNavigation<PagamentoScreenNavigationProp>();
  const [selectedMethod, setSelectedMethod] = useState("pix");
  const [discountCode, setDiscountCode] = useState("");

  // Componente reutilizável para o item de método de pagamento (Radio Button)
  const PaymentMethodItem = ({
    method,
    label,
    iconName,
    iconType,
    iconColor = "#333",
  }) => (
    <TouchableOpacity
      style={styles.methodItem}
      onPress={() => setSelectedMethod(method)}
    >
      {/* Radio Button */}
      <View style={styles.radioButton}>
        <Icon
          name={selectedMethod === method ? "circle" : "circle-thin"}
          size={24}
          color={selectedMethod === method ? "#0064E6" : "#A9A9A9"}
        />
      </View>

      {/* Rótulo */}
      <Text style={styles.methodLabel}>{label}</Text>

      {/* Ícone do Método (adaptado para os ícones da imagem) */}
      <View style={styles.methodIcon}>
        {method === "pix" ? (
          // Ícone do Pix (simulado com FontAwesome ou um ícone mais adequado)
          <Icon name="diamond" size={24} color="#00C896" />
        ) : method === "cartao" ? (
          // Ícone de Cartão (FontAwesome)
          <Icon name="credit-card" size={24} color={iconColor} />
        ) : method === "dinheiro" ? (
          // Ícone de Dinheiro/Bolsa (FontAwesome)
          <Icon name="shopping-bag" size={24} color={iconColor} />
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* CABEÇALHO */}
      <View style={styles.header}>
        {/* CORREÇÃO 1: Seta de voltar agora navega para a TelaInicial */}
        <TouchableOpacity
          onPress={() => navigation.navigate("SacolaTab")}
          style={styles.backButton}
        >
          <Icon name="arrow-circle-left" size={32} color="#0064E6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PAGAMENTO</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* OPÇÕES DE PAGAMENTO */}
        <View style={styles.methodsContainer}>
          <PaymentMethodItem
            method="pix"
            label="PIX"
            iconName="diamond"
            iconType="FontAwesome"
          />
          <View style={styles.separator} />
          <PaymentMethodItem
            method="cartao"
            label="Cartão crédito/débito"
            iconName="credit-card"
            iconType="FontAwesome"
            iconColor="#333"
          />
          <View style={styles.separator} />
          <PaymentMethodItem
            method="dinheiro"
            label="Dinheiro"
            iconName="shopping-bag"
            iconType="FontAwesome"
            iconColor="#333"
          />
        </View>

        {/* CAMPO DE CÓDIGO DE DESCONTO */}
        <View style={styles.discountContainerWrapper}>
          <View style={styles.discountContainer}>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Aplicar código</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.discountInput}
              placeholder="Digite o código aqui"
              placeholderTextColor="#666"
              value={discountCode}
              onChangeText={setDiscountCode}
              autoCapitalize="characters"
            />
          </View>
        </View>

        {/* Espaçamento antes do footer */}
        <View style={{ height: 10 }} />
      </ScrollView>

      {/* FOOTER - Resumo e Botões */}
      <View style={styles.footer}>
        {/* RESUMO TOTAL */}
        <View style={styles.resumoContainer}>
          {/* Título do Resumo */}
          <View style={styles.resumoHeader}>
            <Text style={styles.resumoTitle}>Resumo total:</Text>
            <Text style={styles.resumoTotal}>{resumoData.totalBruto}</Text>
          </View>

          {/* Detalhes do Resumo */}
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

          {/* Valor à vista no PIX (destacado) */}
          <View style={[styles.resumoDetailRow, styles.resumoPixRow]}>
            <Text style={styles.resumoPixLabel}>Valor à vista no PIX:</Text>
            <Text style={styles.resumoPixValue}>{resumoData.valorPix}</Text>
          </View>
        </View>

        {/* BOTÕES DE AÇÃO */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate("ConfirmPedido")}
          >
            <Text style={styles.continueButtonText}>
              CONTINUAR PARA O PAGAMENTO
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backActionButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backActionButtonText}>VOLTAR</Text>
          </TouchableOpacity>
        </View>
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
  },

  // --- Estilos dos Métodos de Pagamento ---
  methodsContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    marginBottom: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  methodItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginLeft: 30,
  },
  radioButton: {
    width: 30,
    marginRight: 10,
  },
  methodLabel: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  methodIcon: {
    width: 30,
    alignItems: "flex-end",
  },

  // --- Estilos do Código de Desconto ---
  discountContainerWrapper: {
    paddingHorizontal: 15,
  },
  discountContainer: {
    flexDirection: "row",
    height: 45,
    borderRadius: 8,
    overflow: "hidden",
  },
  applyButton: {
    backgroundColor: "#FFC72C", // Amarelo
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  applyButtonText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "700",
  },
  discountInput: {
    flex: 1,
    backgroundColor: "#FFF9E6", // Amarelo claro
    paddingHorizontal: 15,
    fontSize: 14,
    color: "#333",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingVertical: 0,
  },

  // --- Estilos do Footer (Contém Resumo e Botões) ---
  footer: {
    backgroundColor: "#F0F2F5",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  actionButtonsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },

  // --- Estilos do Resumo Total ---
  resumoContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    margin: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
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

  // --- Estilos dos Botões de Ação ---
  continueButton: {
    backgroundColor: "#0064E6",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  backActionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0064E6",
  },
  backActionButtonText: {
    color: "#0064E6",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Pagamento;
