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
// Ícone padrão do projeto (FontAwesome)
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Definição das rotas
type RootStackParamList = {
  CadastroEmail: undefined;
  EntregadorDefinirSenha: undefined; 
};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

const CadastroDadosPessoais = () => {
  const navigation = useNavigation<navigationProp>();

  // Estados dos campos
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");
  // 1. Novo estado para telefone
  const [telefone, setTelefone] = useState("");

  // --- MÁSCARAS ---

  // Máscara de CPF: 000.000.000-00
  const handleCpfChange = (text: string) => {
    const numeric = text.replace(/\D/g, "");
    let formatted = numeric;
    if (numeric.length > 3) {
      formatted = `${numeric.substring(0, 3)}.${numeric.substring(3)}`;
    }
    if (numeric.length > 6) {
      formatted = `${numeric.substring(0, 3)}.${numeric.substring(3, 6)}.${numeric.substring(6)}`;
    }
    if (numeric.length > 9) {
      formatted = `${numeric.substring(0, 3)}.${numeric.substring(3, 6)}.${numeric.substring(6, 9)}-${numeric.substring(9, 11)}`;
    }
    setCpf(formatted);
  };

  // Máscara de Data: dd/mm/aaaa
  const handleDateChange = (text: string) => {
    const numeric = text.replace(/\D/g, "");
    let formatted = numeric;
    if (numeric.length > 2) {
      formatted = `${numeric.substring(0, 2)}/${numeric.substring(2)}`;
    }
    if (numeric.length > 4) {
      formatted = `${numeric.substring(0, 2)}/${numeric.substring(2, 4)}/${numeric.substring(4, 8)}`;
    }
    setNascimento(formatted);
  };

  // 2. Máscara de Telefone (Celular 11 dígitos ou Fixo 10 dígitos)
  const handleTelefoneChange = (text: string) => {
    const numericValue = text.replace(/\D/g, "");
    let formatted = numericValue;

    if (numericValue.length > 0) {
      formatted = "(" + numericValue.substring(0, 2);
    }
    if (numericValue.length > 2) {
      formatted = "(" + numericValue.substring(0, 2) + ") " + numericValue.substring(2);
    }

    if (numericValue.length > 10) {
      // Celular: (XX) XXXXX-XXXX
      formatted =
        "(" +
        numericValue.substring(0, 2) +
        ") " +
        numericValue.substring(2, 7) +
        "-" +
        numericValue.substring(7, 11);
    } else if (numericValue.length > 6) {
      // Fixo: (XX) XXXX-XXXX (enquanto digita ou se for fixo)
      formatted =
        "(" +
        numericValue.substring(0, 2) +
        ") " +
        numericValue.substring(2, 6) +
        "-" +
        numericValue.substring(6, 10);
    }

    setTelefone(formatted.substring(0, 15)); // Limita tamanho visual
  };

  // Validação para habilitar o botão
  const isButtonEnabled = 
    nome.trim().length > 0 &&
    sobrenome.trim().length > 0 &&
    cpf.length === 14 && // CPF completo
    nascimento.length === 10 && // Data completa
    telefone.replace(/\D/g, "").length >= 10; // Telefone com min 10 dígitos (DDD + número)

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F2F5" />

      {/* HEADER PADRÃO */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-circle-left" size={32} color="#6B98CE" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CADASTRAR CONTA</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <Text style={styles.questionHighlight}>
            Informe seus dados nos campos abaixo
          </Text>

          {/* 1. NOME */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNome}
              value={nome}
              placeholder="Digite seu nome..."
              placeholderTextColor="#A9A9A9"
              autoCapitalize="words"
            />
          </View>

          {/* 2. SOBRENOME */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Sobrenome</Text>
            <TextInput
              style={styles.input}
              onChangeText={setSobrenome}
              value={sobrenome}
              placeholder="Digite seu sobrenome..."
              placeholderTextColor="#A9A9A9"
              autoCapitalize="words"
            />
          </View>

          {/* 3. CPF */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>CPF</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleCpfChange}
              value={cpf}
              placeholder="Digite seu CPF"
              placeholderTextColor="#A9A9A9"
              keyboardType="numeric"
              maxLength={14}
            />
          </View>

          {/* 4. DATA DE NASCIMENTO */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Data de nascimento</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleDateChange}
              value={nascimento}
              placeholder="dd/mm/aaaa"
              placeholderTextColor="#A9A9A9"
              keyboardType="numeric"
              maxLength={10}
            />
          </View>

          {/* 5. TELEFONE COM DDD (NOVO CAMPO) */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Celular com DDD</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleTelefoneChange}
              value={telefone}
              placeholder="(00) 00000-0000"
              placeholderTextColor="#A9A9A9"
              keyboardType="phone-pad"
              maxLength={15}
            />
          </View>

        </ScrollView>

        {/* FOOTER COM BOTÃO */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !isButtonEnabled && styles.disabledButton,
            ]}
            onPress={() => navigation.navigate("EntregadorDefinirSenha")}
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
// ESTILOS
// =======================================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F2F5",
  },
  container: {
    flex: 1,
  },
  // --- Header ---
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#F0F2F5",
  },
  backButton: {
    position: "absolute",
    left: 15,
    padding: 5,
  },
  headerTitle: {
    color: "#6B98CE",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
  // --- Conteúdo ---
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
  },
  questionHighlight: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFB300", // Laranja destaque
    marginBottom: 20,
    textAlign: 'left',
  },
  // --- Inputs ---
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    width: "100%",
    // Sombra leve
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  // --- Footer ---
  footer: {
    padding: 20,
    paddingHorizontal: 30,
    backgroundColor: "#F0F2F5",
  },
  continueButton: {
    backgroundColor: "#000000",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#333",
    opacity: 0.6,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default CadastroDadosPessoais;