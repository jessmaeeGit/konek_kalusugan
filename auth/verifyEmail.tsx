import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function VerifyEmail({ email, onBack, onVerify, onResend }: { email?: string; onBack?: () => void; onVerify?: (code: string) => void; onResend?: () => void }) {
  const insets = useSafeAreaInsets();
  const [d1, setD1] = useState('');
  const [d2, setD2] = useState('');
  const [d3, setD3] = useState('');
  const [d4, setD4] = useState('');

  const r2 = useRef<TextInput>(null);
  const r3 = useRef<TextInput>(null);
  const r4 = useRef<TextInput>(null);

  const submit = () => onVerify?.(`${d1}${d2}${d3}${d4}`);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16, paddingBottom: insets.bottom }]}> 
      <TouchableOpacity accessibilityLabel="Back" accessibilityRole="button" style={styles.backWrap} onPress={onBack}>
        <Image source={require('../images/icons/arrow-left.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Verify Email</Text>
      {!!email && (
        <Text style={styles.subtitle}>We have sent the code to{"\n"}<Text style={styles.email}>{email}</Text></Text>
      )}

      <View style={styles.codeRow}>
        <TextInput value={d1} onChangeText={(t) => { setD1(t.replace(/\D/g, '').slice(0,1)); if (t.length) r2.current?.focus(); }} style={[styles.codeBox, d1 ? styles.codeActive : null]} keyboardType="number-pad" maxLength={1} placeholder="#"placeholderTextColor="#ccc"/>
        <TextInput ref={r2} value={d2} onChangeText={(t) => { setD2(t.replace(/\D/g, '').slice(0,1)); if (t.length) r3.current?.focus(); }} style={[styles.codeBox, d2 ? styles.codeActive : null]} keyboardType="number-pad" maxLength={1} placeholder="#"placeholderTextColor="#ccc"/>
        <TextInput ref={r3} value={d3} onChangeText={(t) => { setD3(t.replace(/\D/g, '').slice(0,1)); if (t.length) r4.current?.focus(); }} style={[styles.codeBox, d3 ? styles.codeActive : null]} keyboardType="number-pad" maxLength={1} placeholder="#"placeholderTextColor="#ccc" />
        <TextInput ref={r4} value={d4} onChangeText={(t) => setD4(t.replace(/\D/g, '').slice(0,1))} style={[styles.codeBox, d4 ? styles.codeActive : null]} keyboardType="number-pad" maxLength={1} placeholder="#"placeholderTextColor="#ccc"/>
      </View>

      <TouchableOpacity style={styles.verifyBtn} onPress={submit}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resendBtn} onPress={onResend}>
        <Text style={styles.resendText}>Send Again</Text>
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
    color: '#1F2A37',
    lineHeight: 20,
  },
  email: {
    color: '#0B1330',
    fontWeight: '700',
  },
  codeRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
  },
  codeBox: {
    width: 58,
    height: 58,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    backgroundColor: '#F9FAFB',
    textAlign: 'center',
    fontSize: 20,
    color: '#0B1330',
  },
  codeActive: {
    borderColor: '#2ECC71',
    backgroundColor: '#EFFFF4',
  },
  verifyBtn: {
    marginTop: 24,
    backgroundColor: '#38D66B',
    borderRadius: 4,
    alignItems: 'center',
    paddingVertical: 12,
  },
  verifyText: {
    color: '#0B1330',
    fontWeight: '700',
    fontSize: 18,
  },
  resendBtn: {
    marginTop: 16,
    backgroundColor: '#0B1330',
    borderRadius: 4,
    alignItems: 'center',
    paddingVertical: 12,
  },
  resendText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },
});
