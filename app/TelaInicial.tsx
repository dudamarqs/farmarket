// TelaInicial.tsx - ESTE CÓDIGO ESTÁ CORRETO
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  LoginEmail: undefined;
  CriarConta: undefined;
  TelaPrincipal: undefined;
};

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TelaInicial = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../assets/images/tela_inicial.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            <Text style={styles.welcomeText}>SEJA BEM-VINDO(A) À</Text>
            <Text style={styles.brandName}>Farmarket</Text>

            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={() => navigation.navigate('LoginEmail')}>
              <Text style={styles.buttonPrimaryText}>Entrar com e-mail</Text>
            </TouchableOpacity>

            <Text style={styles.hintText}>não possui uma conta?</Text>

            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={() => navigation.navigate('CriarConta')}>
              <Text style={styles.buttonSecondaryText}>Criar nova conta</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonTertiary}
              onPress={() => navigation.navigate('TelaPrincipal')}>
              <Text style={styles.buttonTertiaryText}>Continuar como visitante →</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '600',
    textAlign: 'left',
    letterSpacing: 1.5,
    marginBottom: -5,
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 42,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: 10,
  },
  buttonPrimary: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonPrimaryText: {
    color: '#212121',
    fontSize: 20,
    fontWeight: '600',
  },
  hintText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    opacity: 0.8,
  },
  buttonSecondary: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonSecondaryText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  buttonTertiary: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonTertiaryText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default TelaInicial;