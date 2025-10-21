import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HelpFaq({ onBack, onGoContact }: { onBack?: () => void; onGoContact?: () => void }) {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((s) => ({ ...s, [i]: !s[i] }));
  };

  const items = [
    {
      q: 'How do I view barangay health programs?',
      a: 'Open Programs from the bottom tab or Home. Tap any card to view full details, schedule, and venue.',
    },
    {
      q: 'How do reminders and notifications work?',
      a: 'The app sends in-app reminders near the program date and a completion notice after the program ends. You can view all notifications in the Notification Center from the bell icon.',
    },
    {
      q: 'How do I change my profile photo and info?',
      a: 'Open Settings → Edit Profile to update your name, email, and profile photo. Changes reflect across the app.',
    },
    {
      q: 'I forgot my password. What should I do?',
      a: 'From the Login page, choose Forgot Password and follow the steps to reset it.',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}> 
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Image source={require('../images/icons/chevron-left.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help / FAQ</Text>
        <View style={styles.headerBtn} />
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 120 }]}> 
        {items.map((it, i) => (
          <View key={i} style={styles.card}>
            <TouchableOpacity style={styles.row} onPress={() => toggle(i)}>
              <Image source={require('../images/icons/help.png')} style={styles.rowIcon} />
              <Text style={styles.q}>{it.q}</Text>
              <Image source={require('../images/icons/chevron-left.png')} style={[styles.chev, open[i] && styles.chevOpen]} />
            </TouchableOpacity>
            {open[i] && (
              <Text style={styles.a}>{it.a}</Text>
            )}
          </View>
        ))}

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Need more help?</Text>
          <Text style={styles.contactSub}>Contact your Barangay Health Station or City Health Office for assistance.</Text>
          <TouchableOpacity style={styles.contactBtn} onPress={onGoContact}>
            <Text style={styles.contactBtnText}>Contact Support</Text>
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
  card: { marginTop: 12, backgroundColor: '#FAFAFA', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rowIcon: { width: 18, height: 18, resizeMode: 'contain' },
  q: { flex: 1, color: '#0B1330', fontWeight: '800' },
  chev: { width: 18, height: 18, tintColor: '#6B7280', transform: [{ rotate: '180deg' }] },
  chevOpen: { transform: [{ rotate: '90deg' }] },
  a: { marginTop: 8, color: '#374151' },

  contactCard: { marginTop: 18, backgroundColor: '#F5F7FB', borderRadius: 12, padding: 12 },
  contactTitle: { color: '#0B1330', fontWeight: '800' },
  contactSub: { marginTop: 6, color: '#6B7280' },
  contactBtn: { marginTop: 12, backgroundColor: '#38D66B', borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  contactBtnText: { color: '#0B1330', fontWeight: '800' },
});
