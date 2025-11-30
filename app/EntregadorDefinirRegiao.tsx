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

// Definição das rotas (Ajuste conforme o próximo passo do seu fluxo)
type RootStackParamList = {
  CadastroDadosPessoais: undefined;
  EntregadorDefinirRegiao: undefined; // Ou a tela de conclusão/análise
};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

const DefinirRegiaoEntregador = () => {
  const navigation = useNavigation<navigationProp>();

  // Estados dos campos
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");

  // Validação para habilitar o botão
  const isButtonEnabled = 
    estado.trim().length >= 2 && // UF com 2 letras
    cidade.trim().length > 0 &&
    bairro.trim().length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F2F5" />

      {/* HEADER PADRÃO */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          {/* Mantendo a cor #6B98CE conforme seu código anterior */}
          <Icon name="arrow-circle-left" size={32} color="#6B98CE" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>REGIÃO DE ENTREGA</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Título de destaque (Amarelo/Laranja) */}
          <Text style={styles.questionHighlight}>
            Onde você deseja realizar entregas?
          </Text>

          {/* 1. ESTADO (UF) */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Estado (UF)</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setEstado(text.toUpperCase())} // Força maiúsculas
              value={estado}
              placeholder="Ex: SP, DF, RJ..."
              placeholderTextColor="#A9A9A9"
              autoCapitalize="characters"
              maxLength={2}
            />
          </View>

          {/* 2. CIDADE */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Cidade</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCidade}
              value={cidade}
              placeholder="Digite sua cidade..."
              placeholderTextColor="#A9A9A9"
              autoCapitalize="words"
            />
          </View>

          {/* 3. BAIRRO/REGIÃO */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Bairro ou Região Principal</Text>
            <TextInput
              style={styles.input}
              onChangeText={setBairro}
              value={bairro}
              placeholder="Ex: Centro, Zona Sul..."
              placeholderTextColor="#A9A9A9"
              autoCapitalize="words"
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
            // Navega para a próxima tela (ex: Home ou Tela de espera/aprovação)
            onPress={() => navigation.navigate("EntregadorHome")}
            disabled={!isButtonEnabled}
          >
            <Text style={styles.continueButtonText}>Finalizar cadastro</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// =======================================================
// ESTILOS (Mantidos idênticos à tela de cadastro)
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
    color: "#6B98CE", // Azul claro do entregador
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

export default DefinirRegiaoEntregador;