import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginForm({
  onBack,
  onRegister,
  onForgot,
  onLogin,
}: {
  onBack?: () => void;
  onRegister?: () => void;
  onForgot?: () => void;
  onLogin?: (email: string, password: string, userData?: any) => void;
}) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Attempting login with:', { email: email.trim(), password: '***' });
      
      const response = await fetch('http://www.junssei.site/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error Response:', errorText);
        
        if (response.status === 401) {
          Alert.alert(
            'Login Failed',
            'Invalid email or password. Please check your credentials and try again.'
          );
        } else if (response.status >= 500) {
          Alert.alert(
            'Server Error',
            'Server is currently unavailable. Please try again later.'
          );
        } else {
          Alert.alert(
            'Error',
            `Login failed with status ${response.status}. Please try again.`
          );
        }
        return;
      }

      const data = await response.json();
      console.log('Login response data:', data);

      if (data.success === true) {
        console.log('Login successful, user data:', data.user);
        // If login successful, pass user data from backend
        onLogin?.(email.trim(), password, data.user);
      } else {
        // If login failed
        console.log('Login failed:', data.message);
        Alert.alert(
          'Login Failed',
          data.message || 'Invalid email or password'
        );
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Connection Error',
        'Failed to connect to the server. Please check your internet connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom },
      ]}
    >
      <TouchableOpacity
        accessibilityLabel="Back"
        accessibilityRole="button"
        style={styles.backWrap}
        onPress={onBack}
      >
        <Image
          source={require('../images/icons/arrow-left.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Login Your{'\n'}Account</Text>

      <View style={styles.inputWrap}>
        <Image
          source={require('../images/icons/email.png')}
          style={styles.inputIconImg}
        />
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
        <Image
          source={require('../images/icons/lock-01.png')}
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
          <Image
            source={require('../images/icons/eye-closed.png')}
            style={[styles.eyeImg, { opacity: hidePassword ? 0.6 : 1 }]}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.forgotWrap} onPress={onForgot}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.loginBtn, isLoading && styles.loginBtnDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.loginText}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <View style={styles.registerRow}>
        <Text style={styles.registerHint}>Don't Have An Account? </Text>
        <TouchableOpacity onPress={onRegister} disabled={isLoading}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  backWrap: {
    paddingVertical: 8,
    paddingRight: 16,
  },
  backArrow: {
    fontSize: 28,
    color: '#1F2A37',
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
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#2ECC71',
    backgroundColor: '#EFFFF4',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#2F3A4B',
  },
  inputIconImg: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#0B1330',
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
  forgotWrap: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  forgot: {
    color: '#2F3A4B',
  },
  loginBtn: {
    marginTop: 18,
    backgroundColor: '#38D66B',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    paddingHorizontal: 118,
  },
  loginText: {
    color: '#0B1330',
    fontWeight: '700',
    fontSize: 18,
  },
  loginBtnDisabled: {
    opacity: 0.7,
  },
  registerRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerHint: {
    color: '#1F2A37',
  },
  registerLink: {
    color: '#0B1330',
    fontWeight: '700',
  },
});
