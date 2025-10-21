import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ResetPassword({ onBack, onSubmit }: { onBack?: () => void; onSubmit?: (password: string) => void }) {
  const insets = useSafeAreaInsets();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);

  const submit = () => {
    // Validation with simple alerts
    if (!password || !confirm) {
      Alert.alert('Missing fields', 'Please enter and confirm your new password.');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Password too short', 'Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Passwords do not match', 'Please make sure both passwords are identical.');
      return;
    }
    Keyboard.dismiss();
    onSubmit?.(password);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16, paddingBottom: insets.bottom }]}> 
      <TouchableOpacity accessibilityLabel="Back" accessibilityRole="button" style={styles.backWrap} onPress={onBack}>
        <Image source={require('../images/icons/arrow-left.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Reset Your Password</Text>
      <Text style={styles.subtitle}>Must be at least 8 characters</Text>

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputWrap}>
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

      <Text style={[styles.label, { marginTop: 14 }]}>Confirm Password</Text>
      <View style={styles.inputWrap}>
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

      <TouchableOpacity style={styles.submitBtn} onPress={submit}>
        <Text style={styles.submitText}>Reset Password</Text>
      </TouchableOpacity>
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
    fontSize: 32,
    fontWeight: '800',
    color: '#0B1330',
  },
  subtitle: {
    marginTop: 6,
    color: '#97A3B6',
  },
  label: {
    marginTop: 18,
    color: '#0B1330',
    fontWeight: '600',
  },
  inputWrap: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#2ECC71',
    backgroundColor: '#EFFFF4',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
  submitBtn: {
    marginTop: 24,
    backgroundColor: '#38D66B',
    borderRadius: 4,
    alignItems: 'center',
    paddingVertical: 12,
  },
  submitText: {
    color: '#0B1330',
    fontWeight: '700',
    fontSize: 18,
  },
});
