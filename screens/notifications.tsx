import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Notifications({ onBack }: { onBack?: () => void }) {
  const insets = useSafeAreaInsets();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [annEnabled, setAnnEnabled] = useState(true);
  const [programEnabled, setProgramEnabled] = useState(true);
  const [requestEnabled, setRequestEnabled] = useState(true);
  const [reminderEnabled, setReminderEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}> 
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Image source={require('../images/icons/chevron-left.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerBtn} />
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 60 }]}> 
        <Text style={styles.sectionTitle}>App Preferences</Text>

        <View style={styles.row}> 
          <View style={styles.rowLeft}>
            <Image source={require('../images/icons/bell1.png')} style={styles.rowIcon} />
            <Text style={styles.rowText}>Push Notifications</Text>
          </View>
          <Switch value={pushEnabled} onValueChange={setPushEnabled} />
        </View>

        <View style={styles.row}> 
          <View style={styles.rowLeft}>
            <Image source={require('../images/icons/announcement.png')} style={styles.rowIcon} />
            <Text style={styles.rowText}>Announcements</Text>
          </View>
          <Switch value={annEnabled} onValueChange={setAnnEnabled} />
        </View>

        <View style={styles.row}> 
          <View style={styles.rowLeft}>
            <Image source={require('../images/icons/heart hand.png')} style={styles.rowIcon} />
            <Text style={styles.rowText}>Program Updates</Text>
          </View>
          <Switch value={programEnabled} onValueChange={setProgramEnabled} />
        </View>

        <View style={styles.row}> 
          <View style={styles.rowLeft}>
            <Image source={require('../images/icons/time.png')} style={styles.rowIcon} />
            <Text style={styles.rowText}>Reminders</Text>
          </View>
          <Switch value={reminderEnabled} onValueChange={setReminderEnabled} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 4,  borderBottomColor: '#E5E7EB' },
  headerBtn: { width: 0, height: 44, alignItems: 'center', justifyContent: 'center' },
  headerIcon: { width: 22, height: 22, resizeMode: 'contain' },
  headerTitle: { flex: 1, paddingHorizontal: 20, color: '#0B1330', fontWeight: '800', fontSize: 20, width: 50},

  scroll: { paddingHorizontal: 10 },
  sectionTitle: { marginTop: 20, color: '#6B7280', marginBottom: 8,width:150 },

  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#E5E7EB',width: 250 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rowIcon: { width: 22, height: 22, resizeMode: 'contain' },
  rowText: { color: '#0B1330', fontWeight: '700', fontSize: 16 },
});
