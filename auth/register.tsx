import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Icon component to handle both MaterialIcons and fallback to Image
// Component for consistent icon rendering
const IconWrapper = ({
  name,
  size = 24,
  color = '#000',
  style,
}: {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}) => {
  return (
    <View style={[styles.iconSpacer, style]}>
      <MaterialIcons name={name} size={size} color={color} />
    </View>
  );
};

export default function Register({
  onBack,
  onComplete,
}: {
  onBack?: () => void;
  onComplete: (profile: { name: string; email: string }) => void;
}) {
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [barangayId, setBarangayId] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [barangays, setBarangays] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [showBarangayModal, setShowBarangayModal] = useState(false);
  const [selectedBarangay, setSelectedBarangay] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isLoadingBarangays, setIsLoadingBarangays] = useState(false);
  const [filteredBarangays, setFilteredBarangays] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize filtered barangays
  useEffect(() => {
    setFilteredBarangays(barangays);
  }, [barangays]);

  // Fetch barangay list
  useEffect(() => {
    const fetchBarangays = async () => {
      setIsLoadingBarangays(true);
      try {
        const response = await fetch('http://www.junssei.site/api/barangays', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data && data.success && Array.isArray(data.barangays)) {
          const formattedBarangays = data.barangays
            .filter((item: { id: number; name: string }) => item.name)
            .sort((a: { name: string }, b: { name: string }) =>
              a.name.localeCompare(b.name),
            );

          setBarangays(formattedBarangays);
          console.log('Barangays loaded:', formattedBarangays); // Debug log
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching barangays:', error);
        Alert.alert(
          'Error',
          'Unable to load barangay list. Please check your connection and try again.',
        );
      } finally {
        setIsLoadingBarangays(false);
      }
    };

    fetchBarangays();
  }, []);

  const validateInputs = () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Username is required');
      return false;
    }
    if (!fullName.trim()) {
      Alert.alert('Error', 'Full name is required');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    if (!password) {
      Alert.alert('Error', 'Password is required');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }
    if (password !== confirm) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const createAccount = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://www.junssei.site/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          full_name: fullName.trim(),
          email: email.trim(),
          password: password,
          contact_no: contactNo.trim() || null,
          gender: gender || null,
          barangay_id: barangayId.trim() || null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If registration successful
        onComplete({ name: fullName.trim(), email: email.trim() });
      } else {
        // If registration failed
        Alert.alert(
          'Registration Failed',
          data.message || 'Failed to create account',
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to connect to the server. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + 16 }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        accessibilityLabel="Back"
        accessibilityRole="button"
        style={styles.backWrap}
        onPress={onBack}
      >
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="#1F2A37"
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Create Your{'\n'}Account</Text>

      <View style={styles.inputWrap}>
        <IconWrapper name="account-circle" size={24} color="#2ECC71" />
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          placeholderTextColor="#97A3B6"
          style={styles.input}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputWrap}>
        <IconWrapper name="person" size={24} color="#2ECC71" />
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
          placeholderTextColor="#97A3B6"
          style={styles.input}
        />
      </View>

      <View style={styles.inputWrap}>
        <IconWrapper name="email" size={24} color="#2ECC71" />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#97A3B6"
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={[styles.inputWrap, { marginTop: 14 }]}>
        <MaterialIcons
          name="lock"
          size={20}
          color="#2ECC71"
          style={styles.inputIconImg}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#97A3B6"
          style={styles.input}
          secureTextEntry={hidePassword}
        />
        <TouchableOpacity
          onPress={() => setHidePassword(v => !v)}
          style={styles.eyeButton}
        >
          <MaterialIcons
            name={hidePassword ? 'visibility-off' : 'visibility'}
            size={20}
            color="#2ECC71"
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.inputWrap, { marginTop: 14 }]}>
        <MaterialIcons
          name="lock"
          size={20}
          color="#2ECC71"
          style={styles.inputIconImg}
        />
        <TextInput
          value={confirm}
          onChangeText={setConfirm}
          placeholder="Confirm Password"
          placeholderTextColor="#97A3B6"
          style={styles.input}
          secureTextEntry={hideConfirm}
        />
        <TouchableOpacity
          onPress={() => setHideConfirm(v => !v)}
          style={styles.eyeButton}
        >
          <MaterialIcons
            name={hideConfirm ? 'visibility-off' : 'visibility'}
            size={20}
            color="#2ECC71"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrap}>
        <IconWrapper name="phone" size={24} color="#2ECC71" />
        <TextInput
          value={contactNo}
          onChangeText={setContactNo}
          placeholder="Contact Number (Optional)"
          placeholderTextColor="#97A3B6"
          style={styles.input}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputWrap}>
        <IconWrapper name="people" size={24} color="#2ECC71" />
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === 'male' && styles.genderButtonSelected,
            ]}
            onPress={() => setGender('male')}
          >
            <Text
              style={[
                styles.genderText,
                gender === 'male' && styles.genderTextSelected,
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === 'female' && styles.genderButtonSelected,
            ]}
            onPress={() => setGender('female')}
          >
            <Text
              style={[
                styles.genderText,
                gender === 'female' && styles.genderTextSelected,
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputWrap}>
        <IconWrapper name="location-on" size={24} color="#2ECC71" />
        <TouchableOpacity
          style={styles.pickerContainer}
          onPress={() => setShowBarangayModal(!showBarangayModal)}
        >
          <Text
            style={[styles.input, !selectedBarangay && styles.placeholderText]}
          >
            {selectedBarangay
              ? selectedBarangay.name
              : 'Select Barangay (Optional)'}
          </Text>
          <MaterialIcons
            name={showBarangayModal ? 'arrow-drop-up' : 'arrow-drop-down'}
            size={24}
            color="#2ECC71"
          />
        </TouchableOpacity>

        {showBarangayModal && (
          <View style={styles.dropdownList}>
            {isLoadingBarangays ? (
              <View style={styles.dropdownLoading}>
                <ActivityIndicator size="small" color="#2ECC71" />
              </View>
            ) : (
              <ScrollView
                style={styles.dropdownScroll}
                nestedScrollEnabled={true}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={true}
              >
                {barangays.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.dropdownItem,
                      selectedBarangay?.id === item.id &&
                        styles.dropdownItemSelected,
                    ]}
                    onPress={() => {
                      setSelectedBarangay(item);
                      setBarangayId(item.id.toString());
                      setShowBarangayModal(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedBarangay?.id === item.id &&
                          styles.dropdownItemTextSelected,
                      ]}
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.createBtn, isLoading && styles.createBtnDisabled]}
        onPress={createAccount}
        disabled={isLoading}
      >
        <Text style={styles.createText}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Text>
      </TouchableOpacity>

      <View style={styles.loginRow}>
        <Text style={styles.loginHint}>Already Have An Account? </Text>
        <TouchableOpacity onPress={onBack} disabled={isLoading}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2ECC71',
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownScroll: {
    maxHeight: 200,
    backgroundColor: '#fff',
  },
  dropdownLoading: {
    padding: 20,
    alignItems: 'center',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  dropdownItemSelected: {
    backgroundColor: '#EFFFF4',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#0B1330',
    paddingVertical: 2,
  },
  dropdownItemTextSelected: {
    color: '#2ECC71',
    fontWeight: '600',
  },
  backWrap: {
    paddingVertical: 8,
    paddingRight: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 8,
    fontSize: 34,
    fontWeight: '800',
    color: '#0B1330',
    lineHeight: 40,
  },
  inputWrap: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#2ECC71',
    backgroundColor: '#EFFFF4',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
  },
  iconSpacer: {
    width: 24,
    height: 24,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputIconImg: {
    marginRight: 12,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#0B1330',
    paddingVertical: 4,
    height: 24,
  },
  eyeButton: {
    marginLeft: 8,
    padding: 4,
  },
  eyeImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  createBtn: {
    marginTop: 18,
    backgroundColor: '#38D66B',
    borderRadius: 4,
    alignItems: 'center',
    paddingHorizontal: 80,
  },
  createBtnDisabled: {
    opacity: 0.7,
  },
  createText: {
    textAlign: 'center',
    width: '100%',
    color: '#0B1330',
    fontWeight: '700',
    fontSize: 16,
    paddingVertical: 12,
  },
  loginRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginHint: {
    color: '#1F2A37',
  },
  loginLink: {
    color: '#0B1330',
    fontWeight: '700',
  },
  genderContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2ECC71',
    alignItems: 'center',
  },
  genderButtonSelected: {
    backgroundColor: '#2ECC71',
  },
  genderText: {
    color: '#2ECC71',
    fontSize: 14,
    fontWeight: '600',
  },
  genderTextSelected: {
    color: '#FFFFFF',
  },
  placeholderText: {
    color: '#97A3B6',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0B1330',
  },
  modalCloseBtn: {
    padding: 8,
  },
  modalCloseIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  modalLoader: {
    padding: 20,
  },
  barangayItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  barangayItemSelected: {
    backgroundColor: '#EFFFF4',
  },
  barangayItemText: {
    fontSize: 16,
    color: '#0B1330',
  },
  barangayItemTextSelected: {
    color: '#2ECC71',
    fontWeight: '600',
  },
});
