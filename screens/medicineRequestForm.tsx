import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RequestSuccessModal from './requestSuccessModal';

export default function MedicineRequestForm({ onBack, onGoHome, onGoPrograms, onGoSettings, onSubmit, onSubmitAnother, onAddToHistory }: { onBack?: () => void; onGoHome?: () => void; onGoPrograms?: () => void; onGoSettings?: () => void; onSubmit?: () => void; onSubmitAnother?: () => void; onAddToHistory?: (requestData: { patientName: string; emailAddress: string; phoneNumber: string; deliveryAddress: string; additionalNotes: string; }) => void }) {
  const insets = useSafeAreaInsets();
  
  // Form state
  const [patientName, setPatientName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  
  // Modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Validation
  const isFormValid = () => {
    return patientName.trim() !== '' && 
           emailAddress.trim() !== '' && 
           phoneNumber.trim() !== '' && 
           deliveryAddress.trim() !== '';
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!isFormValid()) {
      Alert.alert('Required Fields', 'Please fill in all required fields.');
      return;
    }
    
    // Add request to history
    if (onAddToHistory) {
      onAddToHistory({
        patientName,
        emailAddress,
        phoneNumber,
        deliveryAddress,
        additionalNotes,
      });
    }
    
    // Show success modal
    setShowSuccessModal(true);
  };
  
  // Handle submit another request
  const handleSubmitAnother = () => {
    setShowSuccessModal(false);
    // Reset form
    setPatientName('');
    setEmailAddress('');
    setPhoneNumber('');
    setDeliveryAddress('');
    setAdditionalNotes('');
    // Navigate back to Medicine Request Portal
    if (onSubmitAnother) onSubmitAnother();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}> 
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Image source={require('../images/icons/chevron-left.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medicine Request Portal</Text>
        <View style={styles.headerBtn} />
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 140 }]}>
        {/* Title and Description */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Medicine Request Portal</Text>
          <Text style={styles.subtitle}>Upload your prescription and request your medicines</Text>
        </View>

        {/* Step Indicator */}
        <View style={styles.stepContainer}>
          <View style={styles.stepIndicator}>
            <View style={[styles.stepCircle, styles.stepCompleted]}>
              <Text style={styles.stepCompletedText}>1</Text>
            </View>
            <View style={[styles.stepLine, styles.stepLineActive]} />
            <View style={[styles.stepCircle, styles.stepActive]}>
              <Text style={styles.stepActiveText}>2</Text>
            </View>
          </View>
        </View>

        {/* Patient Information Form */}
        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <Image source={require('../images/icons/user-profile.png')} style={styles.formHeaderIcon} />
            <Text style={styles.formTitle}>Patient Information</Text>
          </View>

          {/* Patient Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Patient Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter full name"
              placeholderTextColor="#9CA3AF"
              value={patientName}
              onChangeText={setPatientName}
            />
          </View>

          {/* Email Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Email Address <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="your.email@example.com"
              placeholderTextColor="#9CA3AF"
              value={emailAddress}
              onChangeText={setEmailAddress}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Phone Number <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="+63 XXX XXX XXXX"
              placeholderTextColor="#9CA3AF"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          {/* Delivery Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Delivery Address <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Enter complete delivery address"
              placeholderTextColor="#9CA3AF"
              value={deliveryAddress}
              onChangeText={setDeliveryAddress}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Additional Notes */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Additional Notes (Optional)</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Any special instructions or requests"
              placeholderTextColor="#9CA3AF"
              value={additionalNotes}
              onChangeText={setAdditionalNotes}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.submitButton, !isFormValid() && styles.submitButtonDisabled]} 
            onPress={handleSubmit}
            disabled={!isFormValid()}
          >
            <Text style={[styles.submitButtonText, !isFormValid() && styles.submitButtonTextDisabled]}>
              Submit Request
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Success Modal */}
      <RequestSuccessModal
        visible={showSuccessModal}
        onSubmitAnother={handleSubmitAnother}
      />
      

      {/* Tab Bar */}
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
  container: { 
    flex: 1, 
    backgroundColor: '#F3F4F6' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingBottom: 8, 
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1, 
    borderBottomColor: '#E5E7EB'
  },
  headerBtn: { 
    width: 40, 
    height: 40, 
    alignItems: 'center', 
    justifyContent: 'center' 
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
    fontSize: 18 
  },

  scroll: { 
    paddingHorizontal: 16,
    paddingTop: 24
  },

  // Title Section
  titleSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

 // Step Indicator
  stepContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepActive: {
    backgroundColor: '#38D66B',
  },
  stepCompleted: {
    backgroundColor: '#10B981',
  },
  stepActiveText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  stepCompletedText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  stepInactiveText: {
    color: '#38D66B',
    fontWeight: '600',
    fontSize: 16,
  },
  stepLine: {
    width: 60,
    height: 2,
    backgroundColor: '#38D66B',
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: '#38D66B',
  },

  // Form Card
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  formHeaderIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#000000',
  },
  formTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },

  // Input Groups
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  required: {
    color: '#EF4444',
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 12,
    color: '#374151',
  },
  textArea: {
    minHeight: 80,
    paddingTop: 12,
  },

  // Action Buttons
  actionContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#38D66B',
  },
  backButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#38D66B',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  submitButtonTextDisabled: {
    color: '#9CA3AF',
  },

  // Tab Bar
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
    paddingBottom: 12 
  },
  tabItem: { 
    width: 56, 
    height: 44, 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  tabActive: { 
    backgroundColor: '#D1FBE3' 
  },
  tabIconImg: { 
    width: 24, 
    height: 24, 
    resizeMode: 'contain',
    tintColor: '#6B7280'
  },
});
