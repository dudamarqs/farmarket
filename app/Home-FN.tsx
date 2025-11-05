import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
// --- MUDANÇA ---
// Trocando FontAwesome por MaterialCommunityIcons para ícones mais modernos
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; 
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Definindo as rotas para onde cada botão vai navegar
type RootStackParamList = {
  TelaPrincipal: undefined; // A própria Home
  Produtos: undefined;
  Estoque: undefined;
  Pedidos: undefined;
  PerfilLoja: undefined;
  Configuracoes: undefined;
  Metricas: undefined;
};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<navigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F2F5" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MENU DE OPÇÕES</Text>
      </View>

      {/* Conteúdo da Home com a grade de botões */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.gridContainer}>
          
          {/* Botão Produtos (Azul) */}
          <TouchableOpacity
            style={[styles.menuButton, styles.buttonBlue]}
            onPress={() => navigation.navigate("ProdutosScreen-FN")}
          >
            {/* Ícone atualizado */}
            <Icon name="barcode-scan" size={40} color="#FFFFFF" /> 
            <Text style={styles.menuButtonTextWhite}>Produtos</Text>
          </TouchableOpacity>

          {/* Botão Estoque (Branco, ícone/texto Azul) */}
          <TouchableOpacity
            style={[styles.menuButton, styles.buttonWhite]}
            onPress={() => navigation.navigate("Estoque")}
          >
            {/* Ícone atualizado */}
            <Icon name="package-variant-closed" size={40} color="#0064E6" /> 
            <Text style={styles.menuButtonTextBlue}>Estoque</Text>
          </TouchableOpacity>

          {/* Botão Pedidos (Branco, ícone/texto Amarelo) */}
          <TouchableOpacity
            style={[styles.menuButton, styles.buttonWhite]}
            onPress={() => navigation.navigate("Pedidos")}
          >
            {/* Ícone atualizado */}
            <Icon name="clipboard-text-outline" size={40} color="#FFB300" /> 
            <Text style={styles.menuButtonTextYellow}>Pedidos</Text>
          </TouchableOpacity>

          {/* Botão Perfil da loja (Amarelo) */}
          <TouchableOpacity
            style={[styles.menuButton, styles.buttonYellow]}
            onPress={() => navigation.navigate("PerfilLoja")}
          >
            {/* Ícone atualizado */}
            <Icon name="storefront-outline" size={40} color="#333" /> 
            <Text style={styles.menuButtonTextDark}>Perfil da loja</Text>
          </TouchableOpacity>

          {/* Botão Configurações (Amarelo) */}
          <TouchableOpacity
            style={[styles.menuButton, styles.buttonYellow]}
            onPress={() => navigation.navigate("Configuracoes")}
          >
            {/* Ícone atualizado */}
            <Icon name="cog-outline" size={40} color="#333" /> 
            <Text style={styles.menuButtonTextDark}>Configurações</Text>
          </TouchableOpacity>

          {/* Botão Métricas (Azul) */}
          <TouchableOpacity
            style={[styles.menuButton, styles.buttonBlue]}
            onPress={() => navigation.navigate("Metricas")}
          >
            {/* Ícones atualizados (removi a seta para ficar mais limpo, como na foto) */}
            <Icon name="chart-line" size={40} color="#FFFFFF" />
            <Text style={styles.menuButtonTextWhite}>Métricas</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Estilos (permanecem os mesmos)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F2F5", 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", 
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    color: "#0064E6", 
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 30, 
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", 
  },
  menuButton: {
    width: "48%", 
    aspectRatio: 1.15, 
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  buttonBlue: {
    backgroundColor: "#0064E6", 
  },
  buttonWhite: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  buttonYellow: {
    backgroundColor: "#FFB300", 
  },
  // --- Estilos de Texto dos Botões ---
  menuButtonTextWhite: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    textAlign: 'center',
  },
  menuButtonTextBlue: {
    color: "#0064E6",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    textAlign: 'center',
  },
  menuButtonTextYellow: {
    color: "#FFB300",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    textAlign: 'center',
  },
  menuButtonTextDark: {
    color: "#333333",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;