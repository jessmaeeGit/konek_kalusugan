import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ForgotPassword({ onBack, onContinue }: { onBack?: () => void; onContinue?: (email?: string) => void }) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16, paddingBottom: insets.bottom }]}> 
      <TouchableOpacity accessibilityLabel="Back" accessibilityRole="button" style={styles.backWrap} onPress={onBack}>
        <Image source={require('../images/icons/arrow-left.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Forget Password</Text>
      <Text style={styles.subtitle}>Enter the email address with your account{`\n`}and we'll send an email with confirmation toreset your  password</Text>

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

      <TouchableOpacity style={styles.continueBtn} onPress={() => onContinue?.(email)}>
        <Text style={styles.continueText}>Continue</Text>
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
    marginTop: 8,
    color: '#97A3B6',
    lineHeight: 20,
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
  continueBtn: {
    marginTop: 24,
    backgroundColor: '#38D66B',
    borderRadius: 4,
    alignItems: 'center',
    paddingVertical: 12,
  },
  continueText: {
    color: '#0B1330',
    fontWeight: '700',
    fontSize: 18,
  },
});
