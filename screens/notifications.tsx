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

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 60 }]} showsVerticalScrollIndicator={false}> 
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.sectionTitle}>Notification Preferences</Text>
          <Text style={styles.sectionSubtitle}>Customize how you receive updates and alerts</Text>
        </View>

        {/* Notification Settings Card */}
        <View style={styles.settingsCard}>
          {/* Push Notifications */}
          <View style={styles.settingRow}> 
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#EEF2FF' }]}>
                <Image source={require('../images/icons/bell1.png')} style={[styles.settingIcon, { tintColor: '#6366F1' }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Push Notifications</Text>
                <Text style={styles.settingDescription}>Receive instant alerts on your device</Text>
              </View>
            </View>
            <Switch 
              value={pushEnabled} 
              onValueChange={setPushEnabled}
              trackColor={{ false: '#E5E7EB', true: '#86EFAC' }}
              thumbColor={pushEnabled ? '#22C55E' : '#F3F4F6'}
            />
          </View>

          <View style={styles.divider} />

          {/* Announcements */}
          <View style={styles.settingRow}> 
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#FEF3C7' }]}>
                <Image source={require('../images/icons/announcement.png')} style={[styles.settingIcon, { tintColor: '#F59E0B' }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Announcements</Text>
                <Text style={styles.settingDescription}>Official updates from CHO and Barangay</Text>
              </View>
            </View>
            <Switch 
              value={annEnabled} 
              onValueChange={setAnnEnabled}
              trackColor={{ false: '#E5E7EB', true: '#86EFAC' }}
              thumbColor={annEnabled ? '#22C55E' : '#F3F4F6'}
            />
          </View>

          <View style={styles.divider} />

          {/* Program Updates */}
          <View style={styles.settingRow}> 
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#FECACA' }]}>
                <Image source={require('../images/icons/heart hand.png')} style={[styles.settingIcon, { tintColor: '#EF4444' }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Program Updates</Text>
                <Text style={styles.settingDescription}>Health programs and events notifications</Text>
              </View>
            </View>
            <Switch 
              value={programEnabled} 
              onValueChange={setProgramEnabled}
              trackColor={{ false: '#E5E7EB', true: '#86EFAC' }}
              thumbColor={programEnabled ? '#22C55E' : '#F3F4F6'}
            />
          </View>

          <View style={styles.divider} />

          {/* Reminders */}
          <View style={styles.settingRow}> 
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#DBEAFE' }]}>
                <Image source={require('../images/icons/time.png')} style={[styles.settingIcon, { tintColor: '#3B82F6' }]} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Reminders</Text>
                <Text style={styles.settingDescription}>Medicine requests and program reminders</Text>
              </View>
            </View>
            <Switch 
              value={reminderEnabled} 
              onValueChange={setReminderEnabled}
              trackColor={{ false: '#E5E7EB', true: '#86EFAC' }}
              thumbColor={reminderEnabled ? '#22C55E' : '#F3F4F6'}
            />
          </View>
        </View>

        {/* Additional Settings Card */}
        <View style={styles.additionalCard}>
          <Text style={styles.cardTitle}>Additional Settings</Text>
          <Text style={styles.cardDescription}>
            You can also manage notification settings from your device's system settings. 
            Changes made here will apply to this app only.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8FAFC' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerBtn: { 
    width: 44, 
    height: 44, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 12,
  },
  headerIcon: { 
    width: 24, 
    height: 24, 
    resizeMode: 'contain' 
  },
  headerTitle: { 
    flex: 1, 
    textAlign: 'center',
    color: '#1F2937', 
    fontWeight: '700', 
    fontSize: 18,
    marginHorizontal: 16,
  },

  scroll: { 
    paddingHorizontal: 16,
    paddingTop: 24,
  },

  // Header Section
  headerSection: {
    marginBottom: 24,
  },
  sectionTitle: { 
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },

  // Settings Card
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  // Setting Row
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 20,
  },

  // Additional Card
  additionalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
});
