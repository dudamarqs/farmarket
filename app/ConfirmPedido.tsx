import React, { useState } from "react";
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
// Ícones FontAwesome (usados para a seta de voltar e o ícone de edição/lápis)
import Icon from "react-native-vector-icons/FontAwesome";
// Ícones do Ionicons podem ser usados para caixas de seleção, mas o FontAwesome atende a checkbox
import Ionicons from "react-native-vector-icons/Ionicons";

// Definição de Tipos para Navegação
type RootStackParamList = {
  TelaAnterior: undefined;
  FinalizacaoSucesso: undefined; // Exemplo de rota de sucesso
  EditarDados: undefined;
  EditarEndereco: undefined;
  TelaPagamento: undefined;
  PedidoConfirmado: undefined;
};

type ConfirmacaoScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

// Dados mockados para as seções
const dadosPessoais = {
  nome: "Fernando de Castro Junior",
  cpf: "000.000.000-00",
  celular: "(90) 99999-9999",
  email: "fernandocastro@email.com",
};

const enderecoEntrega = {
  rua: "CNB 14",
  bairro: "Taguatinga Norte",
  numero: "225",
  cep: "77777-55",
  complemento: "Condomínio Boa Vista",
};

const resumoData = {
  totalBruto: "R$ 33,90",
  valorPedido: "R$ 23,90",
  frete: "R$ 10,00",
  valorPix: "R$ 30,51",
};

const Confirmacao = () => {
  const navigation = useNavigation<ConfirmacaoScreenNavigationProp>();
  const [isAgreed, setIsAgreed] = useState(false); // Estado para o checkbox de Termos
  const [isPickupSelected, setIsPickupSelected] = useState(false); // Estado para a opção de retirada

  // Componente para um bloco de informações editáveis
  const EditableInfoBlock = ({ title, subtitle, children, onEditPress }) => (
    <View style={styles.infoBlock}>
      <View style={styles.infoBlockHeader}>
        <View>
          <Text style={styles.blockTitle}>{title}</Text>
          <Text style={styles.blockSubtitle}>{subtitle}</Text>
        </View>
        <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
          <Icon name="pencil" size={20} color="#0064E6" />
        </TouchableOpacity>
      </View>
      <View style={styles.blockContent}>{children}</View>
    </View>
  );

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
        <Text style={styles.headerTitle}>CONFIRMAÇÃO</Text>
      </View>

      <ScrollView style={styles.container}>
        {/* Título Principal */}
        <Text style={styles.mainSectionTitle}>Informações do seu pedido</Text>

        {/* 1. DADOS PESSOAIS */}
        <EditableInfoBlock
          title="Dados pessoais"
          subtitle="Informações que serão inseridas na nota fiscal."
          onEditPress={() => navigation.navigate("EditarDados")}
        >
          <Text style={styles.infoTextBold}>{dadosPessoais.nome}</Text>
          <Text style={styles.infoText}>CPF/CNPJ: {dadosPessoais.cpf}</Text>
          <Text style={styles.infoText}>Celular: {dadosPessoais.celular}</Text>
          <Text style={styles.infoText}>E-mail: {dadosPessoais.email}</Text>
        </EditableInfoBlock>

        {/* 2. ENDEREÇO DE ENTREGA */}
        <EditableInfoBlock
          title="Endereço de entrega"
          subtitle="Local onde o seu pedido será enviado."
          onEditPress={() => navigation.navigate("EditarEndereco")}
        >
          <Text style={styles.infoTextBold}>Rua: {enderecoEntrega.rua}</Text>
          <Text style={styles.infoText}>Bairro: {enderecoEntrega.bairro}</Text>
          <Text style={styles.infoText}>Número: {enderecoEntrega.numero}</Text>
          <Text style={styles.infoText}>CEP: {enderecoEntrega.cep}</Text>
          <Text style={styles.infoText}>
            Complemento: {enderecoEntrega.complemento}
          </Text>
        </EditableInfoBlock>

        {/* 3. OPÇÃO DE RETIRADA */}
        <TouchableOpacity
          style={styles.pickupOption}
          onPress={() => setIsPickupSelected(!isPickupSelected)}
        >
          <View style={styles.radioButton}>
            <Icon
              name={isPickupSelected ? "circle" : "circle-thin"}
              size={24}
              color={isPickupSelected ? "#0064E6" : "#A9A9A9"}
            />
          </View>
          <View style={styles.pickupTextBlock}>
            <Text style={styles.pickupTitle}>Peça e retire</Text>
            <Text style={styles.pickupSubtitle}>
              Faça o pedido pelo app e retire você mesmo.
            </Text>
          </View>
        </TouchableOpacity>

        {/* 4. TERMOS E CONDIÇÕES */}
        <View style={styles.termsContainer}>
          <TouchableOpacity onPress={() => setIsAgreed(!isAgreed)}>
            <Icon
              name={isAgreed ? "check-square" : "square-o"}
              size={24}
              color={isAgreed ? "#0064E6" : "#A9A9A9"}
            />
          </TouchableOpacity>
          <Text style={styles.termsText}>
            Ao efetuar o seu pedido, você concorda em os{" "}
            <Text style={styles.termsLink}>
              Termos e condições de venda do Farmarket
            </Text>
            , além da nossa{" "}
            <Text style={styles.termsLink}>Política de Privacidade</Text>.
          </Text>
        </View>
      </ScrollView>

      {/* FOOTER - Resumo e Botões */}
      <View style={styles.footer}>
        {/* RESUMO TOTAL (Reutilizado da tela anterior) */}
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
          <View style={[styles.resumoDetailRow, styles.resumoPixRow]}>
            <Text style={styles.resumoPixLabel}>Valor à vista no PIX:</Text>
            <Text style={styles.resumoPixValue}>{resumoData.valorPix}</Text>
          </View>
        </View>

        {/* BOTÕES DE AÇÃO */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[styles.continueButton, !isAgreed && styles.buttonDisabled]}
            onPress={() =>
              isAgreed && navigation.navigate("PedidoConfirmado")
            }
            disabled={!isAgreed}
          >
            <Text style={styles.continueButtonText}>FINALIZAR PEDIDO</Text>
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
    backgroundColor: "#F0F2F5",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
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
  mainSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFB300", // Laranja/Amarelo destacado
    marginTop: 15,
    marginBottom: 10,
  },

  // --- Estilos dos Blocos de Informação (Editável) ---
  infoBlock: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  infoBlockHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  blockSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  editButton: {
    padding: 5,
  },
  blockContent: {
    marginTop: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  infoTextBold: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    lineHeight: 20,
  },

  // --- Opção de Retirada ---
  pickupOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  radioButton: {
    width: 30,
    marginRight: 10,
  },
  pickupTextBlock: {
    flex: 1,
  },
  pickupTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  pickupSubtitle: {
    fontSize: 12,
    color: "#666",
  },

  // --- Termos e Condições ---
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  termsText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: "#333",
    lineHeight: 18,
  },
  termsLink: {
    color: "#0064E6",
    fontWeight: "600",
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
    paddingBottom: Platform.OS === "ios" ? 20 : 15, // Ajuste para safe area
  },

  // --- Estilos do Resumo Total (Reutilizados) ---
  resumoContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 0, // Removido espaçamento para colar nos botões
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  resumoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F3675E",
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
    color: "#00C896",
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
  buttonDisabled: {
    backgroundColor: "#A9A9A9", // Cinza quando desabilitado
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

export default Confirmacao;
