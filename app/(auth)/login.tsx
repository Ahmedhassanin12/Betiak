import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Login = () => {
  return (
   <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ImageBackground style={styles.image} source={ require("@/assets/images/welcome-1.jpg")} resizeMode="cover" >
        <View style={{ justifyContent:'flex-start', alignItems:'center', gap:0}}>
          <Image style={styles.logo} source={require("@/assets/images/betiak.png")} />
        <Text style={styles.title}>Beitak</Text>
        <Text style={styles.subtitle}>Build your blessed home</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1, 
  },
  logo:{
    objectFit: "contain",
    width: 150,
    height: 100,
    marginTop: 100,
  },
  title:{
    color: 'white',
    fontSize: 28,
    marginTop: 0,
    fontWeight: 900,
  },
  subtitle:{
    fontSize: 16,
    color: '#fefefe',
    marginTop: 5,
    fontWeight: 600,
  },
})

export default Login
