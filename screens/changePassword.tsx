import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChangePassword({ onBack, onSaved }: { onBack?: () => void; onSaved?: () => void }) {
  const insets = useSafeAreaInsets();

  const [current, setCurrent] = useState('');
  const [nextPwd, setNextPwd] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSave = () => {
    if (!current || !nextPwd || !confirm) {
      Alert.alert('Missing fields', 'Please fill in all password fields.');
      return;
    }
    if (nextPwd !== confirm) {
      Alert.alert('Password mismatch', 'New password and confirmation do not match.');
      return;
    }
    if (onSaved) onSaved();
    else if (onBack) onBack();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}> 
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Image source={require('../images/icons/chevron-left.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={styles.headerBtn} />
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 60 }]}> 
        <View style={styles.formGroup}>
          <Text style={styles.label}>Current Password</Text>
          <TextInput value={current} onChangeText={setCurrent} placeholder="Enter current password" secureTextEntry style={styles.input} />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>New Password</Text>
          <TextInput value={nextPwd} onChangeText={setNextPwd} placeholder="Enter new password" secureTextEntry style={styles.input} />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput value={confirm} onChangeText={setConfirm} placeholder="Confirm new password" secureTextEntry style={styles.input} />
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onBack}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  headerIcon: { width: 22, height: 22, resizeMode: 'contain' },
  headerTitle: {textAlign: 'center', color: '#0B1330', fontWeight: '800', fontSize: 20, marginTop: 12, width: 200, height: 44, paddingHorizontal: 5 },

  scroll: { paddingHorizontal: 16 },

  formGroup: { marginTop: 14 },
  label: { color: '#6B7280', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#2ECC71', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, color: '#0B1330' },

  actionRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  cancelBtn: { flex: 1, backgroundColor: '#E5E7EB', borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  cancelText: { color: '#0B1330', fontWeight: '700' },
  saveBtn: { flex: 1, backgroundColor: '#38D66B', borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  saveText: { color: '#0B1330', fontWeight: '700' },
});
