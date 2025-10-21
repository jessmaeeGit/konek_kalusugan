import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Account({ onBack, profile }: { onBack?: () => void; profile?: { name: string; email: string; phone?: string; address?: string; dob?: string; gender?: string; avatarUri?: string } }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}> 
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Image source={require('../images/icons/chevron-left.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account</Text>
        <View style={styles.headerBtn} />
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 60 }]}> 
        <View style={styles.profileCard}>
          <Image source={profile?.avatarUri ? { uri: profile.avatarUri } : require('../images/icons/user-profile.png')} style={styles.avatar} />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.name}>{profile?.name || ''}</Text>
            <Text style={styles.email}>{profile?.email || ''}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Account & Store Info</Text>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{profile?.name || ''}</Text>
        </View>
        <View style={styles.infoGroup}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{profile?.email || ''}</Text>
        </View>
        <View style={styles.infoGroup}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{profile?.phone || ''}</Text>
        </View>
        <View style={styles.infoGroup}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{profile?.address || ''}</Text>
        </View>
        <View style={styles.row2}>
          <View style={[styles.infoGroup, styles.col]}>
            <Text style={styles.label}>Date of Birth</Text>
            <Text style={styles.value}>{profile?.dob || ''}</Text>
          </View>
          <View style={[styles.infoGroup, styles.col]}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>{profile?.gender || ''}</Text>
          </View>
        </View>
        <View style={styles.infoGroup}>
          <Text style={styles.label}>Default Health Station</Text>
          <Text style={styles.value}></Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 2, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15},
  headerIcon: { width: 22, height: 22, resizeMode: 'contain' },
  headerTitle: {  textAlign: 'center', color: '#0B1330', fontWeight: '800', fontSize: 20,  width: 200 },

  scroll: { paddingHorizontal: 16 },

  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F7FB', borderRadius: 12, padding: 12, marginTop: 16 },
  avatar: { width: 40, height: 40, borderRadius: 28, resizeMode: 'cover' },
  name: { color: '#0B1330', fontWeight: '800', fontSize: 13 },
  email: { color: '#6B7280', marginTop: 4, fontSize: 10 },

  sectionTitle: { marginTop: 18, color: '#6B7280' },

  infoGroup: { marginTop: 12 },
  label: { color: '#6B7280', marginBottom: 6 },
  value: { color: '#0B1330', fontWeight: '700', borderWidth: 1, borderColor: '#2ECC71', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },

  row2: { flexDirection: 'row', gap: 10 },
  col: { flex: 1 },
});
