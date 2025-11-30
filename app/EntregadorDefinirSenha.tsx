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

type RootStackParamList = {
  LoginEmail: undefined;
  CriarConta: undefined;
  TelaPrincipal: undefined;
};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

interface DefinirSenhaProps {
  onBackPress: () => void;
  onContinuePress: (senha: string) => void;
}

const DefinirSenha: React.FC<DefinirSenhaProps> = ({
  onBackPress,
  onContinuePress,
}) => {
  const navigation = useNavigation<navigationProp>();
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  // Estado para controlar a visibilidade da senha (aplica-se a ambos os campos)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const MIN_LENGTH = 4;
  // Habilita o botão se a senha tiver o tamanho mínimo E as senhas coincidirem
  const isButtonEnabled =
    senha.length >= MIN_LENGTH && senha === confirmarSenha;

  const handleContinue = () => {
    if (isButtonEnabled) {
      onContinuePress(senha);
    } else if (senha.length < MIN_LENGTH) {
      alert(`A senha deve ter pelo menos ${MIN_LENGTH} caracteres.`);
    } else {
      alert("As senhas não coincidem. Por favor, verifique.");
    }
  };

  // Ícone a ser exibido: 'eye' se visível, 'eye-slash' se oculta
  const EyeIcon = () => (
    <TouchableOpacity
      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      style={styles.eyeIconContainer}
    >
      <Icon
        name={isPasswordVisible ? "eye" : "eye-slash"}
        size={20}
        color="#A9A9A9"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F2F5" />

      <View style={styles.header}>
        {/* CORREÇÃO 1: Seta de voltar agora navega para a TelaInicial */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-circle-left" size={32} color="#6B98CE" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DEFINIR SENHA</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.questionHighlight}>Escolha a sua senha.</Text>

          {/* Campo Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Por favor, insira a sua senha no campo abaixo.
            </Text>
            {/* O wrapper permite o campo de texto e o ícone na mesma linha */}
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.passwordInput}
                onChangeText={setSenha}
                value={senha}
                placeholder="Senha"
                placeholderTextColor="#A9A9A9"
                // Alterna a visibilidade baseado no estado
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
              />
              <EyeIcon />
            </View>
          </View>

          {/* Campo Confirmar Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirme a sua senha.</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.passwordInput}
                onChangeText={setConfirmarSenha}
                value={confirmarSenha}
                placeholder="Confirmar senha"
                placeholderTextColor="#A9A9A9"
                // Usa o mesmo estado de visibilidade
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
              />
              {/* O ícone é repetido aqui, mas o padding está no EyeIconContainer para alinhamento */}
              <EyeIcon />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !isButtonEnabled && styles.disabledButton,
            ]}
            onPress={() => navigation.navigate("EntregadorFotoPerfil")}
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
    backgroundColor: "#F0F2F5",
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
    color: "#6B98CE", // Azul Principal
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
    marginBottom: 8, // Ajustado para ser a instrução acima do primeiro input
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  // --- Input Styles ---
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  // Campo de Senha com Wrapper (adaptado do seu modelo)
  passwordInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingRight: 0, // Remove paddingRight para que o ícone controle
  },
  passwordInput: {
    flex: 1, // Faz o campo de texto ocupar o máximo de espaço
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIconContainer: {
    paddingHorizontal: 15, // Adiciona padding ao redor do ícone para touch area
    paddingVertical: 12,
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

export default DefinirSenha;
