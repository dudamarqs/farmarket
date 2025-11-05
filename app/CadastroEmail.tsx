import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// Ícone atualizado para FontAwesome (estilo Bootstrap)
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  LoginEmail: undefined;
  CriarConta: undefined;
  TelaPrincipal: undefined;
};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CadastroEmailProps {
  onBackPress: () => void;
  onContinuePress: (email: string) => void;
}

const CadastroEmail: React.FC<CadastroEmailProps> = ({
  onBackPress,
  onContinuePress,
}) => {
  const navigation = useNavigation<navigationProp>();
  const [email, setEmail] = useState("");
  const isButtonEnabled = email.trim().length > 0;

  const handleContinue = () => {
    if (isButtonEnabled) {
      onContinuePress(email);
    } else {
      alert("Por favor, insira um e-mail válido.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F2F5" />

      <View style={styles.header}>
        {/* CORREÇÃO 1: Seta de voltar agora navega para a TelaInicial */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-circle-left" size={32} color="#0064E6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CADASTRAR CONTA</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Conteúdo Principal */}
        <View style={styles.content}>
          <Text style={styles.questionHighlight}>Qual é o seu e-mail?</Text>
          <Text style={styles.instructionText}>
            Por favor, insira o seu e-mail para cadastro abaixo:
          </Text>

          {/* Campo de E-mail */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="exemplo.usuario@email.com"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Botão Inferior Fixo */}
        <View style={styles.footer}>
          {/* CORREÇÃO 2: A função onPress foi movida para ser uma prop do TouchableOpacity */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              !isButtonEnabled && styles.disabledButton,
            ]}
            onPress={() => navigation.navigate("AddNomeCpf")}
            disabled={!isButtonEnabled}
          >
            <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F2F5", // Fundo de todas as telas
  },
  container: {
    flex: 1,
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
  },
  backButton: {
    position: "absolute",
    left: 15,
    padding: 5,
  },
  headerTitle: {
    color: "#0064E6", // Azul Principal
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
  // --- Conteúdo Geral ---
  content: {
    paddingHorizontal: 30,
    paddingTop: 30,
    flex: 1,
  },
  questionHighlight: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFB300", // Destaque Laranja/Amarelo
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#333",
    marginBottom: 20,
  },
  // --- Input Styles ---
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    width: "100%",
    // Ajuste: Remove sombra/elevação para manter a simplicidade do design de input do modelo
  },
  // --- Footer e Botões ---
  footer: {
    padding: 20,
    paddingHorizontal: 30,
    backgroundColor: "#F0F2F5",
  },
  continueButton: {
    backgroundColor: "#000000", // Botão preto
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#333", // Cor do botão quando desabilitado
    opacity: 0.6,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  // Adiciona styles vazios que não são usados nesta tela, mas estão no seu modelo
  // backArrow: {},
  // questionText: {},
  // bottomBar: {},
  // buttonText: {},
});

export default CadastroEmail;
