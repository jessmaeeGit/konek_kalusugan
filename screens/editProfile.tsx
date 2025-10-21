import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { launchImageLibrary, type ImageLibraryOptions, type ImagePickerResponse } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EditProfile({ onBack, onSaved, profile }: { onBack?: () => void; onSaved?: (p: { name: string; email: string; phone?: string; address?: string; dob?: string; gender?: string; avatarUri?: string }) => void; profile?: { name: string; email: string; phone?: string; address?: string; dob?: string; gender?: string; avatarUri?: string } }) {
  const insets = useSafeAreaInsets();

  const [fullName, setFullName] = useState(profile?.name ?? '');
  const [email, setEmail] = useState(profile?.email ?? '');
  const [phone, setPhone] = useState(profile?.phone ?? '');
  const [address, setAddress] = useState(profile?.address ?? '');
  const [dob, setDob] = useState(profile?.dob ?? '');
  const [gender, setGender] = useState(profile?.gender ?? '');
  const [avatarUri, setAvatarUri] = useState<string | undefined>(profile?.avatarUri);

  const handleSave = () => {
    const updated = { name: fullName.trim(), email: email.trim(), phone, address, dob, gender, avatarUri };
    if (onSaved) onSaved(updated);
    else if (onBack) onBack();
  };

  const pickImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: false,
      quality: 0.8,
    };
    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Image Picker Error', response.errorMessage || response.errorCode);
        return;
      }
      const asset = response.assets && response.assets[0];
      if (asset?.uri) setAvatarUri(asset.uri);
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}> 
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Image source={require('../images/icons/chevron-left.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity style={styles.headerBtn}>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 140 }]}> 
        <View style={styles.profileWrap}>
          <Image source={avatarUri ? { uri: avatarUri } : require('../images/icons/user-profile.png')} style={styles.avatar} />
          <TouchableOpacity style={styles.changePhotoBtn} onPress={pickImage}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput value={fullName} onChangeText={setFullName} placeholder="Enter full name" style={styles.input} />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput value={email} onChangeText={setEmail} placeholder="Enter email" keyboardType="email-address" style={styles.input} />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput value={phone} onChangeText={setPhone} placeholder="Enter phone number" keyboardType="phone-pad" style={styles.input} />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Address</Text>
          <TextInput value={address} onChangeText={setAddress} placeholder="Enter address" style={[styles.input, { height: 90, textAlignVertical: 'top', paddingTop: 12 }]} multiline />
        </View>

        <View style={styles.row2}>
          <View style={[styles.formGroup, styles.col]}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput value={dob} onChangeText={setDob} placeholder="MM/DD/YYYY" style={styles.input} />
          </View>
          <View style={[styles.formGroup, styles.col]}>
            <Text style={styles.label}>Gender</Text>
            <TextInput value={gender} onChangeText={setGender} placeholder="e.g. Male" style={styles.input} />
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onBack}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 50 },
  headerIcon: { width: 22, height: 22, resizeMode: 'contain' },
  headerTitle: { textAlign: 'center', color: '#0B1330', fontWeight: '800', fontSize: 20 },

  scroll: { paddingHorizontal: 16 },
  profileWrap: { alignItems: 'center', marginTop: 16 },
  avatar: { width: 96, height: 96, borderRadius: 48, resizeMode: 'cover' },
  changePhotoBtn: { marginTop: 8 },
  changePhotoText: { color: '#2563EB', fontWeight: '700' },

  formGroup: { marginTop: 14 },
  label: { color: '#6B7280', marginBottom: 6 },
  input: { borderWidth: 2, borderColor: '#2ECC71', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, color: '#0B1330' },

  row2: { flexDirection: 'row', gap: 10 },
  col: { flex: 1 },

  actionRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  cancelBtn: { flex: 1, backgroundColor: '#E5E7EB', borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  cancelText: { color: '#0B1330', fontWeight: '700' },
  saveBtn: { flex: 1, backgroundColor: '#38D66B', borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  saveText: { color: '#0B1330', fontWeight: '700' },
});
