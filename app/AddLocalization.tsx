import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
  Dimensions,
} from "react-native";
// Ícone atualizado para FontAwesome
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

// Obtém a largura da tela para dimensionar o mapa
const { width } = Dimensions.get("window");

interface MinhaLocalizacaoProps {
  onBackPress: () => void;
  onUseCurrentLocation: () => void;
  onSearch: (query: string) => void;
}

const MinhaLocalizacao: React.FC<MinhaLocalizacaoProps> = ({
  onBackPress,
  onUseCurrentLocation,
  onSearch,
}) => {
  const navigation = useNavigation<navigationProp>();
  const [searchQuery, setSearchQuery] = useState("");

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
        <Text style={styles.headerTitle}>MINHA LOCALIZAÇÃO</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.questionHighlight}>
            Onde quer receber os seus pedidos?
          </Text>

          {/* Campo de Busca (Search Bar) */}
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              onChangeText={setSearchQuery}
              value={searchQuery}
              placeholder="Buscar endereço"
              placeholderTextColor="#A9A9A9"
              returnKeyType="search"
              onSubmitEditing={() => onSearch(searchQuery)}
            />
            <TouchableOpacity
              style={styles.searchIconContainer}
              onPress={() => onSearch(searchQuery)}
            >
              {/* Ícone de lupa FontAwesome */}
              <Icon name="search" size={20} color="#A9A9A9" />
            </TouchableOpacity>
          </View>

          {/* Área do Mapa Simulado */}
          <View style={styles.mapContainer}>
            {/* Marcador de Pin Vermelho (map-marker) */}
            <Icon
              name="map-marker"
              size={40}
              color="#FF0000"
              style={styles.mapPin}
            />
          </View>
        </View>

        {/* Botão de Localização Atual (Fundo Fixo) */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => navigation.navigate("AddAddress")}
          >
            {/* Ícone de mira/localização FontAwesome */}
            <Icon
              name="crosshairs"
              size={20}
              color="#FFFFFF"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.locationButtonText}>
              Usar a minha localização atual
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginBottom: 15,
  },
  // --- Input Busca Styles ---
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 50,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    height: "100%",
  },
  searchIconContainer: {
    paddingLeft: 10,
  },
  // --- Mapa Simulado Styles ---
  mapContainer: {
    width: "100%",
    // Altura proporcional para simular a área do mapa
    height: width * 0.7,
    backgroundColor: "#D9D9D9", // Cinza claro do mapa
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  mapPin: {
    // Ajusta o pin para que a ponta fique exatamente no centro
    marginTop: -20,
  },
  // --- Footer e Botões ---
  footer: {
    padding: 20,
    paddingHorizontal: 30,
    backgroundColor: "#F0F2F5",
  },
  locationButton: {
    backgroundColor: "#0064E6", // Botão de localização em AZUL
    borderRadius: 8,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  locationButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  // Placeholder para manter a compatibilidade com a estrutura de estilos base
  continueButton: {},
  continueButtonText: {},
  disabledButton: {},
  scrollContent: {},
});

export default MinhaLocalizacao;
