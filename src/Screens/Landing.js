import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const LandingPage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.text}>Login to your To-Do App</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View
              style={{
                backgroundColor: 'aqua',
                padding: 10,
                height: 50,
                width: 100,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, color: 'gray'}}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <View
              style={{
                backgroundColor: 'aqua',
                padding: 10,
                height: 50,
                width: 100,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, color: 'gray'}}>Register</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 21,
    paddingBottom: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  loginBox: {
    marginTop: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 70,
    width: 230,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default LandingPage;
