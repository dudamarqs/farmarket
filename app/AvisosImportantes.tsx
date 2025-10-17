import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

// Adicione a nova tela à lista de rotas
type RootStackParamList = {
  ValidacaoEmail: undefined;
  MarketplaceHome: undefined;
  // Adicione outras telas conforme necessário
};

type AvisosScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Dados dos avisos para facilitar a renderização
const avisos = [
  { title: 'Medicamentos com prescrição:', text: 'Alguns só podem ser comprados com receita médica válida. Siga sempre a orientação do profissional de saúde.' },
  { title: 'Uso correto:', text: 'Leia a bula, respeite a dosagem e duração do tratamento. Não interrompa o uso sem orientação.' },
  { title: 'Efeitos colaterais:', text: 'Fique atento a reações adversas e procure um médico se necessário.' },
  { title: 'Medicamentos controlados:', text: 'Exigem cuidados especiais e não devem ser compartilhados.' },
  { title: 'Armazenamento:', text: 'Guarde os medicamentos em local adequado e confira a validade.' },
  { title: 'Grupos especiais:', text: 'Gestantes, lactantes e crianças devem consultar um médico antes do uso.' },
  { title: 'Interações:', text: 'Informe seus profissionais sobre todos os medicamentos em uso.' },
  { title: 'Compra segura:', text: 'Compre apenas de fornecedores autorizados e confira o registro na Anvisa.' },
];

const AvisosImportantes = () => {
  const navigation = useNavigation<AvisosScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Cabeçalho Reutilizado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-circle-left" size={32} color="#0064E6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AVISOS IMPORTANTES</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.mainTitle}>Leia as instruções abaixo:</Text>
        
        {/* Lista de Avisos */}
        {avisos.map((aviso, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>
              <Text style={{ fontWeight: 'bold' }}>{aviso.title}</Text> {aviso.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Footer com o botão de continuar */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('MarketplaceHome')}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// =======================================================
// ESTILOS SEGUINDO O PADRÃO DAS TELAS ANTERIORES
// =======================================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    padding: 5,
  },
  headerTitle: {
    color: '#0064E6',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFB300', // Tom de amarelo/dourado
    marginBottom: 15,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingRight: 10, // Evita que o texto encoste na borda
  },
  bullet: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  listText: {
    flex: 1, // Permite que o texto quebre a linha corretamente
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  footer: {
    padding: 20,
    paddingHorizontal: 30,
    backgroundColor: '#F0F2F5',
  },
  continueButton: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AvisosImportantes;