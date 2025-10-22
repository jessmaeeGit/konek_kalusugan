import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Login({ onLogin, onRegister }: { onLogin: () => void; onRegister?: () => void }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}> 
      <View style={styles.logoWrap}>
        <Image source={require('../images/kklogo.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>Welcome to {'\n'} Konek Kalusugan</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerBtn} onPress={onRegister}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  logoWrap: {
    width: '100%',
    alignItems: 'center',
    marginTop: 120,
  },
  logo: {
    width: '70%',
    height: undefined,
    aspectRatio: 0.9,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 20,
    fontSize: 35,
    fontWeight: '700',
    color: '#1F2A37',
    textAlign: 'center',
  },
  buttons: {
    width: '90%',
    marginTop: 24,
    gap: 16,
  },
  loginBtn: {
    backgroundColor: '#38D66B',
    paddingVertical: 14,
    alignItems: 'center',
  },
  loginText: {
    color: '#0B1330',
    fontWeight: '700',
    fontSize: 18,
  },
  registerBtn: {
    backgroundColor: '#0B1330',
    paddingVertical: 14,
    alignItems: 'center',
    paddingHorizontal: 120,
  },
  registerText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },
});
