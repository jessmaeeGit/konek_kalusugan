import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { launchImageLibrary, type ImageLibraryOptions, type ImagePickerResponse } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Define uploaded image type
interface UploadedImage {
  id: string;
  uri: string;
  name: string;
  type: string;
}

export default function MedicineRequestPortal({ onBack, onGoHome, onGoPrograms, onGoSettings, onNext, onGoNotifications, onGoHistory, uploadedPrescription, setUploadedPrescription }: { onBack?: () => void; onGoHome?: () => void; onGoPrograms?: () => void; onGoSettings?: () => void; onNext?: () => void; onGoNotifications?: () => void; onGoHistory?: () => void; uploadedPrescription?: { id: string; uri: string; name: string; type: string; } | null; setUploadedPrescription?: (prescription: { id: string; uri: string; name: string; type: string; } | null) => void }) {
  const insets = useSafeAreaInsets();
  
  const [currentStep, setCurrentStep] = useState(1);

  // Handle prescription upload
  const handlePrescriptionUpload = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: false,
      quality: 0.8,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    
    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) return;
      
      if (response.errorCode) {
        Alert.alert('Image Picker Error', response.errorMessage || response.errorCode);
        return;
      }
      
      const asset = response.assets && response.assets[0];
      if (asset?.uri) {
        const newImage: UploadedImage = {
          id: Date.now().toString(),
          uri: asset.uri,
          name: asset.fileName || `prescription_${Date.now()}.jpg`,
          type: asset.type || 'image/jpeg'
        };
        if (setUploadedPrescription) {
          setUploadedPrescription(newImage);
        }
      }
    });
  };

  // Remove uploaded prescription
  const removePrescription = () => {
    if (setUploadedPrescription) {
      setUploadedPrescription(null);
    }
  };

  // Handle next step
  const handleNext = () => {
    if (!uploadedPrescription) {
      Alert.alert('Required', 'Please upload your prescription before proceeding.');
      return;
    }
    if (onNext) onNext();
  };

  // For testing - always enable button (remove this later)
  const isButtonEnabled = true; // Change to: uploadedPrescription !== null

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}> 
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Image source={require('../images/icons/chevron-left.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medicine Request Portal</Text>
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 140 }]}>
        {/* Title and Description */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Upload your prescription and track your requests</Text>
          {/* <Text style={styles.subtitle}>Upload your prescription and track your requests</Text> */}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.newRequestButton} onPress={() => {}}>
            <Image source={require('../images/icons/plus-01.png')} style={styles.buttonIcon} />
            <Text style={styles.newRequestButtonText}>New Request</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.historyButton} onPress={onGoHistory}>
            <Image source={require('../images/icons/time.png')} style={styles.buttonIconGray} />
            <Text style={styles.historyButtonText}>History</Text>
          </TouchableOpacity>
        </View>

        {/* Step Indicator */}
        <View style={styles.stepContainer}>
          <View style={styles.stepIndicator}>
            <View style={[styles.stepCircle, styles.stepActive]}>
              <Text style={styles.stepActiveText}>1</Text>
            </View>
            <View style={styles.stepLine} />
            <View style={styles.stepCircle}>
              <Text style={styles.stepInactiveText}>2</Text>
            </View>
          </View>
        </View>

        {/* Upload Section */}
        <View style={styles.uploadCard}>
          <View style={styles.uploadHeader}>
            {/* <Image source={require('../images/icons/plus-01.png')} style={styles.uploadHeaderIcon} /> */}
            <Text style={styles.uploadTitle}>Provide proof of prescription</Text>
          </View>

          {!uploadedPrescription ? (
            <TouchableOpacity style={styles.uploadArea} onPress={handlePrescriptionUpload}>
              <Image source={require('../images/icons/capsule.png')} style={styles.uploadIcon} />
              <Text style={styles.uploadText}>Click to upload prescription</Text>
              <Text style={styles.uploadSubtext}>or drag and drop</Text>
              <Text style={styles.uploadFormat}>PNG, JPG, JPEG up to 10MB</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.uploadedArea}>
              <Image source={{ uri: uploadedPrescription.uri }} style={styles.uploadedImage} />
              <View style={styles.uploadedInfo}>
                <Text style={styles.uploadedName} numberOfLines={1}>{uploadedPrescription.name}</Text>
                <Text style={styles.uploadedSize}>Uploaded successfully</Text>
              </View>
              <TouchableOpacity style={styles.removeButton} onPress={removePrescription}>
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Important Notice */}
          <View style={styles.noticeCard}>
            <View style={styles.noticeHeader}>
              <Image source={require('../images/icons/info.png')} style={styles.noticeIcon} />
              <Text style={styles.noticeTitle}>Important:</Text>
            </View>
            <Text style={styles.noticeText}>
              Please ensure your prescription is clear and legible with doctor's signature visible.
            </Text>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity 
          style={[styles.continueButton, !isButtonEnabled && styles.continueButtonDisabled]} 
          onPress={handleNext}
          disabled={!isButtonEnabled}
        >
          <Text style={[styles.continueButtonText, !isButtonEnabled && styles.continueButtonTextDisabled]}>
            Continue to Next Step
          </Text>
        </TouchableOpacity>
      </ScrollView>

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
    paddingHorizontal: 1, 
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
    paddingTop: 10
  },

  // Title Section
  titleSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 0,
  },

  // Action Buttons
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  newRequestButton: {
    flex: 1,
    backgroundColor: '#38d66b',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  historyButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonIcon: {
    width: 15,
    height: 15,
    tintColor: '#000000',
  },
  buttonIconGray: {
    width: 17,
    height: 17,
    tintColor: '#6B7280',
  },
  newRequestButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  historyButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
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
  stepActiveText: {
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
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },

  // Upload Card
  uploadCard: {
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
  uploadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadHeaderIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#1F2937',
  },
  uploadTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },

  // Upload Area
  uploadArea: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadIcon: {
    width: 30,
    height: 30,
    tintColor: '#000000',
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  uploadFormat: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  // Uploaded Area
  uploadedArea: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  uploadedImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  uploadedInfo: {
    flex: 1,
  },
  uploadedName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  uploadedSize: {
    fontSize: 12,
    color: '#16A34A',
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Notice Card
  noticeCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  noticeIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: '#D97706',
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#92400E',
  },
  noticeText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },

  // Continue Button
  continueButton: {
    backgroundColor: '#38D66B',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  continueButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  continueButtonTextDisabled: {
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
