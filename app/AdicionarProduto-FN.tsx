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
  Alert,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import DropDownPicker from 'react-native-dropdown-picker';

type RootStackParamList = {
  Produtos: undefined;
  AdicionarProduto: undefined;
};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;

const AdicionarProdutoScreen = () => {
  const navigation = useNavigation<navigationProp>();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("R$ 0,00");
  const [imagemUri, setImagemUri] = useState<string | null>(null);
  const [stock, setStock] = useState(""); 
  
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null); 
  const [items, setItems] = useState([ 
    { label: 'Remédio', value: 'remedio' },
    { label: 'Cosmético', value: 'cosmetico' },
    { label: 'Higiene', value: 'higiene' },
    { label: 'Suplemento', value: 'suplemento' },
    { label: 'Outro', value: 'outro' }
  ]);

  const handlePrecoChange = (text: string) => {
    const numericValue = text.replace(/\D/g, "");
    const value = Number(numericValue);
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100);
    setPreco(formatted);
  };
  
  // --- MUDANÇA: Função para filtrar o estoque ---
  /**
   * Garante que apenas números inteiros sejam aceitos no estoque
   */
  const handleStockChange = (text: string) => {
    // Remove qualquer caractere que NÃO seja um dígito (0-9)
    const numericValue = text.replace(/\D/g, ''); 
    setStock(numericValue);
  };
  // --- FIM DA MUDANÇA ---

  const handleImageSelect = () => {
    const fakeImageUrl = `https://picsum.photos/seed/${nome || 'produto'}/120/120`;
    setImagemUri(fakeImageUrl);
  };

  const handleSave = () => {
    if (!nome || preco === "R$ 0,00" || !value || !stock) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    
    console.log("Salvando produto:", { 
      nome, 
      descricao, 
      categoria: value, 
      preco, 
      stock: Number(stock), 
      imagemUri 
    });
    Alert.alert("Sucesso", "Produto salvo com sucesso! (Simulação)");
    navigation.goBack();
  };

  const isSaveEnabled = nome.trim().length > 0 && preco.trim() !== "R$ 0,00" && value !== null && stock.trim().length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F2F5" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left-circle" size={32} color="#0064E6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ADICIONAR PRODUTO</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={{ paddingBottom: 20 }}
          scrollEnabled={!open} 
        >
          
          <Text style={styles.label}>Nome do produto</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do produto"
            placeholderTextColor="#A9A9A9"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            placeholder="Escreva uma descrição curta"
            placeholderTextColor="#A9A9A9"
            multiline={true}
            numberOfLines={4}
            value={descricao}
            onChangeText={setDescricao}
          />

          <Text style={styles.label}>Categoria</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            placeholder="Selecione uma categoria"
            dropDownContainerStyle={styles.dropdownListContainer} 
            zIndex={1000} 
            zIndexInverse={1000}
          />

          <Text style={styles.label}>Preço</Text>
          <TextInput
            style={styles.input}
            placeholder="R$ 0,00"
            placeholderTextColor="#A9A9A9"
            value={preco}
            onChangeText={handlePrecoChange}
            keyboardType="numeric"
          />

          {/* --- MISTURA: Campo de Estoque Atualizado --- */}
          <Text style={styles.label}>Estoque (unidades)</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#A9A9A9"
            value={stock}
            // Chama a nova função de filtro
            onChangeText={handleStockChange} 
            keyboardType="numeric" // Mantém o teclado numérico
          />
          {/* --- FIM DA MUDANÇA --- */}

          <Text style={styles.label}>Imagem</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={handleImageSelect}>
            {imagemUri ? (
              <Image source={{ uri: imagemUri }} style={styles.imagePreview} />
            ) : (
              <Icon name="upload" size={40} color="#A9A9A9" />
            )}
          </TouchableOpacity>
          
        </ScrollView>

        <View style={styles.footerButtonsContainer}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.saveButton, 
              !isSaveEnabled && styles.disabledButton
            ]}
            onPress={handleSave}
            disabled={!isSaveEnabled}
          >
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Estilos
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 10,
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
    color: "#333",
  },
  inputMultiline: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  
  dropdown: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownListContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCDCDC",
  },

  imagePicker: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    resizeMode: 'cover',
  },
  footerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#F0F2F5",
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#0064E6',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    width: '48%',
  },
  cancelButtonText: {
    color: '#0064E6',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#0064E6',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    width: '48%',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
    opacity: 0.7,
  },
});

export default AdicionarProdutoScreen;