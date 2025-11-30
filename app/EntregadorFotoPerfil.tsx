import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
// Ícone padrão do projeto
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Definição das rotas
type RootStackParamList = {
  EntregadorDefinirRegiao: undefined;
};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

const DefinirFotoPerfil = () => {
  const navigation = useNavigation<navigationProp>();
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // Simula a seleção de uma foto da galeria ou câmera
  const handleSelectPhoto = () => {
    // Aqui entraria a lógica real com 'expo-image-picker' ou 'react-native-image-picker'
    console.log("Simulando seleção de foto...");
    const fakeImageUrl = "https://picsum.photos/seed/entregador/300/300"; 
    setPhotoUri(fakeImageUrl);
  };

  // Botão habilitado apenas se houver foto
  const isButtonEnabled = !!photoUri;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F2F5" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          {/* Cor azul clara usada no fluxo de entregador */}
          <Icon name="arrow-circle-left" size={32} color="#6B98CE" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FOTO DE PERFIL</Text>
      </View>

      <View style={styles.container}>
        {/* Título e Instrução */}
        <Text style={styles.questionHighlight}>
          Adicione uma foto para o seu perfil
        </Text>
        <Text style={styles.instructionText}>
          Sua foto ajuda os clientes a identificarem você no momento da entrega.
        </Text>

        {/* Área de Seleção de Imagem */}
        <View style={styles.pickerWrapper}>
          <TouchableOpacity style={styles.imagePickerContainer} onPress={handleSelectPhoto}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderContainer}>
                <Icon name="user" size={80} color="#A9A9A9" />
                <View style={styles.addIconBadge}>
                   <Icon name="camera" size={20} color="#FFFFFF" />
                </View>
              </View>
            )}
          </TouchableOpacity>

          {/* Botão de texto auxiliar */}
          <TouchableOpacity onPress={handleSelectPhoto}>
            <Text style={styles.pickerActionText}>
              {photoUri ? "Alterar foto" : "Toque para adicionar"}
            </Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !isButtonEnabled && styles.disabledButton,
          ]}
          onPress={() => {
            if (isButtonEnabled) {
              // Navega para a próxima tela (Home ou Tela de Sucesso)
              navigation.navigate("EntregadorDefinirRegiao");
            } else {
              Alert.alert("Atenção", "Por favor, adicione uma foto de perfil para continuar.");
            }
          }}
          disabled={!isButtonEnabled}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 30,
    paddingTop: 30,
    alignItems: "center", // Centraliza o conteúdo horizontalmente
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
  // --- Textos ---
  questionHighlight: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFB300", // Laranja destaque
    marginBottom: 10,
    textAlign: "center",
  },
  instructionText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  // --- Image Picker ---
  pickerWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  imagePickerContainer: {
    width: 200,
    height: 200,
    borderRadius: 100, // Círculo perfeito
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    // Sombra
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  placeholderContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    resizeMode: "cover",
  },
  addIconBadge: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "#6B98CE", // Azul do tema
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  pickerActionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B98CE",
  },
  // --- Footer ---
  footer: {
    padding: 20,
    paddingHorizontal: 30,
    backgroundColor: "#F0F2F5",
    width: "100%",
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

export default DefinirFotoPerfil;