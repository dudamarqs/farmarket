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
  ScrollView, // Adicionado para telas menores
} from "react-native";
// Ícone atualizado para FontAwesome (estilo Bootstrap)
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  LoginEmail: undefined;
  CriarConta: undefined;
  TelaPrincipal: undefined;
  tela: undefined; // Rota de destino do botão 'Continuar'
};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

const CadastroFarmaciaNative = () => {
  const navigation = useNavigation<navigationProp>();

  // --- ESTADOS PARA OS CAMPOS ---
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  // --- INÍCIO DAS FUNÇÕES DE MÁSCARA ---

  // Função de formatação de CNPJ (máscara: 00.000.000/0001-00)
  const formatCnpj = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    let formatted = numericValue;

    if (numericValue.length > 2) {
      formatted =
        numericValue.substring(0, 2) + "." + numericValue.substring(2);
    }
    if (numericValue.length > 5) {
      formatted =
        numericValue.substring(0, 2) +
        "." +
        numericValue.substring(2, 5) +
        "." +
        numericValue.substring(5);
    }
    if (numericValue.length > 8) {
      formatted =
        numericValue.substring(0, 2) +
        "." +
        numericValue.substring(2, 5) +
        "." +
        numericValue.substring(5, 8) +
        "/" +
        numericValue.substring(8);
    }
    if (numericValue.length > 12) {
      formatted =
        numericValue.substring(0, 2) +
        "." +
        numericValue.substring(2, 5) +
        "." +
        numericValue.substring(5, 8) +
        "/" +
        numericValue.substring(8, 12) +
        "-" +
        numericValue.substring(12, 14);
    }

    return formatted.substring(0, 18); // Limita ao 00.000.000/0001-00
  };

  // Função de formatação de Telefone (máscara: (00) 00000-0000 ou (00) 0000-0000)
  const formatTelefone = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    let formatted = numericValue;

    if (numericValue.length > 0) {
      formatted = "(" + numericValue.substring(0, 2);
    }
    if (numericValue.length > 2) {
      formatted = "(" + numericValue.substring(0, 2) + ") " + numericValue.substring(2);
    }

    // Verifica se é celular (11 dígitos) ou fixo (10 dígitos)
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
      // Fixo: (XX) XXXX-XXXX
      formatted =
        "(" +
        numericValue.substring(0, 2) +
        ") " +
        numericValue.substring(2, 6) +
        "-" +
        numericValue.substring(6, 10);
    }

    return formatted.substring(0, 15); // Limite máximo (XX) XXXXX-XXXX
  };

  // Handlers para aplicar as máscaras
  const handleCnpjChange = (text: string) => {
    setCnpj(formatCnpj(text));
  };

  const handleTelefoneChange = (text: string) => {
    setTelefone(formatTelefone(text));
  };

  // --- FIM DAS FUNÇÕES DE MÁSCARA ---

  // Lógica do botão atualizada para verificar os dígitos (sem máscara)
  const isButtonEnabled =
    nome.trim().length > 0 &&
    cnpj.replace(/\D/g, "").length === 14 && // CNPJ deve ter 14 dígitos
    email.trim().length > 0 && // Validação simples de e-mail
    (telefone.replace(/\D/g, "").length === 10 || // Telefone pode ter 10 (fixo)
      telefone.replace(/\D/g, "").length === 11); // ou 11 (celular)

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F2F5" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-circle-left" size={32} color="#0064E6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CADASTRAR FARMÁCIA</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 30 }}>
          <Text style={styles.questionHighlight}>
            Informe os dados do seu estabelecimento nos campos abaixo
          </Text>

          {/* --- Campo Nome da Farmácia --- */}
          <Text style={styles.instructionText}>Nome da Farmácia:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setNome}
              value={nome}
              placeholder="Ex: Farmácia Central"
              placeholderTextColor="#A9A9A9"
              autoCapitalize="words"
            />
          </View>

          {/* --- Campo CNPJ (COM MÁSCARA) --- */}
          <Text style={styles.instructionText}>CNPJ:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={handleCnpjChange} // Alterado
              value={cnpj}
              placeholder="00.000.000/0001-00"
              placeholderTextColor="#A9A9A9"
              keyboardType="numeric"
              maxLength={18} // Adicionado (00.000.000/0001-00)
            />
          </View>

          {/* --- Campo E-mail --- */}
          <Text style={styles.instructionText}>Email:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="contato@suafarmacia.com"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* --- Campo Telefone/Celular (COM MÁSCARA) --- */}
          <Text style={styles.instructionText}>Telefone/Celular da Farmácia:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={handleTelefoneChange} // Alterado
              value={telefone}
              placeholder="(11) 99999-9999"
              placeholderTextColor="#A9A9A9"
              keyboardType="phone-pad"
              maxLength={15} // Adicionado ( (XX) XXXXX-XXXX )
            />
          </View>
        </ScrollView>

        {/* Botão Inferior Fixo */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !isButtonEnabled && styles.disabledButton,
            ]}
            onPress={() => {
              if (isButtonEnabled) {
                // Envia os dados limpos (sem máscara)
                console.log("Dados da Farmácia:", {
                  nome,
                  cnpj: cnpj.replace(/\D/g, ""),
                  email,
                  telefone: telefone.replace(/\D/g, ""),
                });
                navigation.navigate('EnderecoFarmacia');
              }
            }}
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
    backgroundColor: "#FFFFFF", // Fundo do header para consistência
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
    flex: 1, // Permite que o ScrollView ocupe o espaço
  },
  questionHighlight: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFB300", // Destaque Laranja/Amarelo
    marginBottom: 20, // Aumentado o espaço
  },
  instructionText: {
    fontSize: 16,
    fontWeight: "500", // Levemente mais forte para ser um label
    color: "#333",
    marginBottom: 8, // Espaço entre o label e o input
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
  },
  // --- Footer e Botões ---
  footer: {
    padding: 20,
    paddingHorizontal: 30,
    backgroundColor: "#F0F2F5",
    borderTopWidth: 1, // Adiciona separador
    borderTopColor: "#E0E0E0", // Cor do separador
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

export default CadastroFarmaciaNative;