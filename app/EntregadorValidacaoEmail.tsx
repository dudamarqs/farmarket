import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

// Definição das rotas
type RootStackParamList = {
  EntregadorHome: undefined;
};

type ValidationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ValidacaoEmail = () => {
  const navigation = useNavigation<ValidationScreenNavigationProp>();
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const correctCode = '1234';
  const isCodeValid = code.join('') === correctCode;

  const handleTextChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
    
    if (text && index === 3) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // Função para navegar para a Home
  const handleContinue = () => {
    navigation.navigate('EntregadorHome');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-circle-left" size={32} color="#6B98CE" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CONFIRMAÇÃO DE E-MAIL</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Insira o código de confirmação.</Text>
        <Text style={styles.subtitle}>
          Um código de <Text style={{fontWeight: 'bold'}}>4 dígitos</Text> foi enviado para o seu email. Por favor insira-o nos campos abaixo:
        </Text>

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

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !isCodeValid && styles.continueButtonDisabled,
          ]}
          disabled={!isCodeValid}
          onPress={handleContinue} // Chamando a navegação aqui
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
    color: '#6B98CE',
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
    backgroundColor: '#6B98CE',
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
    backgroundColor: '#acacacff',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ValidacaoEmail;