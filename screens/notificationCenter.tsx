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

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 120 }]}> 
        {displayItems.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Image source={require('../images/icons/bell1.png')} style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptySub}>You’re all caught up.</Text>
          </View>
        ) : (
          displayItems.map((n) => (
            <TouchableOpacity key={n.id} style={[styles.card, n.read ? styles.cardRead : null]} onPress={() => handleToggleRead(n.id)}>
              <View style={styles.cardRow}>
                <Image source={n.icon} style={styles.cardIcon} />
                <View style={{ flex: 1 }}>
                  <View style={styles.cardHeaderRow}>
                    {!n.read && <View style={styles.unreadDot} />}
                    <Text style={[styles.cardTitle, n.read && styles.cardTitleRead]}>{n.title}</Text>
                    <Text style={styles.cardTime}>{n.time}</Text>
                  </View>
                  <Text style={[styles.cardBody, n.read && styles.cardBodyRead]}>{n.body}</Text>
                </View>
              </View>
              <Text style={styles.tapHint}>{n.read ? 'Tap to mark as unread' : 'Tap to mark as read'}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  headerIcon: { width: 22, height: 22, resizeMode: 'contain' },
  headerTitle: { flex: 1, textAlign: 'center', color: '#0B1330', fontWeight: '800', fontSize: 20 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  headerAction: { color: '#2563EB', fontWeight: '700' },
  countBadge: { marginRight: 10, backgroundColor: '#EF4444', borderRadius: 10, minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  countBadgeText: { color: '#FFFFFF', fontWeight: '800', fontSize: 12 },

  scroll: { paddingHorizontal: 16 },

  card: { marginTop: 12, backgroundColor: '#F5F7FB', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  cardRead: { backgroundColor: '#FAFAFA' },
  cardRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  cardIcon: { width: 22, height: 22, resizeMode: 'contain', marginTop: 2 },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#34D399', marginRight: 6 },
  cardTitle: { flex: 1, fontWeight: '800', color: '#0B1330' },
  cardTitleRead: { color: '#6B7280' },
  cardTime: { color: '#9CA3AF', marginLeft: 8 },
  cardBody: { marginTop: 6, color: '#111827' },
  cardBodyRead: { color: '#9CA3AF' },
  tapHint: { marginTop: 8, color: '#6B7280', fontSize: 12 },

  emptyWrap: { alignItems: 'center', marginTop: 40 },
  emptyIcon: { width: 40, height: 40, resizeMode: 'contain', tintColor: '#9CA3AF' },
  emptyTitle: { marginTop: 12, fontSize: 16, fontWeight: '800', color: '#0B1330' },
  emptySub: { marginTop: 4, color: '#6B7280' },
});
