import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// Ícone atualizado para FontAwesome (estilo Bootstrap)
import Icon from "react-native-vector-icons/FontAwesome";

type RootStackParamList = {
  TelaInicial: undefined;
  LoginEmail: undefined;
  ValidacaoEmail: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginEmail = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 1. Novo estado para controlar a visibilidade da senha
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        {/* CORREÇÃO 1: Seta de voltar agora navega para a TelaInicial */}
        <TouchableOpacity
          onPress={() => navigation.navigate("TelaInicial")}
          style={styles.backButton}
        >
          <Icon name="arrow-circle-left" size={32} color="#0064E6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ENTRAR EM UMA CONTA</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image
            source={require("../assets/images/cientistas.png")}
            style={styles.illustration}
            resizeMode="contain"
          />
          <Text style={styles.title}>Que bom que você voltou!</Text>
          <Text style={styles.subtitle}>
            Informe seus dados abaixo para realizar login
          </Text>

          {/* Campo de E-mail (sem alterações) */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Insira seu e-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="exemplo.usuario@email.com"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* 2. Campo de Senha com funcionalidade de visibilidade */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Insira sua senha</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Digite sua senha..."
                placeholderTextColor="#A9A9A9"
                secureTextEntry={!isPasswordVisible} // A lógica aqui permanece a mesma
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          {/* CORREÇÃO 2: A função onPress foi movida para ser uma prop do TouchableOpacity */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate("ValidacaoEmail")}
          >
            <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// =======================================================
// ESTILOS COM AJUSTES PARA O CAMPO DE SENHA
// =======================================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F2F5",
  },
  container: {
    flex: 1,
  },
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
    color: "#0064E6",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
  },
  illustration: {
    width: 350,
    height: 300,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0064E6",
    textAlign: "left",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFB300",
    textAlign: "left",
    marginBottom: 15,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "700",
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
  // 3. Novos estilos para o campo de senha com ícone
  passwordInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1, // Faz o campo de texto ocupar o espaço disponível
    paddingVertical: 12,
    fontSize: 16,
  },
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
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default LoginEmail;
