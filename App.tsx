/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Login from './auth/login';
import LoginForm from './auth/loginForm';
import Register from './auth/register';
import ForgotPassword from './auth/forgotPassword';
import VerifyEmail from './auth/verifyEmail';
import ResetPassword from './auth/resetPassword';
import Home from './screens/home';
import ProgramDetails from './screens/programDetails';
import Programs from './screens/programs';
// import RequestHistory from './screens/requestHistory';
// import RecentPrograms from './screens/recentPrograms'; // File removed
import Settings from './screens/settings';
import EditProfile from './screens/editProfile';
import Account from './screens/account';
import ChangePassword from './screens/changePassword';
import Notifications from './screens/notifications';
import NotificationCenter, { type NotificationItem } from './screens/notificationCenter';
import HelpFaq from './screens/helpFaq';
import ContactSupport from './screens/contactSupport';
import MedicineRequestPortal from './screens/medicineRequestPortal';
import MedicineRequestForm from './screens/medicineRequestForm';
import MedicineRequestHistory from './screens/medicineRequestHistory';

const introPages = [
  {
    image: require('./images/logo+name 1.png'),
    text: 'Easily track your medicine request history anytime, anywhere.',
  },
  {
    image: require('./images/logo+name 1 (1).png'),
    text: 'Stay updated with upcoming Barangay health programs.',
  },
  {
    image: require('./images/logo+name 1 (2).png'),
    text: 'Connecting CHO, Barangays, and communities for better healthcare.',
  },
];

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  type Screen =
    | 'Intro'
    | 'Login'
    | 'LoginForm'
    | 'Register'
    | 'ForgotPassword'
    | 'VerifyEmail'
    | 'ResetPassword'
    | 'Home'
    | 'ProgramDetails'
    | 'Programs'
    | 'MedicineRequestPortal'
    | 'MedicineRequestForm'
    | 'RequestHistory'
    | 'MedicineRequestHistory'
    | 'Settings'
    | 'EditProfile'
    | 'Account'
    | 'ChangePassword'
    | 'Notifications'
    | 'NotificationCenter'
    | 'HelpFaq'
    | 'ContactSupport';

  const safeAreaInsets = useSafeAreaInsets();
  const [showSplash, setShowSplash] = useState(true);
  const [stack, setStack] = useState<Screen[]>(['Intro']);
  const [forgotEmail, setForgotEmail] = useState<string | undefined>(undefined);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<'wellness' | 'nutri' | 'anti' | undefined>(undefined);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [notifFlags, setNotifFlags] = useState<Record<string, boolean>>({});
  const [userProfile, setUserProfile] = useState<{ name: string; email: string; avatarUri?: string } | undefined>(undefined);
  
  // Uploaded Prescription State
  const [uploadedPrescription, setUploadedPrescription] = useState<{
    id: string;
    uri: string;
    name: string;
    type: string;
  } | null>(null);
  
  // Request History State
  const [requestHistory, setRequestHistory] = useState<Array<{
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
  }>>([]);

  const current = stack[stack.length - 1];
  const push = (s: Screen) => setStack((st) => [...st, s]);
  const pop = () => setStack((st) => (st.length > 1 ? st.slice(0, st.length - 1) : st));
  const replace = (s: Screen) => setStack((st) => (st.length ? [...st.slice(0, st.length - 1), s] : [s]));

  // Function to add program reminder notification
  const addProgramReminder = (programName: string, programDate: string) => {
    const newNotification: NotificationItem = {
      id: `reminder-${Date.now()}`,
      title: 'Program Reminder Set',
      body: `You'll be reminded about "${programName}" on ${programDate}`,
      read: false,
      icon: require('./images/icons/bell.png'),
      time: 'Just now',
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  // Function to add new request to history
  const addRequestToHistory = (requestData: {
    patientName: string;
    emailAddress: string;
    phoneNumber: string;
    deliveryAddress: string;
    additionalNotes: string;
  }) => {
    const newRequest = {
      id: `#${String(requestHistory.length + 1).padStart(4, '0')}`,
      patientName: requestData.patientName,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      medicines: ['Prescription medicines'], // Placeholder - could be enhanced to track actual medicines
      deliveryAddress: requestData.deliveryAddress,
      status: 'pending', // Default status - pending until admin approval
      prescriptionImage: uploadedPrescription ? { uri: uploadedPrescription.uri } : require('./images/icons/capsule.png'),
      emailAddress: requestData.emailAddress,
      phoneNumber: requestData.phoneNumber,
      additionalNotes: requestData.additionalNotes,
    };
    
    setRequestHistory(prev => [newRequest, ...prev]); // Add to beginning of array
    setUploadedPrescription(null); // Clear the uploaded prescription after adding to history
  };

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(t);
  }, []);

  // Simple relative time helper
  const fmtTime = (d: Date) => {
    const now = new Date();
    const diffMs = d.getTime() - now.getTime();
    const abs = Math.abs(diffMs);
    const min = Math.round(abs / 60000);
    if (min < 1) return 'now';
    if (min < 60) return diffMs > 0 ? `${min}m left` : `${min}m ago`;
    const hrs = Math.round(min / 60);
    if (hrs < 24) return diffMs > 0 ? `${hrs}h left` : `${hrs}h ago`;
    const days = Math.round(hrs / 24);
    return diffMs > 0 ? `${days}d left` : `${days}d ago`;
  };

  const addNotification = (n: Omit<NotificationItem, 'id' | 'read' | 'time'> & { time?: string; read?: boolean }) => {
    setNotifications((prev) => [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        title: n.title,
        body: n.body,
        read: n.read ?? false,
        icon: n.icon,
        time: n.time ?? 'now',
      },
      ...prev,
    ]);
  };

  // Schedule-based notifications (reminders and completion) - Disabled
  // useEffect(() => {
  //   const DAY = 24 * 60 * 60 * 1000;
  //   const THRESHOLD = DAY; // "near" = within 1 day

  //   const schedule = {
  //     wellness: {
  //       title: 'Barangay Wellness Check',
  //       start: new Date('2025-09-06T08:00:00'),
  //       end: new Date('2025-09-06T12:00:00'),
  //       icon: require('./images/icons/BWC.png'),
  //     },
  //     nutri: {
  //       title: 'NutriLIFE Feeding Program',
  //       start: new Date('2025-09-09T10:00:00'),
  //       end: new Date('2025-09-09T12:00:00'),
  //       icon: require('./images/icons/nutri.png'),
  //     },
  //     anti: {
  //       title: 'Anti-Smoking & Substance Abuse Awareness',
  //       start: new Date('2025-03-02T08:00:00'),
  //       end: new Date('2025-03-02T15:00:00'),
  //       icon: require('./images/icons/anti-smoking.png'),
  //     },
  //   } as const;

  //   const check = () => {
  //     const now = new Date().getTime();

  //     (Object.keys(schedule) as Array<keyof typeof schedule>).forEach((key) => {
  //       const item = schedule[key];
  //       const startMs = item.start.getTime();
  //       const endMs = item.end.getTime();

  //       // Reminder: within threshold before start
  //       const remKey = `${key}_reminder`;
  //       if (!notifFlags[remKey] && now < startMs && startMs - now <= THRESHOLD) {
  //         addNotification({
  //           title: 'Reminder: ' + item.title,
  //           body: 'Starts ' + fmtTime(item.start),
  //           icon: item.icon,
  //         });
  //         setNotifFlags((f) => ({ ...f, [remKey]: true }));
  //       }

  //       // Completed: after end
  //       const compKey = `${key}_completed`;
  //       if (!notifFlags[compKey] && now >= endMs) {
  //         addNotification({
  //           title: 'Completed: ' + item.title,
  //           body: 'The program has ended.',
  //           icon: item.icon,
  //         });
  //         setNotifFlags((f) => ({ ...f, [compKey]: true }));
  //       }
  //     });
  //   };

  //   // Run immediately and then every minute
  //   check();
  //   const id = setInterval(check, 60_000);
  //   return () => clearInterval(id);
  // }, [notifFlags]);

  useEffect(() => {
    if (!showSplash) {
      if (isLoggedIn) {
        // Skip onboarding and go straight to Home when logged in
        setStack(['Home']);
      } else if (hasSeenIntro) {
        setStack(['Login']);
      } else {
        setStack(['Intro']);
      }
    }
  }, [showSplash, hasSeenIntro, isLoggedIn]);

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom, paddingLeft: safeAreaInsets.left, paddingRight: safeAreaInsets.right }]}> 
      {showSplash ? (
        <Image source={require('./images/kklogo.png')} style={styles.logo} />
      ) : current === 'ProgramDetails' ? (
        <ProgramDetails onBack={pop} program={selectedProgram} />
      ) : current === 'Programs' ? (
        <Programs
          onBack={pop}
          onGoHome={() => push('Home')}
          onViewDetails={() => { setSelectedProgram(undefined); push('ProgramDetails'); }}
          onViewOngoing={() => { setSelectedProgram('wellness'); push('ProgramDetails'); }}
          onViewUpcoming={() => { setSelectedProgram('nutri'); push('ProgramDetails'); }}
          onViewCompleted={() => { setSelectedProgram('anti'); push('ProgramDetails'); }}
          onGoRequests={() => push('MedicineRequestPortal')}
          onGoSettings={() => push('Settings')}
          onAddProgramReminder={addProgramReminder}
        />
      ) : current === 'MedicineRequestPortal' ? (
        <MedicineRequestPortal
          onBack={pop}
          onGoHome={() => push('Home')}
          onGoPrograms={() => push('Programs')}
          onGoSettings={() => push('Settings')}
          onNext={() => push('MedicineRequestForm')}
          onGoNotifications={() => push('RequestHistory')}
          onGoHistory={() => push('MedicineRequestHistory')}
          uploadedPrescription={uploadedPrescription}
          setUploadedPrescription={setUploadedPrescription}
        />
      ) : current === 'MedicineRequestForm' ? (
        <MedicineRequestForm
          onBack={pop}
          onGoHome={() => push('Home')}
          onGoPrograms={() => push('Programs')}
          onGoSettings={() => push('Settings')}
          onSubmit={() => {
            // Navigate back to home after successful submission
            push('Home');
          }}
          onSubmitAnother={() => {
            // Navigate back to Medicine Request Portal for another request
            push('MedicineRequestPortal');
          }}
          onAddToHistory={addRequestToHistory}
        />
      ) : current === 'MedicineRequestHistory' ? (
        <MedicineRequestHistory
          onBack={pop}
          onGoHome={() => push('Home')}
          onGoPrograms={() => push('Programs')}
          onGoSettings={() => push('Settings')}
          onNewRequest={() => push('MedicineRequestPortal')}
          requestHistory={requestHistory}
        />
      ) : current === 'Settings' ? (
        <Settings
          onGoHome={() => push('Home')}
          onGoPrograms={() => push('Programs')}
          onGoRequests={() => push('MedicineRequestPortal')}
          onGoEditProfile={() => push('EditProfile')}
          onGoAccount={() => push('Account')}
          onGoChangePassword={() => push('ChangePassword')}
          onGoNotifications={() => push('Notifications')}
          onGoHelp={() => push('HelpFaq')}
          onGoContact={() => push('ContactSupport')}
          profile={userProfile}
          onSignOut={() => {
            setIsLoggedIn(false);
            setUserProfile(undefined);
            setStack(['Login']);
          }}
        />
      ) : current === 'HelpFaq' ? (
        <HelpFaq onBack={pop} onGoContact={() => push('ContactSupport')} />
      ) : current === 'ContactSupport' ? (
        <ContactSupport onBack={pop} />
      ) : current === 'EditProfile' ? (
        <EditProfile
          onBack={pop}
          profile={userProfile}
          onSaved={(p: { name: string; email: string; phone?: string; address?: string; dob?: string; gender?: string; avatarUri?: string }) => {
            setUserProfile(p);
            pop();
          }}
        />
      ) : current === 'Account' ? (
        <Account onBack={pop} profile={userProfile} />
      ) : current === 'ChangePassword' ? (
        <ChangePassword onBack={pop} onSaved={pop} />
      ) : current === 'Notifications' ? (
        <Notifications onBack={pop} />
      ) : current === 'NotificationCenter' ? (
        <NotificationCenter
          onBack={pop}
          items={notifications}
          onToggleRead={(id) =>
            setNotifications((arr) => arr.map((n) => (n.id === id ? { ...n, read: !n.read } : n)))
          }
          onMarkAllRead={() => setNotifications((arr) => arr.map((n) => ({ ...n, read: true })))}
          onClear={() => setNotifications([])}
        />
      ) : current === 'Home' ? (
        <Home
          onViewDetails={() => { setSelectedProgram('wellness'); push('ProgramDetails'); }}
          onGoPrograms={() => push('Programs')}
          onGoRequests={() => push('MedicineRequestPortal')}
          onGoMedicineRequest={() => push('MedicineRequestPortal')}
          onGoSettings={() => push('Settings')}
          onGoNotificationCenter={() => push('NotificationCenter')}
          profile={userProfile}
          notificationCount={notifications.filter((n) => !n.read).length}
          requestHistory={requestHistory}
        />
      ) : current === 'Register' ? (
        <Register
          onBack={pop}
          onComplete={(p) => {
            setUserProfile({ name: p.name, email: p.email });
            replace('LoginForm');
          }}
        />
      ) : current === 'ForgotPassword' ? (
        <ForgotPassword
          onBack={pop}
          onContinue={(email?: string) => {
            setForgotEmail(email);
            push('VerifyEmail');
          }}
        />
      ) : current === 'VerifyEmail' ? (
        <VerifyEmail
          email={forgotEmail}
          onBack={() => replace('ForgotPassword')}
          onVerify={() => replace('ResetPassword')}
          onResend={() => {}}
        />
      ) : current === 'ResetPassword' ? (
        <ResetPassword
          onBack={() => replace('VerifyEmail')}
          onSubmit={(_pwd) => {
            replace('Login');
          }}
        />
      ) : current === 'LoginForm' ? (
        <LoginForm
          onBack={() => replace('Login')}
          onRegister={() => push('Register')}
          onForgot={() => push('ForgotPassword')}
          onLogin={(email) => {
            if (!userProfile || !userProfile.email || userProfile.email.toLowerCase() !== email.toLowerCase()) {
              Alert.alert('Account not found', 'Please register before logging in.');
              return;
            }
            setIsLoggedIn(true);
            setStack(['Home']);
          }}
        />
      ) : current === 'Login' ? (
        <Login onLogin={() => push('LoginForm')} onRegister={() => push('Register')} />
      ) : (
        <IntroScreen onDone={() => setHasSeenIntro(true)} />
      )}
    </View>
  );
}

function IntroScreen({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);

  const goLeft = () => setIndex((i) => Math.max(0, i - 1));
  const goRight = () =>
    setIndex((i) => {
      if (i >= introPages.length - 1) {
        onDone();
        return i;
      }
      return i + 1;
    });

  const current = introPages[index];

  return (
    <View style={styles.introWrap}>
      <Image source={current.image} style={styles.illustration} />
      <Text style={styles.introText}>{current.text}</Text>

      <View style={styles.dotsRow}>
        {introPages.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.navCard}>
        <TouchableOpacity onPress={goLeft} accessibilityRole="button" accessibilityLabel="Previous">
          <Text style={styles.navArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.navDivider} />
        <TouchableOpacity onPress={goRight} accessibilityRole="button" accessibilityLabel="Next">
          <Text style={styles.navArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onDone}>
        <Text style={styles.skip}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  introWrap: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  illustration: {
    width: '90%',
    height: '50%',
    resizeMode: 'contain',
  },
  introText: {
    marginTop: 24,
    textAlign: 'center',
    color: '#252525',
    fontSize: 16,
    lineHeight: 22,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D8D8D8',
  },
  dotActive: {
    backgroundColor: '#111111',
  },
  navCard: {
    marginTop: 24,
    width: 200,
    height: 72,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  navArrow: {
    fontSize: 22,
    color: '#222',
  },
  navDivider: {
    width: 1,
    height: '60%',
    backgroundColor: '#EEE',
  },
  skip: {
    marginTop: 16,
    color: '#2E5AAC',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default App;
