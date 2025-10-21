import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Share, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleReminder, cancelReminder, isReminderScheduled } from '../lib/notificationsStore';

export default function ProgramDetails({ onBack, program }: { onBack?: () => void; program?: 'wellness' | 'nutri' | 'anti' }) {
  const insets = useSafeAreaInsets();

  const onShare = async () => {
    try {
      await Share.share({ message: 'Barangay Wellness Check Program — Preventive Care & Screening. Schedule: September 6, 2025, 8:00 AM – 12:00 NN. Venue: Barangay Health Station, Mahayahay, Iligan City.' });
    } catch (e) {}
  };

  const eventDate: Date = useMemo(() => {
    if (program === 'anti') return new Date(2025, 2, 2, 8, 0, 0);
    if (program === 'nutri') return new Date(2025, 8, 9, 10, 0, 0);
    return new Date(2025, 9, 22, 8, 0, 0);
  }, [program]);

  const remindKey = useMemo(() => {
    const p = program ?? 'wellness';
    return `program-${p}-${eventDate.toISOString().slice(0, 10)}`;
  }, [program, eventDate]);

  const isScheduledInitial = isReminderScheduled(remindKey);
  const [reminderSet, setReminderSet] = useState<boolean>(isScheduledInitial);

  const onRemind = () => {
    if (reminderSet) {
      cancelReminder(remindKey);
      setReminderSet(false);
      Alert.alert('Reminder removed', 'You will no longer receive a reminder for this program.');
    } else {
      const titleForBody = isAnti
        ? 'Anti-Smoking & Substance Abuse Seminar'
        : isWellness
        ? 'Barangay Wellness Check Program'
        : 'NutriLIFE Feeding Program';
      scheduleReminder(remindKey, eventDate, titleForBody);
      setReminderSet(true);
      Alert.alert('Reminder set', 'We will remind you one day before the event.');
    }
  };

  const isAnti = program === 'anti';
  const isWellness = program === 'wellness' || program === undefined;
  const isNutri = program === 'nutri';

  const statusText = isAnti ? 'Completed' : isWellness ? 'Ongoing' : 'Upcoming';
  const statusBg = isAnti ? '#D1D5DB' : isWellness ? '#3CE281' : '#FFE29B';
  const bannerSrc = isAnti
    ? require('../images/icons/logo+name 1 (1).png')
    : require('../images/icons/BWC.png');
  const titleText = isAnti
    ? 'Seminar: Anti-Smoking & Substance Abuse Awareness Program'
    : isWellness
    ? 'Barangay Wellness\nCheck Program'
    : 'NutriLIFE Feeding Program';
  const subtitleText = isAnti
    ? '"Breathe clean, live clean."'
    : isWellness
    ? '"Early check, healthy life."'
    : '"Healthy meals for healthy kids."';
  const chips: string[] = isAnti
    ? ['Seminar', 'Lifestyle & Wellness']
    : isWellness
    ? ['Preventive Care & Screening']
    : ['Nutrition & Feeding'];
  const descriptionText = isAnti
    ? 'Raises awareness about the dangers of smoking, alcohol, and drugs. Provides counseling, peer support, and referrals for rehabilitation.'
    : isWellness
    ? 'A free community-based service where residents can have their blood pressure, blood sugar, weight, and BMI monitored regularly to prevent lifestyle diseases like diabetes and hypertension.'
    : 'The NutriLIFE Feeding Program provides nutritious meals and education to improve child health and development.';

  return (
    <View style={styles.container}> 
      <View style={[styles.header, { paddingTop: insets.top }]}> 
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Image source={require('../images/icons/chevron-left.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Programs</Text>
        {/* <TouchableOpacity style={styles.headerBtn}>
          <Image source={require('../images/icons/bell.png')} style={styles.headerIcon} />
        </TouchableOpacity> */}
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 120 }]}>
        <View style={[styles.badge, { backgroundColor: statusBg }]}><Text style={styles.badgeText}>{statusText}</Text></View>

        <Image source={bannerSrc} style={styles.banner} />

        <Text style={styles.title}>{titleText}</Text>
        <Text style={styles.subtitle}>{subtitleText}</Text>

        {chips.length === 1 ? (
          <View style={styles.chip}><Text style={styles.chipText}>{chips[0]}</Text></View>
        ) : (
          <View style={styles.chipRow}>
            {chips.map((c, i) => (
              <View key={i} style={styles.chip}><Text style={styles.chipText}>{c}</Text></View>
            ))}
          </View>
        )}

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.paragraph}>{descriptionText}</Text>

        <Text style={styles.sectionTitle}>Requirements</Text>
        <Text style={styles.bullet}>✔ Barangay Health ID</Text>
        <Text style={styles.bullet}>✔ Must be 18 years old and above</Text>

        <Text style={styles.sectionTitle}>Schedule & Venue</Text>
        <View style={styles.row}> 
          <Image source={require('../images/icons/calendarb.png')} style={styles.rowIcon} />
          <Text style={styles.rowText}>{isAnti ? 'March 2, 2025' : isWellness ? 'October 22, 2025' : 'September 9, 2025'}</Text>
        </View>
        <View style={styles.row}> 
          <Image source={require('../images/icons/calendar-03.png')} style={styles.rowIcon} />
          <Text style={styles.rowText}>{isAnti ? 'One-time seminar' : isWellness ? 'Every Saturday' : 'One-time event'}</Text>
        </View>
        <View style={styles.row}> 
          <Image source={require('../images/icons/clock-01.png')} style={styles.rowIcon} />
          <Text style={styles.rowText}>{isAnti ? '8:00 AM – 3:00 PM' : isWellness ? '8:00 AM – 12:00 NN' : '10:00 AM – 12:00 NN'}</Text>
        </View>
        <View style={styles.row}> 
          <Image source={require('../images/icons/location.png')} style={styles.rowIcon} />
          <Text style={styles.rowText}>Barangay Health Station, Mahayahay, Iligan City</Text>
        </View>

        <Text style={styles.sectionTitle}>Goals / Benefits</Text>
        <Text style={styles.bullet}>✔ Prevent lifestyle diseases</Text>
        <Text style={styles.bullet}>✔ Raise health awareness</Text>
        <Text style={styles.bullet}>✔ Provide early detection and intervention</Text>

        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.row}> 
          <Image source={require('../images/icons/user-profile.png')} style={styles.rowIcon} />
          <Text style={styles.rowText}>Juan Santos (Barangay Health Worker in Charge)</Text>
        </View>
        <View style={styles.row}> 
          <Image source={require('../images/icons/phone.png')} style={styles.rowIcon} />
          <Text style={styles.rowText}>0912 123 4567</Text>
        </View>
        <View style={styles.row}> 
          <Image source={require('../images/icons/email.png')} style={styles.rowIcon} />
          <Text style={styles.rowText}>wellnesscheck@choiligan.org</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={[reminderSet ? styles.actionBtnGreen : styles.actionBtnGray]} onPress={onRemind}>
            <Image source={require('../images/icons/bell1.png')} style={styles.actionIcon} />
            {reminderSet ? (
              <Text style={styles.actionGreenText}>Reminder Set</Text>
            ) : (
              <Text style={styles.actionGrayText}>Remind Me</Text>
            )}
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
  headerTitle: { flex: 1, textAlign: 'center', color: '#0B1330', fontWeight: '800', fontSize: 18 },
  scroll: { paddingHorizontal: 16, paddingBottom: 24 },
  badge: { alignSelf: 'flex-start', backgroundColor: '#3CE281', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, marginBottom: 8, marginTop: 8 },
  badgeText: { color: '#0B1330', fontWeight: '700' },
  banner: { width: '100%', height: 140, borderRadius: 12, resizeMode: 'cover', marginBottom: 10 },
  title: { fontWeight: '800', color: '#0B1330', fontSize: 26 },
  subtitle: { marginTop: 4, color: '#6B7280', fontStyle: 'italic' },
  chip: { alignSelf: 'flex-start', borderWidth: 2, borderColor: '#2ECC71', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12, marginTop: 10, marginBottom: 6 },
  chipText: { color: '#0B1330', fontWeight: '700' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10, marginBottom: 6 },
  sectionTitle: { marginTop: 14, color: '#0B1330', fontWeight: '800', fontSize: 16 },
  paragraph: { marginTop: 6, color: '#1F2937' },
  bullet: { marginTop: 6, color: '#1F2937' },
  row: { marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 10 },
  rowIcon: { width: 18, height: 18, resizeMode: 'contain' },
  rowText: { color: '#1F2937', flex: 1 },
  map: { width: '100%', height: 140, borderRadius: 8, marginTop: 10, backgroundColor: '#E5E7EB', resizeMode: 'cover' },
  actions: { flexDirection: 'row', gap: 10, marginTop: 16, marginBottom: 20 },
  actionBtnGray: { flex: 1, backgroundColor: '#E5E7EB', borderRadius: 8, paddingVertical: 12, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  actionBtnGreen: { flex: 1, backgroundColor: '#38D66B', borderRadius: 8, paddingVertical: 12, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  actionIcon: { width: 16, height: 16, resizeMode: 'contain' },
  actionGrayText: { color: '#6B7280', fontWeight: '700' },
  actionGreenText: { color: '#0B1330', fontWeight: '700' },
});
