import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getItems as getStoreItems, subscribe as subscribeStore, toggleRead as toggleStoreRead, markAllRead as storeMarkAllRead, clear as storeClear } from '../lib/notificationsStore';

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  read: boolean;
  icon?: any;
  time: string;
};

const INITIAL_NOTIFS: NotificationItem[] = [
  {
    id: '1',
    title: 'Health Program Reminder',
    body: 'Free Vaccination Drive this Saturday at the Barangay Hall, 8:00 AM – 4:00 PM.',
    read: false,
    icon: require('../images/icons/announcement.png'),
    time: '2h ago',
  },
  {
    id: '2',
    title: 'Medicine Stock Update',
    body: 'Paracetamol 500mg is now available again at your Barangay Health Station.',
    read: false,
    icon: require('../images/icons/meds.png'),
    time: 'Yesterday',
  },
  {
    id: '3',
    title: 'Important Notice',
    body: 'Residents can only request medicines once every 7 days per prescription.',
    read: true,
    icon: require('../images/icons/orders.png'),
    time: '2 days ago',
  },
];

export default function NotificationCenter({ onBack, items, onToggleRead, onMarkAllRead, onClear }: { onBack?: () => void; items?: NotificationItem[]; onToggleRead?: (id: string) => void; onMarkAllRead?: () => void; onClear?: () => void }) {
  const insets = useSafeAreaInsets();
  const [localItems, setLocalItems] = useState<NotificationItem[]>(items ?? getStoreItems());

  useEffect(() => {
    if (items) return;
    const unsub = subscribeStore((next) => setLocalItems(next));
    return () => {
      // Ensure cleanup returns void, not boolean
      unsub();
    };
  }, [items]);

  const displayItems = items ?? localItems;
  const unreadCount = displayItems.filter((n) => !n.read).length;
  const handleToggleRead = onToggleRead ?? toggleStoreRead;
  const handleMarkAllRead = onMarkAllRead ?? storeMarkAllRead;
  const handleClear = onClear ?? storeClear;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}> 
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Image source={require('../images/icons/chevron-left.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerRight}>
          {unreadCount > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{unreadCount > 99 ? '99+' : unreadCount}</Text>
            </View>
          )}
          <TouchableOpacity onPress={handleMarkAllRead}>
            <Text style={styles.headerAction}>Mark all read</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClear}>
            <Text style={[styles.headerAction, { marginLeft: 8 }]}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 120 }]} showsVerticalScrollIndicator={false}> 
        {displayItems.length === 0 ? (
          <View style={styles.emptyWrap}>
            <View style={styles.emptyIconContainer}>
              <Image source={require('../images/icons/bell1.png')} style={styles.emptyIcon} />
            </View>
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptySub}>You're all caught up! We'll notify you when there's something new.</Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {displayItems.map((n) => (
              <TouchableOpacity 
                key={n.id} 
                style={[styles.notificationCard, n.read ? styles.notificationCardRead : styles.notificationCardUnread]} 
                onPress={() => handleToggleRead(n.id)}
                activeOpacity={0.7}
              >
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <View style={styles.iconAndDot}>
                      <View style={[styles.notificationIconContainer, n.read && styles.notificationIconContainerRead]}>
                        <Image source={n.icon || require('../images/icons/bell1.png')} style={styles.notificationIcon} />
                      </View>
                      {!n.read && <View style={styles.unreadIndicator} />}
                    </View>
                    <View style={styles.notificationText}>
                      <View style={styles.titleRow}>
                        <Text style={[styles.notificationTitle, n.read && styles.notificationTitleRead]} numberOfLines={1}>
                          {n.title}
                        </Text>
                        <Text style={styles.notificationTime}>{n.time}</Text>
                      </View>
                      <Text style={[styles.notificationBody, n.read && styles.notificationBodyRead]} numberOfLines={2}>
                        {n.body}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.notificationFooter}>
                  <View style={[styles.statusIndicator, n.read ? styles.statusRead : styles.statusUnread]}>
                    <Text style={[styles.statusText, n.read ? styles.statusTextRead : styles.statusTextUnread]}>
                      {n.read ? 'Read' : 'New'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8FAFC' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1, 
    borderBottomColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerBtn: { 
    width: 44, 
    height: 44, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 12,
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
    fontSize: 18,
    marginHorizontal: 16,
  },
  headerRight: { 
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 12,
  },
  headerAction: { 
    color: '#6366F1', 
    fontWeight: '600',
    fontSize: 14,
  },
  countBadge: { 
    backgroundColor: '#EF4444', 
    borderRadius: 12, 
    minWidth: 24, 
    height: 24, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 8,
  },
  countBadgeText: { 
    color: '#FFFFFF', 
    fontWeight: '700', 
    fontSize: 12 
  },

  scroll: { 
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  // Empty State
  emptyWrap: { 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyIcon: { 
    width: 32, 
    height: 32, 
    resizeMode: 'contain', 
    tintColor: '#9CA3AF' 
  },
  emptyTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySub: { 
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },

  // Notifications List
  notificationsList: {
    gap: 12,
  },

  // Notification Card
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
  },
  notificationCardUnread: {
    borderColor: '#6366F1',
    backgroundColor: '#FEFEFE',
  },
  notificationCardRead: {
    borderColor: '#E5E7EB',
    backgroundColor: '#FAFAFA',
  },

  // Notification Content
  notificationContent: {
    marginBottom: 12,
  },
  notificationHeader: {
    flexDirection: 'row',
    gap: 12,
  },
  iconAndDot: {
    position: 'relative',
  },
  notificationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIconContainerRead: {
    backgroundColor: '#F3F4F6',
  },
  notificationIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#6366F1',
  },
  unreadIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  // Notification Text
  notificationText: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  notificationTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 8,
  },
  notificationTitleRead: {
    color: '#6B7280',
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  notificationBody: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  notificationBodyRead: {
    color: '#9CA3AF',
  },

  // Notification Footer
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusUnread: {
    backgroundColor: '#EEF2FF',
  },
  statusRead: {
    backgroundColor: '#F3F4F6',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextUnread: {
    color: '#6366F1',
  },
  statusTextRead: {
    color: '#6B7280',
  },
});
