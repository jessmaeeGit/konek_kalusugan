import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginForm({ onBack, onRegister, onForgot, onLogin }: { onBack?: () => void; onRegister?: () => void; onForgot?: () => void; onLogin?: (email: string, password: string) => void }) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16, paddingBottom: insets.bottom }]}> 
      <TouchableOpacity accessibilityLabel="Back" accessibilityRole="button" style={styles.backWrap} onPress={onBack}>
        <Image source={require('../images/icons/arrow-left.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Login Your{"\n"}Account</Text>

      <View style={styles.inputWrap}>
        <Image source={require('../images/icons/email.png')} style={styles.inputIconImg} />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#97A3B6"
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={[styles.inputWrap, { marginTop: 14 }]}> 
        <Image source={require('../images/icons/lock-01.png')} style={styles.inputIconImg} />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#97A3B6"
          style={styles.input}
          secureTextEntry={hidePassword}
        />
        <TouchableOpacity onPress={() => setHidePassword((v) => !v)} style={styles.eyeButton}>
          <Image source={require('../images/icons/eye-closed.png')} style={styles.eyeImg} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.forgotWrap} onPress={onForgot}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={() => onLogin?.(email.trim(), password)}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerRow}>
        <Text style={styles.registerHint}>Don’t Have An Account? </Text>
        <TouchableOpacity onPress={onRegister}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  backWrap: {
    paddingVertical: 8,
    paddingRight: 16,
  },
  backArrow: {
    fontSize: 28,
    color: '#1F2A37',
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 8,
    fontSize: 34,
    fontWeight: '800',
    color: '#0B1330',
    lineHeight: 40,
  },
  inputWrap: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#2ECC71',
    backgroundColor: '#EFFFF4',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#2F3A4B',
  },
  inputIconImg: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#0B1330',
  },
  eyeButton: {
    marginLeft: 8,
    padding: 4,
  },
  eyeImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  forgotWrap: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  forgot: {
    color: '#2F3A4B',
  },
  loginBtn: {
    marginTop: 18,
    backgroundColor: '#38D66B',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    paddingHorizontal: 118,

  },
  loginText: {
    color: '#0B1330',
    fontWeight: '700',
    fontSize: 18,
  },
  registerRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerHint: {
    color: '#1F2A37',
  },
  registerLink: {
    color: '#0B1330',
    fontWeight: '700',
  },
});
