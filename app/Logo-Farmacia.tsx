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
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  LoginEmail: undefined;
  CriarConta: undefined;
  TelaPrincipal: undefined;
  tela: undefined;
  AdicionarLogoFarmacia: undefined;
};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

const AdicionarLogoFarmaciaNative = () => {
  const navigation = useNavigation<navigationProp>();
  const [logoUri, setLogoUri] = useState<string | null>(null);

  const handleSelectImage = () => {
    console.log("Simulando seleção de imagem...");
    const fakeImageUrl = "https://picsum.photos/seed/farmacia/160/160"; 
    setLogoUri(fakeImageUrl);
  };

  const handleSaveLogo = () => {
    if (logoUri) {
      console.log("Logo da farmácia 'salva' (fake):", logoUri);
      Alert.alert("Sucesso", "Logo salva com sucesso! (Simulação)");
    } else {
      Alert.alert("Atenção", "Por favor, selecione uma imagem antes de salvar.");
    }
  };

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
        <Text style={styles.headerTitle}>LOGO DA FARMÁCIA</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.questionHighlight}>
          Adicione a logo do seu estabelecimento para melhor identificação
        </Text>

        <TouchableOpacity style={styles.imagePickerContainer} onPress={handleSelectImage}>
          {logoUri ? (
            <Image source={{ uri: logoUri }} style={styles.logoImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Icon name="file-image-o" size={60} color="#A9A9A9" />
              {/* Ícone de adição só aparece se NÃO houver logoUri */}
              <Icon name="plus-circle" size={30} color="#0064E6" style={styles.addIcon} />
            </View>
          )}

          {/* Ícone de lápis só aparece se HOUVER logoUri */}
          {logoUri && (
            <TouchableOpacity style={styles.editIconContainer} onPress={handleSelectImage}>
              <Icon name="pencil" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.saveButton,
            !logoUri && styles.disabledButton
          ]}
          onPress={handleSaveLogo}
          disabled={!logoUri}
        >
          <Text style={styles.saveButtonText}>SALVAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate("DefinirSenha-FN")}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F2F5",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 30,
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
    backgroundColor: "#FFFFFF",
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
  questionHighlight: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFB300",
    marginBottom: 40,
    textAlign: "left",
  },
  imagePickerContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    borderWidth: 2,
    borderColor: "#DCDCDC",
    position: 'relative',
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    overflow: 'hidden',
  },
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 80,
    resizeMode: 'cover',
  },
  // Ajustado zIndex para garantir que o ícone fique sempre por cima
  addIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 2,
    zIndex: 1, // Garante que o ícone esteja acima da imagem/placeholder
  },
  // Ajustado zIndex para garantir que o ícone fique sempre por cima
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0064E6',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    zIndex: 1, // Garante que o ícone esteja acima da imagem
  },
  saveButton: {
    backgroundColor: "#0064E6",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    width: "100%",
    maxWidth: 200,
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
    opacity: 0.7,
  },
  footer: {
    padding: 20,
    paddingHorizontal: 30,
    backgroundColor: "#F0F2F5",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    width: "100%",
    marginTop: "auto",
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

export default AdicionarLogoFarmaciaNative;