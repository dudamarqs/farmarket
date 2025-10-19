import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  Image,
  Dimensions,
  Keyboard,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

// Adicione a nova tela à lista de rotas
type RootStackParamList = {
  TelaInicial: undefined;
  LoginEmail: undefined;
  ValidacaoEmail: undefined;
  AvisosImportantes: undefined;
};

type ValidationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ValidacaoEmail = () => {
  const navigation = useNavigation<ValidationScreenNavigationProp>();
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const correctCode = '1234';
  const isCodeValid = code.join('') === correctCode;

  const handleTextChange = (text: string, index: number) => {
    // Cria uma cópia do array de código para alteração
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Foca no próximo input se um dígito for inserido
    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
    
    // Esconde o teclado se o último dígito for inserido
    if (text && index === 3) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Foca no input anterior se backspace for pressionado em um campo vazio
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Cabeçalho Reutilizado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-circle-left" size={32} color="#0064E6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CONFIRMAÇÃO DE E-MAIL</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Insira o código de confirmação.</Text>
        <Text style={styles.subtitle}>
          Um código de <Text style={{fontWeight: 'bold'}}>4 dígitos</Text> foi enviado para o seu email. Por favor insira-o nos campos abaixo:
        </Text>

        {/* Inputs para o código */}
        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.codeInput}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(text) => handleTextChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              value={digit}
            />
          ))}
        </View>

        <Text style={styles.resendText}>Não recebeu o código?</Text>
        <TouchableOpacity style={styles.resendButton}>
          <Text style={styles.resendButtonText}>Reenviar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer com o botão de continuar */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !isCodeValid && styles.continueButtonDisabled, // Estilo condicional
          ]}
          disabled={!isCodeValid} // Habilita/desabilita o botão
          onPress={() => navigation.navigate('AvisosImportantes')}
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
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFB300', 
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    color: '#555',
    textAlign: 'left',
    marginBottom: 30,
    lineHeight: 24,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  codeInput: {
    width: 70,
    height: 70,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  resendText: {
    fontSize: 16,
    color: '#bebebeff',
    marginBottom: 5,
  },
  resendButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#0064E6',
    borderRadius: 5,
    marginTop: 5,
  },
  resendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
  continueButtonDisabled: {
    backgroundColor: '#acacacff', // Cor cinza para o botão desabilitado
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ValidacaoEmail;