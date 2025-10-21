import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RecentPrograms({ onBack, onGoHome, onGoPrograms, onGoSettings }: { onBack?: () => void; onGoHome?: () => void; onGoPrograms?: () => void; onGoSettings?: () => void }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}> 
        <TouchableOpacity style={styles.headerBtn} onPress={onBack || onGoPrograms}>
          <Image source={require('../images/icons/chevron-left.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recent Programs</Text>
        <TouchableOpacity style={styles.headerBtn}>
          {/* <Image source={require('../images/icons/bell.png')} style={styles.headerIcon} /> */}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 140 }]}> 
        <Text style={styles.sectionHint}>Recently viewed programs appear here.</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Image source={require('../images/icons/BWC.png')} style={styles.thumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Barangay Wellness Check</Text>
              <Text style={styles.meta}>Viewed today, 9:12 AM</Text>
            </View>
          </View>
          <View style={styles.tags}><Text style={styles.tag}>Preventive Care & Screening</Text></View>
        </View>

        <View style={styles.divider} />

        <View style={[styles.card, styles.lightCard]}>
          <View style={styles.row}>
            <Image source={require('../images/icons/nutri.png')} style={styles.thumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>NutriLIFE Feeding Program</Text>
              <Text style={styles.meta}>Viewed yesterday, 5:42 PM</Text>
            </View>
          </View>
          <View style={styles.tags}><Text style={styles.tag}>Nutrition & Feeding</Text></View>
        </View>

        <View style={styles.divider} />

        <View style={[styles.card, styles.lightCard]}>
          <View style={styles.row}>
            <Image source={require('../images/icons/anti-smoking.png')} style={styles.thumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Anti-Smoking & Substance Abuse Awareness</Text>
              <Text style={styles.meta}>Viewed Sep 1, 2025, 3:20 PM</Text>
            </View>
          </View>
          <View style={styles.tagsRow}>
            <View style={styles.tags}><Text style={styles.tag}>Seminar</Text></View>
            <View style={styles.tags}><Text style={styles.tag}>Lifestyle & Wellness</Text></View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.tabBar}> 
        <TouchableOpacity style={styles.tabItem} onPress={onGoHome}> 
          <Image source={require('../images/icons/home-01.png')} style={styles.tabIconImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={onGoPrograms}> 
          <Image source={require('../images/icons/compass.png')} style={styles.tabIconImg} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, styles.tabActive]}> 
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
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 0, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#E5E7EB', marginTop: 16 },
  headerBtn: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
  headerIcon: { width: 22, height: 22, resizeMode: 'contain' },
  headerTitle: { flex: 1, textAlign: 'center', color: '#0B1330', fontWeight: '800', fontSize: 20,paddingHorizontal: 16 },

  scroll: { paddingHorizontal: 16 },
  sectionHint: { color: '#6B7280', marginTop: 16 },

  card: { backgroundColor: '#F5F7FB', borderRadius: 12, padding: 12, marginTop: 14 },
  lightCard: { backgroundColor: '#FAFAFA' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  thumb: { width: 48, height: 48, borderRadius: 8, resizeMode: 'contain' },
  title: { fontWeight: '800', color: '#0B1330', fontSize: 16 },
  meta: { color: '#6B7280', marginTop: 2 },
  tags: { alignSelf: 'flex-start', borderWidth: 2, borderColor: '#2ECC71', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 18, marginTop: 10 },
  tag: { color: '#0B1330', fontWeight: '700' },
  tagsRow: { flexDirection: 'row', gap: 8, marginTop: 10 },

  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 12 },

  tabBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 12 },
  tabItem: { width: 56, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tabActive: { backgroundColor: '#D1FBE3' },
  tabIconImg: { width: 24, height: 24, resizeMode: 'contain' },
});
