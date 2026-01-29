import { useAuth } from '@/providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

import { router } from 'expo-router';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const Welcome = () => {

  const { signInWithGoogle } = useAuth();
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign in error:', error);
      // Show error to user
    }
  };

  const handleEmailSignIn = () => {
    router.push('/email-login');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground style={styles.image} source={require("@/assets/images/welcome-1.jpg")} resizeMode="cover" >
          <View style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 0 }}>
            <Image style={styles.logo} source={require("@/assets/images/betiak.png")} />
            <Text style={styles.appName}>Beitak</Text>
            <Text style={styles.subtitle}>Build your blessed home</Text>
            <Text style={styles.tagline}>
              Finding Your Life Partner the Halal Way
            </Text>
          </View>

          <View style={styles.content}>
            {/* Logo/Brand Section */}
            <View style={styles.brandSection}>
              <View style={styles.logoContainer}>
                {/* Replace with your logo */}
                <Ionicons name="heart-circle" size={80} color="#fff" />
              </View>


              <Text style={styles.arabicText}>بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</Text>
            </View>





            {/* Google Sign In Button */}
            <Button
              mode="outlined"
              onPress={handleGoogleSignIn}
              style={styles.googleButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.googleButtonLabel}
              icon={() => (
                <AntDesign name="google" size={24} color="red" />
              )}
            >
              Continue with Google
            </Button>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Email Sign In Button */}
            <Button
              mode="contained"
              onPress={handleEmailSignIn}
              style={styles.emailButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.emailButtonLabel}
              icon="email-outline"
            >
              Continue with Email
            </Button>

            {/* Terms & Privacy */}
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={styles.link}>Terms of Service</Text> and{' '}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>

            {/* Islamic Values Notice */}
            <View style={styles.valuesNotice}>
              <Ionicons name="shield-checkmark" size={16} color="#667eea" />
              <Text style={styles.valuesText}>
                Committed to Islamic values & privacy
              </Text>
            </View>
          </View>

        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Welcome



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  logo: {
    objectFit: "contain",
    width: 150,
    height: 100,
    marginTop: 100,
  },
  appName: {
    color: 'white',
    fontSize: 36,
    marginTop: 0,
    fontWeight: 900,
  },
  subtitle: {
    fontSize: 16,
    color: '#fefefe',
    marginTop: 5,
    fontWeight: 600,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  brandSection: {
    alignItems: 'center',
    paddingTop: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  tagline: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
    opacity: 0.95,
  },
  arabicText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    marginTop: 8,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  googleButton: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    marginBottom: 16,
    paddingStart: 8,
    marginRight: 25,
    marginLeft: 25,
    backgroundColor: '#fff',
  },
  buttonContent: {
    height: 45,
    color: "#fff"
  },
  googleButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#999',
    fontSize: 14,
  },
  emailButton: {
    borderRadius: 12,
    marginBottom: 24,
    paddingStart: 8,
    marginRight: 25,
    marginLeft: 25,
    backgroundColor: '#transparent',
  },
  emailButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  termsText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  link: {
    color: '#667eea',
    fontWeight: '600',
  },
  valuesNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f5f7ff',
    borderRadius: 8,
    gap: 8,
    marginHorizontal: 25,
  },
  valuesText: {
    fontSize: 13,
    color: '#667eea',
    fontWeight: '500',
  },

})