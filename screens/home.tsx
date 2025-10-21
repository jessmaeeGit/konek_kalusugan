import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ANNOUNCEMENTS = [
  {
    title: '💊 Medicine Stock Update',
    body:
      'Paracetamol 500mg is now available again at your Barangay Health Station. Please request responsibly and avoid duplicate requests.',
  },
  {
    title: '🎗️ Health Program Reminder',
    body:
      'Join our Free Vaccination Drive this Saturday at the Barangay Hall, 8:00 AM – 4:00 PM. Bring your Barangay ID and vaccination card.',
  },
  {
    title: '❗ Important Notice',
    body:
      'Residents can only request medicines once every 7 days per prescription. This is to ensure fair distribution to all.',
  },
  {
    title: '⭐ New Program Launch',
    body:
      'The Healthy Heart Program is now open for registration! Check the Programs page for full details and requirements.',
  },
  {
    title: '⚠️ Emergency Alert',
    body:
      'Due to heavy rains and flooding, medicine distribution will be moved to the Barangay Gym. Stay safe and follow official advisories.',
  },
  {
    title: '💚 General Wellness Tip',
    body:
      'Drink 8–10 glasses of water daily and wash your hands regularly. Small habits keep you and your family healthy.',
  },
];

export default function Home({ onViewDetails, onGoPrograms, onGoRequests, onGoSettings, onGoNotificationCenter, profile, notificationCount }: { onViewDetails?: () => void; onGoPrograms?: () => void; onGoRequests?: () => void; onGoSettings?: () => void; onGoNotificationCenter?: () => void; profile?: { name: string; email: string; avatarUri?: string }; notificationCount?: number }) {
  const insets = useSafeAreaInsets();
  const [annIndex, setAnnIndex] = useState(0);
  const currentAnn = ANNOUNCEMENTS[annIndex];
  const prevAnnouncement = () => setAnnIndex((i) => (i - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  const nextAnnouncement = () => setAnnIndex((i) => (i + 1) % ANNOUNCEMENTS.length);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}> 
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={profile?.avatarUri ? { uri: profile.avatarUri } : require('../images/icons/user-profile.png')} style={styles.avatar} />
            <View>
              <Text style={styles.subtle}>Good Morning!</Text>
              <Text style={styles.title}>{profile?.name || ''}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onGoNotificationCenter} style={styles.bellWrap}>
            <Image source={require('../images/icons/bell.png')} style={styles.bellIcon} />
            {typeof notificationCount === 'number' && notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notificationCount > 99 ? '99+' : notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Quick Action</Text>
        <View style={styles.quickRow}>
          <TouchableOpacity style={[styles.pill, { backgroundColor: '#FFF3B0' }]}>
            <View style={styles.pillInner}>
              <Image source={require('../images/icons/plus-01.png')} style={styles.pillPlus} />
              <Text style={styles.pillText}>Announcements</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.pill, { backgroundColor: '#FFD1D1' }]} onPress={onGoPrograms}>
            <View style={styles.pillInner}>
              <Image source={require('../images/icons/plus-01.png')} style={styles.pillPlus} />
              <Text style={styles.pillText}>Programs</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.pill, { backgroundColor: '#C8DAFF', alignSelf: 'flex-start', marginTop: 10 }]} onPress={onGoRequests}>
          <View style={styles.pillInner}>
            <Image source={require('../images/icons/plus-01.png')} style={styles.pillPlus} />
            <Text style={styles.pillText}>Recent Programs</Text>
          </View>
        </TouchableOpacity>

        <View style={[styles.titleRow, { marginTop: 18 }]}>
          <Image source={require('../images/icons/announcement.png')} style={styles.titleIcon} />
          <Text style={styles.sectionTitle}>Announcement</Text>
        </View>
        <Text style={styles.sectionSub}>Official announcements from your Barangay and CHO are posted here for your guidance.</Text>

        <View style={styles.announcementCard}>
          <TouchableOpacity onPress={prevAnnouncement}>
            <Image source={require('../images/icons/chevron-left.png')} style={styles.chevSide} />
          </TouchableOpacity>
          <View style={styles.annContent}>
            <View style={styles.annHeader}>
              <Image source={require('../images/icons/meds.png')} style={styles.annIcon} />
              <Text style={styles.annTitle}>{currentAnn.title}</Text>
            </View>
            <Text style={styles.annBody}>{currentAnn.body}</Text>
          </View>
          <TouchableOpacity onPress={nextAnnouncement}>
            <Image source={require('../images/icons/chevron-right.png')} style={styles.chevSide} />
          </TouchableOpacity>
        </View>

        <View style={[styles.titleRow, { marginTop: 18 }]}>
          <Image source={require('../images/icons/heart hand.png')} style={styles.titleIcon} />
          <Text style={styles.sectionTitle}>Ongoing Programs</Text>
        </View>
        <Text style={styles.sectionSub}>Be part of the ongoing programs available in your community. Explore opportunities to stay healthy and informed.</Text>

        <View style={styles.programCard}>
          <View style={styles.programBadge}><Text style={styles.programBadgeText}>Ongoing</Text></View>
          <View style={styles.programRow}>
            <Image source={require('../images/icons/BWC.png')} style={styles.programThumb} />
            <Text style={styles.programTitle}>Barangay Wellness Check</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../images/icons/info.png')} style={styles.infoIcon} />
            <Text style={styles.infoText}>Free monthly check-ups for adults to prevent hypertension and diabetes.</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../images/icons/calendar.png')} style={styles.infoIcon} />
            <Text style={styles.infoLink}>October 23, 2025</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../images/icons/clock.png')} style={styles.infoIcon} />
            <Text style={styles.infoLink}>8:00 AM - 3:00 PM</Text>
          </View>
          <View style={styles.chip}><Text style={styles.chipText}>Preventive Care & Screening</Text></View>
          <View style={styles.programActions}>
            <TouchableOpacity style={styles.actionBtnGray}>
              <Image source={require('../images/icons/bell1.png')} style={styles.actionIcon} />
              <Text style={styles.actionGrayText}>Remind Me</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtnGreen} onPress={onViewDetails}>
              <Text style={styles.actionGreenText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.tabBar, { paddingBottom: insets.bottom || 12 }]}> 
        <TouchableOpacity style={[styles.tabItem, styles.tabActive]}> 
          <Image source={require('../images/icons/home-01.png')} style={styles.tabIconImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={onGoPrograms}><Image source={require('../images/icons/compass.png')} style={styles.tabIconImg} /></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={onGoRequests}><Image source={require('../images/icons/time.png')} style={styles.tabIconImg} /></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={onGoSettings}><Image source={require('../images/icons/settings.png')} style={styles.tabIconImg} /></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  subtle: { color: '#6B7280' },
  title: { color: '#0B1330', fontWeight: '800', fontSize: 18 },
  bellIcon: { width: 22, height: 22, resizeMode: 'contain' },
  bellWrap: { position: 'relative' },
  badge: { position: 'absolute', top: -6, right: -6, backgroundColor: '#EF4444', minWidth: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  badgeText: { color: '#FFFFFF', fontWeight: '800', fontSize: 10 },

  sectionTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '800',
    color: '#0B1330',
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  titleIcon: { width: 25, height: 25, resizeMode: 'contain' },
  sectionSub: {
    marginTop: 6,
    color: '#6B7280',
  },
  quickRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  pill: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  pillInner: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pillPlus: { width: 16, height: 16, resizeMode: 'contain' },
  pillText: {
    color: '#0B1330',
    fontWeight: '700',
  },
  announcementCard: {
    marginTop: 12,
    backgroundColor: '#BFEBD8',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  annHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  annContent: { flex: 1, marginHorizontal: 8 },
  annIcon: { width: 16, height: 16, marginLeft: 1, resizeMode: 'contain' },
  annTitle: { flex: 1, fontWeight: '800', color: '#0B1330' },
  chevIcon: { width: 18, height: 18, tintColor: '#1F2937', resizeMode: 'contain' },
  chevSide: { width: 20, height: 20, tintColor: '#1F2937', resizeMode: 'contain' },
  annBody: { marginTop: 8, color: '#0B1330' },

  programCard: {
    marginTop: 12,
    backgroundColor: '#F5F7FB',
    borderRadius: 12,
    padding: 12,
  },
  programBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#3CE281',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  programBadgeText: { color: '#0B1330', fontWeight: '700' },
  programRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  programThumb: { width: 48, height: 48, borderRadius: 8, resizeMode: 'contain' },
  programTitle: { fontWeight: '800', color: '#0B1330', fontSize: 16 },

  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  infoIcon: { width: 16, height: 16, resizeMode: 'contain' },
  infoText: { color: '#1F2937', flex: 1 },
  infoLink: { color: '#2563EB', fontWeight: '600' },
  chip: { alignSelf: 'flex-start', borderWidth: 2, borderColor: '#2ECC71', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12, marginTop: 10 },
  chipText: { color: '#0B1330', fontWeight: '700' },
  programActions: { flexDirection: 'row', gap: 10, marginTop: 10 },
  actionBtnGray: { flex: 1, backgroundColor: '#E5E7EB', borderRadius: 8, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  actionBtnGreen: { flex: 1, backgroundColor: '#38D66B', borderRadius: 8, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  actionIcon: { width: 16, height: 16, resizeMode: 'contain' },
  actionGrayText: { color: '#6B7280', fontWeight: '700' },
  actionGreenText: { color: '#0B1330', fontWeight: '700' },

  requestCard: { marginTop: 12, backgroundColor: '#F5F7FB', borderRadius: 12, padding: 12 },
  requestBadge: { alignSelf: 'flex-start', backgroundColor: '#3CE281', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, marginBottom: 8 },
  requestBadgeText: { color: '#0B1330', fontWeight: '700' },
  requestHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  requestIcon: { width: 20, height: 20, resizeMode: 'contain' },
  requestTitle: { fontWeight: '800', color: '#0B1330', fontSize: 18 },
  requestList: { marginTop: 8, gap: 4 },
  requestItem: { color: '#111827' },
  requestDate: { marginTop: 10, color: '#6B7280' },

  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  tabItem: {
    width: 56,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: { backgroundColor: '#D1FBE3' },
  tabIconImg: { width: 24, height: 24, resizeMode: 'contain' },
});
