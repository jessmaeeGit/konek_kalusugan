import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Linking, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ContactSupport({ onBack }: { onBack?: () => void }) {
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const openMail = () => {
    const to = 'cho@iligan.gov.ph';
    const url = `mailto:${to}?subject=${encodeURIComponent(subject || 'Support Request')}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
    Linking.openURL(url).catch(() => Alert.alert('Unable to open email app'));
  };

  const openPhone = () => {
    const phone = '+63  221-7646 ';
    Linking.openURL(`tel:${phone}`).catch(() => Alert.alert('Unable to start phone call'));
  };

  const submit = () => {
    // Placeholder submit: prefer using email for now
    openMail();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}> 
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Image source={require('../images/icons/chevron-left.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Support</Text>
        <View style={styles.headerBtn} />
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 140 }]}> 
        <Text style={styles.hint}>Get help from your Barangay Health Station or City Health Office.</Text>

        <View style={styles.quickRow}>
          <TouchableOpacity style={[styles.quickBtn, { backgroundColor: '#E6F6FF' }]} onPress={openMail}>
            <Image source={require('../images/icons/email.png')} style={styles.quickIcon} />
            <Text style={styles.quickText}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickBtn, { backgroundColor: '#FFEDEB' }]} onPress={openPhone}>
            <Image source={require('../images/icons/help.png')} style={styles.quickIcon} />
            <Text style={styles.quickText}>Call</Text>
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
  headerTitle: { flex: 1, textAlign: 'center', color: '#0B1330', fontWeight: '800', fontSize: 20 },

  scroll: { paddingHorizontal: 16 },
  hint: { color: '#6B7280', marginTop: 14 },
  quickRow: { marginTop: 14, flexDirection: 'row', gap: 12 },
  quickBtn: { flex: 1, borderRadius: 12, paddingVertical: 16, alignItems: 'center', gap: 6 },
  quickIcon: { width: 22, height: 22, resizeMode: 'contain' },
  quickText: { color: '#0B1330', fontWeight: '800' },

  form: { marginTop: 18, backgroundColor: '#FAFAFA', borderRadius: 12, padding: 12 },
  formTitle: { color: '#0B1330', fontWeight: '800', marginBottom: 8 },
  inputWrap: { marginTop: 10, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, backgroundColor: '#FFFFFF', paddingHorizontal: 10, paddingVertical: 8 },
  input: { color: '#0B1330' },
  sendBtn: { marginTop: 14, backgroundColor: '#38D66B', borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
  sendText: { color: '#0B1330', fontWeight: '800' },
});
