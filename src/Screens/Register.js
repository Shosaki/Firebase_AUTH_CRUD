//   import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Alert,
// } from 'react-native';

// import {auth} from '../Components/Firebase';

// const Login = ({navigation}) => {
//   const [loginEmail, setLoginEmail] = useState('');
//   const [loginPassword, setLoginPassword] = useState('');

//   const handleLogin = () => {
//     auth
//       .signInWithEmailAndPassword(loginEmail, loginPassword)
//       .then(userCredentials => {
//         // navigation.reset({
//         //   index: 0,
//         //   routes: [{ name: "Ad" }],
//         // });
//         // console.log("Success");
//         navigation.navigate('Todo');
//       })
//       .catch(err => {
//         Alert.alert(err.message);
//         console.log(err);
//       });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView style={styles.loginForm}>
//         <View>
//           <Text>User Login</Text>
//         </View>

//         <View>
//           <TextInput
//             label="Email"
//             keyboardType="email-address"
//             style={{marginBottom: 5, backgroundColor: 'blue'}}
//             value={loginEmail}
//             onChangeText={text => setLoginEmail(text)}></TextInput>
//           <TextInput
//             label="Password"
//             secureTextEntry={true}
//             // right={<TextInput.Icon name="eye-off-outline" />}
//             value={loginPassword}
//             onChangeText={text => setLoginPassword(text)}></TextInput>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => {
//               console.log('ds');
//             }}>
//             <Text>Forgot email/password</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handleLogin()}>
//             <Text>Login</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loginForm: {
//     flex: 0.4,
//     marginTop: 200,
//     marginHorizontal: 60,
//     backgroundColor: 'red',
//   },
//   button: {
//     margin: 10,
//     marginHorizontal: 0,
//   },
// });

// export default Login;

import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
} from 'react-native';

import {authentication} from '../Firebase/firebase-config';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const Register = ({navigation}) => {
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

  const registerUser = () => {
    console.log('reg entered');
    createUserWithEmailAndPassword(
      authentication,
      localFormData.localEmail.value,
      localFormData.localPassword.value,
    )
      .then(result => {
        console.log('Saketh success - ', result);
        navigation.navigate('Login');
      })
      .catch(err => {
        Alert.alert(err.message);
        console.log('Saketh failure - ', err);
      });
  };
  return (
    <KeyboardAvoidingView
      // keyboardVerticalOffset={-100}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={[styles.container]}>
      <View style={{marginTop: 150}}>
        <Text style={styles.mainTitle}>Register</Text>
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
            registerUser();
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
          Sign up
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

export default Register;
