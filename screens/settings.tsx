import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Settings({ onGoHome, onGoPrograms, onGoRequests, onGoEditProfile, onGoAccount, onGoChangePassword, onGoNotifications, onGoHelp, onGoContact, onSignOut, profile }: { onGoHome?: () => void; onGoPrograms?: () => void; onGoRequests?: () => void; onGoEditProfile?: () => void; onGoAccount?: () => void; onGoChangePassword?: () => void; onGoNotifications?: () => void; onGoHelp?: () => void; onGoContact?: () => void; onSignOut?: () => void; profile?: { name: string; email: string; avatarUri?: string } }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 160 }]}> 
        <View style={styles.profileWrap}>
          <Image source={profile?.avatarUri ? { uri: profile.avatarUri } : require('../images/icons/user-profile.png')} style={styles.avatar} />
          <Text style={styles.name}>{profile?.name}</Text>
          <Text style={styles.email}>{profile?.email}</Text>
          <TouchableOpacity style={styles.editBtn} onPress={onGoEditProfile}>
            <Image source={require('../images/icons/password.png')} style={styles.editIcon} />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account & Store Info</Text>
          <TouchableOpacity style={styles.row} onPress={onGoAccount}> 
            <Image source={require('../images/icons/user-profile.png')} style={styles.rowIcon} />
            <Text style={styles.rowText}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={onGoChangePassword}> 
            <Image source={require('../images/icons/lock-01.png')} style={styles.rowIcon} />
            <Text style={styles.rowText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          <TouchableOpacity style={styles.row} onPress={onGoNotifications}> 
            <Image source={require('../images/icons/bell1.png')} style={styles.rowIcon} />
            <Text style={styles.rowText}>Notifications</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Help</Text>
          <TouchableOpacity style={styles.row} onPress={onGoHelp}> 
            <Image source={require('../images/icons/help.png')} style={styles.rowIcon} />
            <Text style={styles.rowText}>Help / FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={onGoContact}> 
            <Image source={require('../images/icons/email.png')} style={styles.rowIcon} />
            <Text style={styles.rowText}>Contact Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}> 
            <Image source={require('../images/icons/book.png')} style={styles.rowIcon} />
            <Text style={styles.rowText}>User Guide</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About App</Text>
          <TouchableOpacity style={styles.row}> 
            <Image source={require('../images/icons/info.png')} style={styles.rowIcon} />
            <Text style={styles.rowText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}> 
            <Image source={require('../images/icons/settings.png')} style={styles.rowIcon} />
            <Text style={styles.rowText}>App Version / Updates</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 28 }}>
          <TouchableOpacity style={styles.signOutBtn} onPress={onSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.tabBar}> 
        <TouchableOpacity style={styles.tabItem} onPress={onGoHome}> 
          <Image source={require('../images/icons/home-01.png')} style={styles.tabIconImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={onGoPrograms}> 
          <Image source={require('../images/icons/compass.png')} style={styles.tabIconImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={onGoRequests}> 
          <Image source={require('../images/icons/time.png')} style={styles.tabIconImg} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, styles.tabActive]}> 
          <Image source={require('../images/icons/settings.png')} style={styles.tabIconImg} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { paddingHorizontal: 16 },
  profileWrap: { alignItems: 'center' },
  avatar: { width: 96, height: 96, borderRadius: 48, resizeMode: 'cover' },
  name: { marginTop: 12, color: '#0B1330', fontWeight: '800', fontSize: 20, textAlign: 'center' },
  email: { marginTop: 4, color: '#6B7280', textAlign: 'center' },
  editBtn: { marginTop: 12, backgroundColor: '#38D66B', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 110, flexDirection: 'row', alignItems: 'center', gap: 8 },
  editIcon: { width: 16, height: 16, resizeMode: 'contain' },
  editText: { color: '#0B1330', fontWeight: '700' },

  section: { marginTop: 18, borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 12 },
  sectionTitle: { color: '#6B7280', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12 },
  rowIcon: { width: 22, height: 22, resizeMode: 'contain' },
  rowText: { color: '#0B1330', fontWeight: '700', fontSize: 16 },

  tabBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 12 },
  tabItem: { width: 56, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tabActive: { backgroundColor: '#D1FBE3' },
  tabIconImg: { width: 24, height: 24, resizeMode: 'contain' },
  signOutBtn: { backgroundColor: '#EF4444', borderRadius: 8, paddingVertical: 14, alignItems: 'center', justifyContent: 'center' },
  signOutText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
});
