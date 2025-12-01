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
  // --- MUDANÇA: Importar Modal e Pressable ---
  Modal,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DropDownPicker from 'react-native-dropdown-picker';
import { tranformarMoeda } from "@/utils/dinheiro";

// Interface de Produto
interface Product {
  id?: string;
  name: string;
  description?: string;
  category?: string;
  price: string;
  stock: string;
  imageUrl?: string | null;
}

// Lista de rotas
type RootStackParamList = {
  Produtos: undefined;
  AdicionarProduto: undefined;
  EditarProduto: { product: Product };
};

type navigationProp = NativeStackNavigationProp<RootStackParamList>;
type EditarProdutoRouteProp = RouteProp<RootStackParamList, 'EditarProduto'>;

const EditarProdutoScreen = () => {
  const navigation = useNavigation<navigationProp>();
  const route = useRoute<EditarProdutoRouteProp>();
  const { product } = route.params;

  // --- MUDANÇA: Estado para controlar o modal ---
  const [modalVisible, setModalVisible] = useState(false);
  // --- FIM DA MUDANÇA ---

  // Estados do formulário
  const [nome, setNome] = useState(product.name);
  const [descricao, setDescricao] = useState(product.description || "");
  const [preco, setPreco] = useState(product.price);
  const [stock, setStock] = useState(String(product.stock));
  const [imagemUri, setImagemUri] = useState<string | null>(product.imageUrl || null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(product.category || null);
  const [items, setItems] = useState([
    { label: 'Remédio', value: 'remedio' },
    { label: 'Cosmético', value: 'cosmetico' },
    { label: 'Higiene Pessoal', value: 'higiene' },
    { label: 'Suplemento', value: 'suplemento' },
    { label: 'Outro', value: 'outro' }
  ]);

  // Funções de máscara
  const handlePrecoChange = (text: string) => {
    const numericValue = text.replace(/\D/g, "");
    const value = Number(numericValue);
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100);
    setPreco(formatted);
  };

  const handleStockChange = (text: string) => {
    const numericValue = text.replace(/\D/g, '');
    setStock(numericValue);
  };

  const handleImageSelect = () => {
    const fakeImageUrl = `https://picsum.photos/seed/${nome || 'produto'}/120/120`;
    setImagemUri(fakeImageUrl);
  };

  // Lógica de Salvar
  const handleSave = async () => {
    if (!nome || !preco || !value || !stock) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const updatedProduct = {
      nome: nome,
      preco: tranformarMoeda(preco),
      estoque: stock,
      descricao: descricao,
      farmacia_id: 1,
      imagem: '/////'
    }; // (Lógica de salvar)

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/produtos/atualizar/${product.id}`, {
        headers: {
          'Content-Type': 'application/json', // <--- ADICIONE ESTA LINHA
        },
        method: 'PUT',
        body: JSON.stringify(updatedProduct)
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Produto atualizado com sucesso!");
        navigation.goBack();
      }
      else {
        Alert.alert("Ocorreu um erro de ao salvar os dados");
        console.log(JSON.stringify(updatedProduct));
        console.log(await response.json());

      }
    }
    catch (erro) {
      Alert.alert(`Ocorreu um erro inesperado ${erro}`);
    }
  };

  // --- MUDANÇA: 'Remover' agora abre o modal ---
  const handleRemove = () => {
    setModalVisible(true); // Apenas abre o modal
  };

  // --- MUDANÇA: Lógica de remoção movida para cá ---
  const confirmRemove = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/produtos/deletar/${product.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Produto removido com sucesso!");
        setModalVisible(false); // Fecha o modal
        navigation.goBack();
      }
      else {
        Alert.alert("Ocorreu um erro de ao remover os dados");

      }
    }
    catch (erro) {
      Alert.alert(`Ocorreu um erro inesperado ${erro}`);
    }
  };
  // --- FIM DA MUDANÇA ---

  const isSaveEnabled = nome.trim().length > 0 && preco.trim() !== "R$ 0,00" && value !== null && stock.trim().length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F2F5" />

      {/* --- MUDANÇA: JSX DO MODAL --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {/* Overlay escuro */}
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)} // Fecha ao clicar fora
        >
          {/* Conteúdo do Modal (para evitar que o clique feche) */}
          <Pressable style={styles.modalContent} onPress={() => { }}>
            {/* Ícone de Fechar (X) */}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>

            {/* Ícone de Alerta (!) */}
            <Icon name="alert-circle-outline" size={32} color="#FFB300" style={styles.modalWarningIcon} />

            {/* Texto */}
            <Text style={styles.modalText}>
              Tem certeza que deseja remover este produto do catálogo?
            </Text>

            {/* Container dos Botões */}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButtonSim} onPress={confirmRemove}>
                <Text style={styles.modalButtonSimText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonNao} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonNaoText}>Não</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
      {/* --- FIM DO JSX DO MODAL --- */}


      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left-circle" size={32} color="#0064E6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EDITAR PRODUTO</Text>
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
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputWithIcon}
              value={nome}
              onChangeText={setNome}
            />
            <Icon name="pencil-outline" size={20} style={styles.inputIcon} />
          </View>

          <Text style={styles.label}>Descrição</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.inputWithIcon, styles.inputMultiline]}
              multiline={true}
              numberOfLines={4}
              value={descricao}
              onChangeText={setDescricao}
            />
            <Icon name="pencil-outline" size={20} style={styles.inputIcon} />
          </View>

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
            value={preco}
            onChangeText={handlePrecoChange}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Estoque (unidades)</Text>
          <TextInput
            style={styles.input}
            value={stock}
            onChangeText={handleStockChange}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Imagem</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={handleImageSelect}>
            {imagemUri ? (
              <Image source={{ uri: imagemUri }} style={styles.imagePreview} />
            ) : (
              <Icon name="upload" size={40} color="#A9A9A9" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={handleRemove} // --- MUDANÇA: Chama o 'handleRemove'
          >
            <Text style={styles.removeButtonText}>Remover produto</Text>
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
  // ... (Estilos anteriores permanecem os mesmos) ...
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderRadius: 8,
  },
  inputWithIcon: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    paddingRight: 40,
  },
  inputIcon: {
    position: 'absolute',
    right: 12,
    color: '#A9A9A9',
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
  removeButton: {
    backgroundColor: '#E53935',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
    marginBottom: 10,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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

  // --- MUDANÇA: Estilos do Modal ---
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro semi-transparente
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 25,
    width: '85%', // 85% da largura da tela
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 5,
  },
  modalWarningIcon: {
    marginBottom: 15,
    color: '#FFB300', // Amarelo/Laranja do tema
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30, // Mais espaço antes dos botões
    marginTop: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Espaço entre os botões
    width: '100%',
  },
  modalButtonSim: {
    backgroundColor: '#E53935', // Vermelho
    borderRadius: 8,
    paddingVertical: 12,
    flex: 0.48, // Quase metade do espaço
    alignItems: 'center',
  },
  modalButtonSimText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalButtonNao: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#0064E6', // Azul do tema
    borderRadius: 8,
    paddingVertical: 12,
    flex: 0.48, // Quase metade do espaço
    alignItems: 'center',
  },
  modalButtonNaoText: {
    color: '#0064E6',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // --- FIM DOS ESTILOS DO MODAL ---
});

export default EditarProdutoScreen;