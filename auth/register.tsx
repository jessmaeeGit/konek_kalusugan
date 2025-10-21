import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Register({ onBack, onComplete }: { onBack?: () => void; onComplete: (profile: { name: string; email: string }) => void }) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);

  const createAccount = () => {
    // Here you would normally validate and call an API.
    // For now, pass profile data up so the app can store it.
    onComplete({ name: name.trim(), email: email.trim() });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16, paddingBottom: insets.bottom }]}> 
      <TouchableOpacity accessibilityLabel="Back" accessibilityRole="button" style={styles.backWrap} onPress={onBack}>
        <Image source={require('../images/icons/arrow-left.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Create Your{"\n"}Account</Text>

      <View style={styles.inputWrap}>
        <Image source={require('../images/icons/user-profile.png')} style={styles.inputIconImg} />
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Full name"
          placeholderTextColor="#97A3B6"
          style={styles.input}
        />
      </View>

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

      <View style={[styles.inputWrap, { marginTop: 14 }]}> 
        <Image source={require('../images/icons/lock-01.png')} style={styles.inputIconImg} />
        <TextInput
          value={confirm}
          onChangeText={setConfirm}
          placeholder="Confirm Password"
          placeholderTextColor="#97A3B6"
          style={styles.input}
          secureTextEntry={hideConfirm}
        />
        <TouchableOpacity onPress={() => setHideConfirm((v) => !v)} style={styles.eyeButton}>
          <Image source={require('../images/icons/eye-closed.png')} style={styles.eyeImg} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.createBtn} onPress={createAccount}>
        <Text style={styles.createText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.loginRow}>
        <Text style={styles.loginHint}>Already Have An Account? </Text>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.loginLink}>Login</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacer: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  inputIconImg: {
    width: 20,
    height: 20,
    marginRight: 20,
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
  createBtn: {
    marginTop: 18,
    backgroundColor: '#38D66B',
    borderRadius: 4,
    alignItems: 'center',
    paddingHorizontal: 80,
  },
  createText: {
    textAlign: 'center',
    width: '100%',
    color: '#0B1330',
    fontWeight: '700',
    fontSize: 16,
    paddingVertical: 12,
  },
  loginRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginHint: {
    color: '#1F2A37',
  },
  loginLink: {
    color: '#0B1330',
    fontWeight: '700',
  },
});
