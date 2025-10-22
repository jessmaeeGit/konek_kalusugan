import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Modal, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Mock data for detailed request history - empty by default
const DETAILED_HISTORY: Array<{
  id: string;
  patientName: string;
  date: string;
  medicines: string[];
  deliveryAddress: string;
  status: string;
  prescriptionImage: any;
}> = [];

export default function MedicineRequestHistory({ onBack, onGoHome, onGoPrograms, onGoSettings, onNewRequest, requestHistory }: { onBack?: () => void; onGoHome?: () => void; onGoPrograms?: () => void; onGoSettings?: () => void; onNewRequest?: () => void; requestHistory?: Array<{
  id: string;
  patientName: string;
  date: string;
  medicines: string[];
  deliveryAddress: string;
  status: string;
  prescriptionImage: any;
  emailAddress: string;
  phoneNumber: string;
  additionalNotes: string;
}> }) {
  const insets = useSafeAreaInsets();
  
  // Search state
  const [searchDate, setSearchDate] = useState('');
  
  // Selected request for detailed view
  const [selectedRequest, setSelectedRequest] = useState<{
    id: string;
    patientName: string;
    date: string;
    medicines: string[];
    deliveryAddress: string;
    status: string;
    prescriptionImage: any;
    emailAddress: string;
    phoneNumber: string;
    additionalNotes: string;
  } | null>(null);

  // Image viewer state
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [viewerImage, setViewerImage] = useState<any>(null);

  // Function to handle image viewing
  const handleImagePress = (image: any) => {
    console.log('Image pressed:', image); // Debug log
    console.log('Image type:', typeof image); // Debug log
    
    // Only show full screen for uploaded images (those with uri property)
    if (image?.uri) {
      console.log('Image has URI, showing viewer:', image.uri);
      setViewerImage(image);
      setShowImageViewer(true);
    } else {
      console.log('Image is default capsule icon, not showing viewer');
      Alert.alert(
        'No Prescription Image',
        'This request uses the default capsule icon. No prescription image was uploaded.',
        [{ text: 'OK' }]
      );
    }
  };
  
  // Use passed requestHistory or fallback to empty array
  const historyData = requestHistory || [];
  
  // Filter history data based on search date
  const filteredHistoryData = historyData.filter(request => {
    if (!searchDate.trim()) return true; // Show all if no search term
    return request.date.toLowerCase().includes(searchDate.toLowerCase());
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#10B981';
      case 'rejected': return '#EF4444';
      case 'pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'approved': return '#D1FAE5';
      case 'rejected': return '#FEE2E2';
      case 'pending': return '#FEF3C7';
      default: return '#F3F4F6';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

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
          <Text style={styles.mainTitle}>Medicine Request Portal</Text>
          <Text style={styles.subtitle}>Upload your prescription and track your requests</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.newRequestButton} onPress={onNewRequest}>
            <Image source={require('../images/icons/plus-01.png')} style={styles.buttonIcon} />
            <Text style={styles.newRequestButtonText}>New Request</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.historyButtonActive}>
            <Image source={require('../images/icons/time.png')} style={styles.buttonIconWhite} />
            <Text style={styles.historyButtonActiveText}>History</Text>
          </TouchableOpacity>
        </View>

        {/* Request History Section */}
        <View style={styles.historySection}>
          <View style={styles.historySectionHeader}>
            <Image source={require('../images/icons/time.png')} style={styles.historySectionIcon} />
            <Text style={styles.historySectionTitle}>Request History</Text>
          </View>

          {/* Search Input */}
          <View style={styles.searchContainer}>
            <Image source={require('../images/icons/search-02.png')} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by date (e.g., October, 2025, Oct 20)"
              value={searchDate}
              onChangeText={setSearchDate}
              placeholderTextColor="#9CA3AF"
            />
            {searchDate.length > 0 && (
              <TouchableOpacity onPress={() => setSearchDate('')} style={styles.clearButton}>
                <Text style={styles.clearText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* History List */}
          <View style={styles.historyList}>
            {filteredHistoryData.length === 0 ? (
              <View style={styles.emptyState}>
                <Image source={require('../images/icons/time.png')} style={styles.emptyStateIcon} />
                <Text style={styles.emptyStateTitle}>
                  {historyData.length === 0 ? 'No Request History' : 'No Results Found'}
                </Text>
                <Text style={styles.emptyStateMessage}>
                  {historyData.length === 0 
                    ? 'You haven\'t made any medicine requests yet. Start by creating your first request.'
                    : `No requests found matching "${searchDate}". Try a different search term.`
                  }
                </Text>
              </View>
            ) : (
              filteredHistoryData.map((request) => (
                <View key={request.id} style={styles.historyCard}>
                  {/* Status Badge */}
                  <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(request.status) }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(request.status) }]}>
                      {getStatusText(request.status)}
                    </Text>
                  </View>

                  {/* Card Content */}
                  <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                      <Image 
                        source={request.prescriptionImage} 
                        style={[
                          styles.prescriptionThumbnail,
                          // Only apply tint to default capsule icon, not uploaded images
                          request.prescriptionImage?.uri ? {} : { tintColor: '#6B7280' }
                        ]} 
                      />
                      <View style={styles.cardHeaderText}>
                        <Text style={styles.patientName}>{request.patientName}</Text>
                        <Text style={styles.requestId}>Request ID: {request.id}</Text>
                      </View>
                    </View>

                    <View style={styles.cardDetails}>
                      <Text style={styles.detailLabel}>Date: <Text style={styles.detailValue}>{request.date}</Text></Text>
                      <Text style={styles.detailLabel}>Medicines: <Text style={styles.detailValue}>{request.medicines.join(', ')}</Text></Text>
                      <Text style={styles.detailLabel}>Address: <Text style={styles.detailValue}>{request.deliveryAddress}</Text></Text>
                    </View>

                    {/* View Button */}
                    <TouchableOpacity 
                      style={styles.viewButton} 
                      onPress={() => setSelectedRequest(request)}
                    >
                      <Text style={styles.viewButtonText}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      {/* Request Details Modal */}
      <Modal
        visible={selectedRequest !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedRequest(null)}
      >
        {selectedRequest && (
          <View style={styles.modalContainer}>
            <View style={[styles.modalHeader, { paddingTop: insets.top }]}>
              <Text style={styles.modalTitle}>Request Details</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setSelectedRequest(null)}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              {/* Status Badge */}
              <View style={styles.statusContainer}>
                <View style={[styles.modalStatusBadge, { backgroundColor: getStatusBgColor(selectedRequest.status) }]}>
                  <View style={styles.statusIconContainer}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(selectedRequest.status) }]} />
                    <Text style={[styles.modalStatusText, { color: getStatusColor(selectedRequest.status) }]}>
                      {getStatusText(selectedRequest.status)}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Request Info Card */}
              <View style={styles.modalCard}>
                <View style={styles.modalSectionHeader}>
                  <Image source={require('../images/icons/info.png')} style={styles.sectionIcon} />
                  <Text style={styles.modalSectionTitle}>Request Information</Text>
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.modalInfoRow}>
                    <View style={styles.labelContainer}>
                      <Image source={require('../images/icons/info.png')} style={styles.infoIcon} />
                      <Text style={styles.modalLabel}>Request ID</Text>
                    </View>
                    <Text style={styles.modalValue}>{selectedRequest.id}</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.modalInfoRow}>
                    <View style={styles.labelContainer}>
                      <Image source={require('../images/icons/calendar-03.png')} style={styles.infoIcon} />
                      <Text style={styles.modalLabel}>Date</Text>
                    </View>
                    <Text style={styles.modalValue}>{selectedRequest.date}</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.modalInfoRow}>
                    <View style={styles.labelContainer}>
                      <Image source={require('../images/icons/clock-01.png')} style={styles.infoIcon} />
                      <Text style={styles.modalLabel}>Status</Text>
                    </View>
                    <View style={[styles.statusChip, { backgroundColor: getStatusBgColor(selectedRequest.status) }]}>
                      <Text style={[styles.statusChipText, { color: getStatusColor(selectedRequest.status) }]}>
                        {getStatusText(selectedRequest.status)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Patient Info Card */}
              <View style={styles.modalCard}>
                <View style={styles.modalSectionHeader}>
                  <Image source={require('../images/icons/user-profile.png')} style={styles.sectionIcon} />
                  <Text style={styles.modalSectionTitle}>Patient Information</Text>
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.modalInfoRow}>
                    <View style={styles.labelContainer}>
                      <Image source={require('../images/icons/user-profile.png')} style={styles.infoIcon} />
                      <Text style={styles.modalLabel}>Patient Name</Text>
                    </View>
                    <Text style={styles.modalValue}>{selectedRequest.patientName}</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.modalInfoRow}>
                    <View style={styles.labelContainer}>
                      <Image source={require('../images/icons/email.png')} style={styles.infoIcon} />
                      <Text style={styles.modalLabel}>Email</Text>
                    </View>
                    <Text style={styles.modalValue}>{selectedRequest.emailAddress}</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.modalInfoRow}>
                    <View style={styles.labelContainer}>
                      <Image source={require('../images/icons/phone.png')} style={styles.infoIcon} />
                      <Text style={styles.modalLabel}>Phone</Text>
                    </View>
                    <Text style={styles.modalValue}>{selectedRequest.phoneNumber}</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.modalInfoRow}>
                    <View style={styles.labelContainer}>
                      <Image source={require('../images/icons/location.png')} style={styles.infoIcon} />
                      <Text style={styles.modalLabel}>Address</Text>
                    </View>
                    <Text style={styles.modalValue}>{selectedRequest.deliveryAddress}</Text>
                  </View>
                </View>
              </View>

             

              {/* Medicines Card */}
              <View style={styles.modalCard}>
                <View style={styles.modalSectionHeader}>
                  <Image source={require('../images/icons/capsule.png')} style={styles.sectionIcon} />
                  <Text style={styles.modalSectionTitle}>Medicines</Text>
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.medicineContainer}>
                    <Text style={styles.medicineText}>{selectedRequest.medicines.join(', ')}</Text>
                  </View>
                </View>
              </View>

              {/* Additional Notes Card */}
              {selectedRequest.additionalNotes && (
                <View style={styles.modalCard}>
                  <View style={styles.modalSectionHeader}>
                    <Image source={require('../images/icons/info.png')} style={styles.sectionIcon} />
                    <Text style={styles.modalSectionTitle}>Additional Notes</Text>
                  </View>
                  <View style={styles.cardContent}>
                    <View style={styles.notesContainer}>
                      <Text style={styles.notesText}>{selectedRequest.additionalNotes}</Text>
                    </View>
                  </View>
                </View>
              )}

              {/* Prescription Image Card */}
              <View style={styles.modalCard}>
                <View style={styles.modalSectionHeader}>
                  <Image source={require('../images/icons/capsule.png')} style={styles.sectionIcon} />
                  <Text style={styles.modalSectionTitle}>Prescription</Text>
                </View>
                <View style={styles.cardContent}>
                  <TouchableOpacity 
                    onPress={() => handleImagePress(selectedRequest.prescriptionImage)}
                    activeOpacity={selectedRequest.prescriptionImage?.uri ? 0.7 : 1}
                    style={styles.prescriptionImageContainer}
                  >
                    <Image 
                      source={selectedRequest.prescriptionImage} 
                      style={styles.modalPrescriptionImage}
                    />
                    {selectedRequest.prescriptionImage?.uri && (
                      <View style={styles.imageOverlay}>
                        <Text style={styles.imageOverlayText}>Tap to view full size</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </Modal>

      {/* Full Screen Image Viewer Modal */}
      <Modal
        visible={showImageViewer}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setShowImageViewer(false)}
      >
        <View style={styles.imageViewerContainer}>
          {/* Header */}
          <View style={styles.imageViewerHeader}>
            <Text style={styles.imageViewerTitle}>Prescription Image</Text>
            <TouchableOpacity 
              style={styles.imageViewerCloseButton}
              onPress={() => setShowImageViewer(false)}
            >
              <Text style={styles.imageViewerCloseText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          {/* Image Content */}
          <View style={styles.imageViewerContent}>
            {viewerImage ? (
              <TouchableOpacity 
                style={styles.imageContainer}
                onPress={() => setShowImageViewer(false)}
                activeOpacity={0.9}
              >
                <Image 
                  source={viewerImage} 
                  style={styles.fullScreenImage}
                  resizeMode="contain"
                  onError={(error) => {
                    console.log('Image load error:', error);
                    console.log('Failed image source:', viewerImage);
                  }}
                  onLoad={() => console.log('Image loaded successfully')}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.noImageContainer}>
                <Text style={styles.noImageText}>No image to display</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>

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

  // Action Buttons
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
    paddingHorizontal: 0,
  },
  newRequestButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  historyButtonActive: {
    flex: 1,
    backgroundColor: '#38d66b',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: '#6B7280',
  },
  buttonIconWhite: {
    width: 20,
    height: 20,
    tintColor: '#000000',
  },
  newRequestButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  historyButtonActiveText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },

  // History Section
  historySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  historySectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  historySectionIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#000000',
  },
  historySectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },

  // Search Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    width: 15,
    height: 15,
    tintColor: '#9CA3AF',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 11,
    color: '#374151',
    paddingVertical: 4,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '600',
  },

  // View Button Styles
  viewButton: {
    backgroundColor: '#38d66b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },

  // History List
  historyList: {
    gap: 16,
  },
  historyCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  prescriptionThumbnail: {
    width: 40,
    height: 40,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
  cardHeaderText: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  requestId: {
    fontSize: 12,
    color: '#6B7280',
  },
  cardDetails: {
    gap: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  detailValue: {
    fontWeight: '400',
    color: '#6B7280',
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

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateIcon: {
    width: 48,
    height: 48,
    tintColor: '#9CA3AF',
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyStateButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'center',
  },
  emptyStateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalCloseText: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 24,
  },
  modalStatusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  modalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  modalLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    flex: 1,
  },
  modalValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
    flex: 2,
    textAlign: 'right',
  },
  modalPrescriptionImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  imageOverlayText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },

  // Image Viewer Styles
  imageViewerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  imageViewerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    zIndex: 1,
  },
  imageViewerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  imageViewerCloseButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  imageViewerCloseText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  imageViewerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  fullScreenImage: {
    width: '90%',
    height: '70%',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  noImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Enhanced Modal Styles
  statusContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  modalSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    gap: 12,
  },
  sectionIcon: {
    width: 24,
    height: 24,
    tintColor: '#6366F1',
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  infoIcon: {
    width: 16,
    height: 16,
    tintColor: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 12,
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  medicineContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  medicineText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    lineHeight: 20,
  },
  notesContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  notesText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  prescriptionImageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});
