import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
  BackHandler,
} from 'react-native';

import {authentication} from '../Firebase/firebase-config';
import {signInWithEmailAndPassword} from 'firebase/auth';

const Login = ({navigation}) => {
  const onChangeText = (fieldName, value) => {
    switch (fieldName) {
      case 'email':
        setLocalFormData({
          ...localFormData,
          localEmail: {...localFormData.localEmail, value: value},
        });
        break;
      case 'password':
        setLocalFormData({
          ...localFormData,
          localPassword: {...localFormData.localPassword, value: value},
        });
        break;
    }
  };

  const initialFormData = {
    localEmail: {value: '', error: ''},
    localPassword: {value: '', error: ''},
  };
  const [localFormData, setLocalFormData] = useState(initialFormData);

  const signInUser = () => {
    console.log('reg entered');
    signInWithEmailAndPassword(
      authentication,
      localFormData.localEmail.value,
      localFormData.localPassword.value,
    )
      .then(result => {
        console.log('Saketh success - ', result);
        navigation.navigate('Todo');
      })
      .catch(err => {
        Alert.alert(err.message);
        console.log('Saketh failure - ', err);
      });
  };

  useEffect(() => {
    // Needs to be nav stack reset, change later saketh
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Landing');
      return true;
    });
  }, []);

  return (
    <KeyboardAvoidingView
      // keyboardVerticalOffset={-100}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={[styles.container]}>
      <View style={{marginTop: 150}}>
        <Text style={styles.mainTitle}>Login</Text>
        <Text style={[styles.inputTitle, {marginTop: 30}]}>Email</Text>
        <TextInput
          editable
          maxLength={40}
          onChangeText={text => onChangeText('email', text)}
          value={localFormData.localEmail.value}
          inputStyle={{color: 'white'}}
          style={[
            styles.textInput,
            {marginBottom: localFormData.localEmail.error !== '' ? 14 : 7},
          ]}
        />
        <Text style={styles.errorText}>{localFormData.localEmail.error}</Text>

        <Text style={styles.inputTitle}>Password</Text>
        <TextInput
          editable
          secureTextEntry={true}
          maxLength={40}
          onChangeText={text => onChangeText('password', text)}
          value={localFormData.localPassword.value}
          style={[
            styles.textInput,
            {marginBottom: localFormData.localPassword.error !== '' ? 14 : 7},
          ]}
        />
        <Text style={styles.errorText}>
          {localFormData.localPassword.error}
        </Text>
      </View>

      <Pressable
        onPress={() => {
          if (
            localFormData.localEmail.value.length > 0 &&
            localFormData.localPassword.value.length > 0
          ) {
            setLocalFormData({
              ...localFormData,
              localEmail: {...localFormData.localEmail, error: ''},
              localPassword: {...localFormData.localPassword, error: ''},
            });
            signInUser();
          } else {
            let Error1 = '';
            let Error2 = '';

            if (localFormData.localEmail.value.length == 0)
              Error1 = 'Please enter valid Email';
            else Error1 = '';

            if (localFormData.localPassword.value.length == 0)
              Error2 = 'Please enter valid Password';
            else Error2 = '';

            setLocalFormData({
              ...localFormData,
              localEmail: {...localFormData.localEmail, error: Error1},
              localPassword: {...localFormData.localPassword, error: Error2},
            });
          }
        }}
        style={{
          height: 50,
          width: 300,
          marginTop: 10,
          borderRadius: 30,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
          Sign in
        </Text>
      </Pressable>

      {/* <Pressable
        onPress={() => setGiveRewardPopupShown(false)}
        style={{
          height: 50,
          width: 300,
          marginTop: 20,
          borderRadius: 30,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{color: 'red', fontSize: 18, fontWeight: '500'}}>
          Cancel
        </Text>
      </Pressable> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  mainTitle: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 23,
    color: 'white',
  },
  inputTitle: {
    fontSize: 16,
    marginLeft: 15,
    color: '#b38600',
  },
  textInput: {
    height: 55,
    padding: 0,
    marginTop: 7,
    marginBottom: 20,
    marginHorizontal: 15,
    borderWidth: 1,
    color: '#b38600',
    borderColor: '#b38600',
  },
  errorText: {
    fontSize: 12,
    marginLeft: 15,
    color: 'red',
  },
});

export default Login;
