import { ImageRequireSource } from 'react-native';

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  read: boolean;
  icon?: ImageRequireSource | number | any;
  time: string;
};

let items: NotificationItem[] = [];

type Listener = (next: NotificationItem[]) => void;
const listeners = new Set<Listener>();

const scheduled: Record<string, { timeoutId: any; eventDate: Date; title: string; body: string } | undefined> = {};

function emit() {
  const snapshot = [...items];
  listeners.forEach((l) => l(snapshot));
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  listener([...items]);
  return () => {
    listeners.delete(listener);
  };
}

export function getItems() {
  return [...items];
}

export function addItem(entry: Omit<NotificationItem, 'id' | 'read' | 'time'> & { id?: string; read?: boolean; time?: string }) {
  const id = entry.id ?? String(Date.now());
  const now = new Date();
  const time = entry.time ?? formatRelativeTime(now);
  items = [{ id, title: entry.title, body: entry.body, read: entry.read ?? false, icon: entry.icon, time }, ...items];
  emit();
  return id;
}

export function toggleRead(id: string) {
  items = items.map((n) => (n.id === id ? { ...n, read: !n.read } : n));
  emit();
}

export function markAllRead() {
  items = items.map((n) => ({ ...n, read: true }));
  emit();
}

export function clear() {
  items = [];
  emit();
}

export function isReminderScheduled(key: string) {
  return Boolean(scheduled[key]);
}

export function cancelReminder(key: string) {
  const rec = scheduled[key];
  if (rec) {
    clearTimeout(rec.timeoutId);
    scheduled[key] = undefined;
  }
}

export function scheduleReminder(key: string, eventDate: Date, programTitle: string) {
  if (scheduled[key]) return;
  const trigger = new Date(eventDate.getTime() - 24 * 60 * 60 * 1000);
  const now = new Date();
  let delay = trigger.getTime() - now.getTime();
  if (delay <= 0) delay = 2000;
  const icon = require('../images/icons/time.png');
  const timeoutId = setTimeout(() => {
    addItem({
      title: 'Reminder',
      body: `${programTitle} is tomorrow. Don’t forget to attend.`,
      icon,
    });
    scheduled[key] = undefined;
  }, delay);
  scheduled[key] = { timeoutId, eventDate, title: 'Reminder', body: `${programTitle} is tomorrow. Don’t forget to attend.` };
}

function formatRelativeTime(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const sec = Math.floor(diffMs / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (sec < 10) return 'Just now';
  if (sec < 60) return `${sec}s ago`;
  if (min < 60) return `${min}m ago`;
  if (hr < 24) return `${hr}h ago`;
  if (day === 1) return 'Yesterday';
  return `${day}d ago`;
}
