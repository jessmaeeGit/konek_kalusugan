import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Programs({ onBack, onViewDetails, onViewOngoing, onViewUpcoming, onViewCompleted, onGoHome, onGoRequests, onGoSettings, onAddProgramReminder }: { onBack?: () => void; onViewDetails?: () => void; onViewOngoing?: () => void; onViewUpcoming?: () => void; onViewCompleted?: () => void; onGoHome?: () => void; onGoRequests?: () => void; onGoSettings?: () => void; onAddProgramReminder?: (programName: string, programDate: string) => void }) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const matches = (s: string) => s.toLowerCase().includes(q);
  const ongoingMatch = q === '' || [
    'barangay wellness check',
    'free monthly check-ups for adults to prevent hypertension and diabetes.',
    'preventive care & screening',
  ].some(matches);
  const upcomingMatch = q === '' || [
    'nutrilife feeding program',
    'the nutrilife feeding program is a...',
    'nutrition & feeding',
  ].some(matches);
  const completedMatch = q === '' || [
    'anti-smoking & substance abuse awareness',
    'raises awareness about the dangers of smoking, alcohol, and drugs. provides...',
    'seminar',
    'lifestyle & wellness',
  ].some(matches);

  const [remindOngoing, setRemindOngoing] = useState(false);
  const [remindUpcoming, setRemindUpcoming] = useState(false);
  const onRemindOngoing = () => {
    setRemindOngoing((prev) => {
      const next = !prev;
      if (next && onAddProgramReminder) {
        onAddProgramReminder('Barangay Wellness Check', 'October 22, 2025');
      }
      Alert.alert(next ? 'Reminder set' : 'Reminder canceled', 'Barangay Wellness Check');
      return next;
    });
  };
  const onRemindUpcoming = () => {
    setRemindUpcoming((prev) => {
      const next = !prev;
      if (next && onAddProgramReminder) {
        onAddProgramReminder('NutriLIFE Feeding Program', 'September 9, 2025');
      }
      Alert.alert(next ? 'Reminder set' : 'Reminder canceled', 'NutriLIFE Feeding Program');
      return next;
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}> 
        <TouchableOpacity style={styles.headerBtn} onPress={onBack ? onBack : onGoHome}>
          <Image source={require('../images/icons/chevron-left.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Programs</Text>
        {/* <TouchableOpacity style={styles.headerBtn}>
          <Image source={require('../images/icons/bell.png')} style={styles.headerIcon} />
        </TouchableOpacity> */}
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 140 }]}> 
        <View style={styles.searchWrap}>
          <Image source={require('../images/icons/search-02.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.searchPlaceholder}
            placeholder="Search"
            value={query}
            onChangeText={setQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity 
            style={[styles.filterChip, query === '' && styles.filterChipActive]} 
            onPress={() => setQuery('')}
          >
            <Text style={[styles.filterText, query === '' && styles.filterTextActive]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Image source={require('../images/icons/sort-vertical-02.png')} style={styles.filterIcon} />
            <Text style={styles.filterText}>Date</Text>
          </TouchableOpacity>
        </View>

        {q === '' && <View style={styles.sectionDivider} />}

        {ongoingMatch && (
        <TouchableOpacity activeOpacity={0.9} style={styles.programCard} onPress={onViewOngoing ?? onViewDetails}>
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
            <Text style={styles.infoLink}>October 22, 2025</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../images/icons/clock.png')} style={styles.infoIcon} />
            <Text style={styles.infoLink}>8:00 AM - 3:00 PM</Text>
          </View>
          <View style={styles.chip}><Text style={styles.chipText}>Preventive Care & Screening</Text></View>
          <View style={styles.programActions}>
            <TouchableOpacity style={styles.actionBtnGray} onPress={onRemindOngoing}>
              <Image source={require('../images/icons/bell1.png')} style={styles.actionIcon} />
              <Text style={styles.actionGrayText}>{remindOngoing ? 'Reminded' : 'Remind Me'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtnGreen} onPress={onViewOngoing ?? onViewDetails}>
              <Text style={styles.actionGreenText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        )}

        {q === '' && <View style={styles.sectionDivider} />}

        {upcomingMatch && (
        <TouchableOpacity activeOpacity={0.9} style={styles.programCardLight} onPress={onViewUpcoming ?? onViewDetails}>
          <View style={[styles.programBadge, { backgroundColor: '#FFE29B' }]}><Text style={styles.programBadgeText}>Upcoming</Text></View>
          <View style={styles.programRow}>
            <Image source={require('../images/icons/nutri.png')} style={styles.programThumb} />
            <Text style={styles.programTitle}>NutriLIFE Feeding Program</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../images/icons/info.png')} style={styles.infoIcon} />
            <Text style={styles.infoText}>The NutriLIFE Feeding Program is a...</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../images/icons/calendarb.png')} style={styles.infoIcon} />
            <Text style={styles.infoLink}>September 9, 2025</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../images/icons/clock.png')} style={styles.infoIcon} />
            <Text style={styles.infoLink}>10:00 AM - 12:00 NN</Text>
          </View>
          <View style={styles.chipRow}>
            <View style={styles.chip}><Text style={styles.chipText}>Nutrition & Feeding</Text></View>
          </View>
          <View style={styles.programActions}>
            <TouchableOpacity style={styles.actionBtnYellow} onPress={onRemindUpcoming}>
              <Image source={require('../images/icons/bell1.png')} style={styles.actionIcon} />
              <Text style={styles.actionYellowText}>{remindUpcoming ? 'Reminded' : 'Remind Me'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtnGreen} onPress={onViewUpcoming ?? onViewDetails}>
              <Text style={styles.actionGreenText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        )}

        {q === '' && <View style={styles.sectionDivider} />}

        {completedMatch && (
        <TouchableOpacity activeOpacity={0.9} style={styles.programCardLight} onPress={onViewCompleted ?? onViewDetails}>
          <View style={[styles.programBadge, { backgroundColor: '#D1D5DB' }]}><Text style={styles.programBadgeText}>Completed</Text></View>
          <View style={styles.programRow}>
            <Image source={require('../images/icons/anti-smoking.png')} style={styles.programThumb} />
            <Text style={styles.programTitle}>Anti-Smoking & Substance Abuse Awareness</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../images/icons/info.png')} style={styles.infoIcon} />
            <Text style={styles.infoText}>Raises awareness about the dangers of smoking, alcohol, and drugs. Provides...</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../images/icons/calendar.png')} style={styles.infoIcon} />
            <Text style={styles.infoLink}>March 2,2025</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../images/icons/clock.png')} style={styles.infoIcon} />
            <Text style={styles.infoLink}>8:00 AM - 3:00 PM</Text>
          </View>
          <View style={styles.chipRow}>
            <View style={styles.chip}><Text style={styles.chipText}>Seminar</Text></View>
            <View style={styles.chip}><Text style={styles.chipText}>Lifestyle & Wellness</Text></View>
          </View>
          <View style={styles.programActions}>
            <View style={styles.actionBtnDisabled}>
              <Image source={require('../images/icons/bell1.png')} style={styles.actionIcon} />
              <Text style={styles.actionDisabledText}>Remind Me</Text>
            </View>
            <TouchableOpacity style={styles.actionBtnGreen} onPress={onViewCompleted ?? onViewDetails}>
              <Text style={styles.actionGreenText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        )}
      </ScrollView>

      <View style={styles.tabBar}> 
        <TouchableOpacity style={styles.tabItem} onPress={onGoHome}> 
          <Image source={require('../images/icons/home-01.png')} style={styles.tabIconImg} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, styles.tabActive]}> 
          <Image source={require('../images/icons/compass.png')} style={styles.tabIconImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={onGoRequests}> 
          <Image source={require('../images/icons/time.png')} style={styles.tabIconImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={onGoSettings}> 
          <Image source={require('../images/icons/settings.png')} style={styles.tabIconImg} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  headerIcon: { width: 22, height: 22, resizeMode: 'contain' },
  headerTitle: { flex: 1, textAlign: 'center', color: '#0B1330', fontWeight: '800', fontSize: 20, marginTop: 16 },
  scroll: { paddingHorizontal: 16 },
  searchWrap: { 
    marginTop: 10, 
    borderWidth: 2, 
    borderColor: '#2ECC71', 
    borderRadius: 7, 
    paddingVertical: 1, 
    paddingHorizontal: 16, 
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  searchIcon: { 
    width: 18, 
    height: 18, 
    resizeMode: 'contain', 
    tintColor: '#000000',
    marginRight: 12,
  },
  searchPlaceholder: { 
    flex: 1, 
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '400',
  },
  filterRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  filterChip: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 2, borderColor: '#2ECC71', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12 },
  filterChipActive: { backgroundColor: '#2ECC71' },
  filterIcon: { width: 16, height: 16, resizeMode: 'contain' },
  filterText: { color: '#0B1330', fontWeight: '700' },
  filterTextActive: { color: '#FFFFFF' },
  sectionDivider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 12 },

  programCard: { marginTop: 4, backgroundColor: '#F5F7FB', borderRadius: 12, padding: 12 },
  programCardLight: { marginTop: 4, backgroundColor: '#FAFAFA', borderRadius: 12, padding: 12 },
  programBadge: { alignSelf: 'flex-start', backgroundColor: '#D1FBE3', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, marginBottom: 8 },
  programBadgeText: { color: '#0B1330', fontWeight: '700' },
  programRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  programThumb: { width: 48, height: 48, borderRadius: 8, resizeMode: 'contain' },
  programTitle: { fontWeight: '800', color: '#0B1330', fontSize: 18 },

  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  infoIcon: { width: 16, height: 16, resizeMode: 'contain' },
  infoText: { color: '#1F2937', flex: 1 },
  infoLink: { color: '#2563EB', fontWeight: '600' },
  chip: { alignSelf: 'flex-start', borderWidth: 2, borderColor: '#2ECC71', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12, marginTop: 10 },
  chipText: { color: '#0B1330', fontWeight: '700' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  programActions: { flexDirection: 'row', gap: 10, marginTop: 10 },
  actionBtnGray: { flex: 1, backgroundColor: '#E5E7EB', borderRadius: 8, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  actionBtnYellow: { flex: 1, backgroundColor: '#FDE68A', borderRadius: 8, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  actionBtnGreen: { flex: 1, backgroundColor: '#38D66B', borderRadius: 8, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  actionIcon: { width: 16, height: 16, resizeMode: 'contain' },
  actionGrayText: { color: '#6B7280', fontWeight: '700' },
  actionYellowText: { color: '#0B1330', fontWeight: '700' },
  actionGreenText: { color: '#0B1330', fontWeight: '700' },
  actionBtnDisabled: { flex: 1, backgroundColor: '#E5E7EB', borderRadius: 8, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  actionDisabledText: { color: '#9CA3AF', fontWeight: '700' },

  tabBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 12 },
  tabItem: { width: 56, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tabActive: { backgroundColor: '#D1FBE3' },
  tabIconImg: { width: 24, height: 24, resizeMode: 'contain' },
});
