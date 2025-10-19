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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

// Tipos para o estado da tag
type AddressType = "Casa" | "Trabalho" | "Outro" | null;

interface EnderecoProps {
  onBackPress: () => void;
  onSaveAddress: (data: any) => void;
  // Simula dados iniciais vindo do mapa/geolocalização
  initialAddress?: { street: string; cityState: string };
}

const Endereco: React.FC<EnderecoProps> = ({
  onBackPress,
  onSaveAddress,
  initialAddress = {
    street: "St. B Norte Cnb 14 Qnb",
    cityState: "Taguatinga, Brasília, DF",
  },
}) => {
  const navigation = useNavigation<navigationProp>();
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState(
    initialAddress.cityState.split(",")[0].trim() || ""
  );
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState(initialAddress.street || "");
  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");
  const [semComplemento, setSemComplemento] = useState(false);
  const [addressTag, setAddressTag] = useState<AddressType>("Casa");

  // Lógica de formatação de CEP (máscara: 00000-000)
  const handleCepChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    let formatted = numericValue;
    if (numericValue.length > 5) {
      formatted = `${numericValue.substring(0, 5)}-${numericValue.substring(
        5,
        8
      )}`;
    }
    setCep(formatted.substring(0, 9));
  };

  // Habilita o botão se os campos principais estiverem preenchidos
  const isButtonEnabled =
    estado && cidade && bairro && rua && cep.replace(/\D/g, "").length === 8;

  const handleSave = () => {
    if (isButtonEnabled) {
      const addressData = {
        estado,
        cidade,
        bairro,
        rua,
        cep: cep.replace(/\D/g, ""),
        complemento: semComplemento ? "Sem complemento" : complemento,
        tag: addressTag,
      };
      onSaveAddress(addressData);
    } else {
      alert(
        "Por favor, preencha todos os campos obrigatórios (Rua, Bairro, Cidade, Estado e CEP)."
      );
    }
  };

  // Componente Checkbox Simulado
  const Checkbox = () => (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => setSemComplemento(!semComplemento)}
    >
      <View style={[styles.checkbox, semComplemento && styles.checkboxChecked]}>
        {semComplemento && <Icon name="check" size={12} color="#FFFFFF" />}
      </View>
      <Text style={styles.checkboxLabel}>Endereço sem complemento</Text>
    </TouchableOpacity>
  );

  // Componente Tag de Endereço
  const AddressTag = ({
    label,
    iconName,
    type,
  }: {
    label: string;
    iconName?: string;
    type: AddressType;
  }) => (
    <TouchableOpacity
      style={[
        styles.tagButton,
        addressTag === type && styles.tagButtonSelected,
      ]}
      onPress={() => setAddressTag(type)}
    >
      {/* O ícone só é renderizado se houver iconName */}
      {iconName && (
        <Icon
          name={iconName}
          size={16}
          color={addressTag === type ? "#FFFFFF" : "#333"}
          style={{ marginRight: 5 }}
        />
      )}
      <Text
        style={[styles.tagText, addressTag === type && styles.tagTextSelected]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F2F5" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-circle-left" size={32} color="#0064E6" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ENDEREÇO</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Mapa Simulado e Localização Confirmada */}
          <View style={styles.mapSmallContainer}>
            <Icon
              name="map-marker"
              size={40}
              color="#FF0000"
              style={styles.mapPin}
            />
          </View>
          <View style={styles.addressInfo}>
            <Text style={styles.addressStreet}>{initialAddress.street}</Text>
            <Text style={styles.addressCity}>{initialAddress.cityState}</Text>
          </View>

          {/* Formulário de Endereço */}
          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>Estado</Text>
            <TextInput
              style={styles.input}
              placeholder="Informe o Estado"
              value={estado}
              onChangeText={setEstado}
              autoCapitalize="words"
            />

            <Text style={styles.inputLabel}>Cidade</Text>
            <TextInput
              style={styles.input}
              placeholder="Informe a cidade..."
              value={cidade}
              onChangeText={setCidade}
              autoCapitalize="words"
            />

            <Text style={styles.inputLabel}>Bairro</Text>
            <TextInput
              style={styles.input}
              placeholder="Informe o bairro..."
              value={bairro}
              onChangeText={setBairro}
              autoCapitalize="words"
            />

            <Text style={styles.inputLabel}>Rua</Text>
            <TextInput
              style={styles.input}
              placeholder="Informe a rua..."
              value={rua}
              onChangeText={setRua}
            />

            <Text style={styles.inputLabel}>CEP</Text>
            <TextInput
              style={styles.input}
              placeholder="00000-00"
              value={cep}
              onChangeText={handleCepChange}
              keyboardType="numeric"
              maxLength={9}
            />

            <Text style={styles.inputLabel}>Complemento</Text>
            <TextInput
              style={[
                styles.input,
                semComplemento && { backgroundColor: "#EEE", color: "#666" },
              ]}
              placeholder="Condomínio, Apartamento..."
              value={semComplemento ? "" : complemento}
              onChangeText={setComplemento}
              editable={!semComplemento}
            />

            <Checkbox />

            {/* Tags de Endereço */}
            <View style={styles.tagSection}>
              <Text style={styles.tagTitle}>Salvar endereço como:</Text>
              <View style={styles.tagList}>
                <AddressTag label="Casa" iconName="home" type="Casa" />
                <AddressTag
                  label="Trabalho"
                  iconName="briefcase"
                  type="Trabalho"
                />
                <AddressTag label="Outro..." type="Outro" />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          {/* CORREÇÃO 2: A função onPress foi movida para ser uma prop do TouchableOpacity */}
          <TouchableOpacity
            style={[styles.continueButton]}
            onPress={() => navigation.navigate("AvisosImportantes")}
          >
            <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

/*<View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !isButtonEnabled && styles.disabledButton,
            ]}
            onPress={() => navigation.navigate("AvisosImportantes")}
            disabled={!isButtonEnabled}
          >
            <Text style={styles.continueButtonText}>Salvar endereço</Text>
          </TouchableOpacity>
        </View>
*/

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
    color: "#0064E6", // Azul Principal
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
  // --- Conteúdo Geral ---
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 20,
  },
  // --- Simulação do Mapa ---
  mapSmallContainer: {
    height: 100,
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  mapPin: {
    marginTop: -20,
  },
  addressInfo: {
    marginBottom: 20,
    paddingLeft: 5,
  },
  addressStreet: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 2,
  },
  addressCity: {
    fontSize: 14,
    color: "#666",
  },
  // --- Formulário ---
  formContainer: {
    paddingTop: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 15,
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
    height: 50,
  },
  // --- Checkbox Styles ---
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  checkbox: {
    height: 22,
    width: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#000", // Preto no ícone da imagem
    borderColor: "#000",
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#333",
  },
  // --- Tag Styles ---
  tagSection: {
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 20,
    marginBottom: 10,
  },
  tagTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  tagList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tagButton: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0", // Cinza claro para tags não selecionadas
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  tagButtonSelected: {
    backgroundColor: "#000000", // Tag selecionada em Preto (como no print)
  },
  tagText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  tagTextSelected: {
    color: "#FFFFFF",
  },
  // --- Footer e Botões ---
  footer: {
    padding: 20,
    paddingHorizontal: 30,
    backgroundColor: "#F0F2F5",
  },
  continueButton: {
    backgroundColor: "#000000", // Botão principal em Preto
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

export default Endereco;
