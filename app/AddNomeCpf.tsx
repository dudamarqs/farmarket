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
  ScrollView,
} from "react-native";
// Ícone atualizado para FontAwesome
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

interface DadosClienteProps {
  onBackPress: () => void;
  onContinuePress: (nome: string, cpf: string) => void;
}

const DadosCliente: React.FC<DadosClienteProps> = ({
  onBackPress,
  onContinuePress,
}) => {
  const navigation = useNavigation<navigationProp>();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");

  // Função de formatação de CPF simples (máscara: 000.000.000-00)
  const formatCpf = (value: string) => {
    // Remove tudo que não for dígito
    const numericValue = value.replace(/\D/g, "");
    let formatted = numericValue;

    if (numericValue.length > 3) {
      formatted =
        numericValue.substring(0, 3) + "." + numericValue.substring(3, 6);
    }
    if (numericValue.length > 6) {
      formatted += "." + numericValue.substring(6, 9);
    }
    if (numericValue.length > 9) {
      formatted += "-" + numericValue.substring(9, 11);
    }
    return formatted.substring(0, 14); // Limita ao tamanho da máscara
  };

  const handleCpfChange = (text: string) => {
    // Aplica a formatação no estado para visualização
    setCpf(formatCpf(text));
  };

  // Habilita o botão se Nome não estiver vazio E CPF tiver 11 dígitos (removendo a máscara)
  const isButtonEnabled =
    nome.trim() !== "" && cpf.replace(/\D/g, "").length === 11;

  const handleContinue = () => {
    if (isButtonEnabled) {
      // Passa o CPF sem a máscara para a função de continuar
      onContinuePress(nome, cpf.replace(/\D/g, ""));
    } else {
      alert("Por favor, preencha o nome completo e um CPF válido.");
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
        <Text style={styles.headerTitle}>DADOS DO CLIENTE</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Título de Destaque */}
          <Text style={styles.questionHighlight}>
            Preencha os campos abaixo.
          </Text>

          {/* Campo Nome Completo */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Qual é o seu nome completo?</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNome}
              value={nome}
              placeholder="Nome"
              placeholderTextColor="#A9A9A9"
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>

          {/* Campo CPF */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Qual é o seu CPF?</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleCpfChange}
              value={cpf}
              placeholder="CPF"
              placeholderTextColor="#A9A9A9"
              keyboardType="numeric"
              maxLength={14} // 11 dígitos + 3 caracteres da máscara
              returnKeyType="done"
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !isButtonEnabled && styles.disabledButton,
            ]}
            onPress={() => navigation.navigate("DefinirSenha")}
            disabled={!isButtonEnabled}
          >
            <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// =======================================================
// ESTILOS UNIFICADOS (Adaptados do seu modelo)
// =======================================================
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
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
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
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
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
});

export default DadosCliente;
